/* @flow */

import AbstractMethod from './AbstractMethod';
import { validateParams } from './helpers/paramsValidator';
import { validatePath, fromHardened, getSerializedPath } from '../../utils/pathUtils';

import * as UI from '../../constants/ui';
import { UiMessage } from '../../message/builder';

import type { UiPromiseResponse } from 'flowtype';
import type { StellarAddress } from '../../types/stellar';
import type { CoreMessage } from '../../types';

type Batch = {
    path: Array<number>,
    address: ?string,
    showOnTrezor: boolean,
}

type Params = Array<Batch>;

export default class StellarGetAddress extends AbstractMethod {
    confirmed: boolean = false;
    params: Params;
    progress: number = 0;

    constructor(message: CoreMessage) {
        super(message);

        this.requiredPermissions = ['read'];
        this.requiredFirmware = ['1.7.0', '2.0.8'];

        // create a bundle with only one batch if bundle doesn't exists
        const payload: Object = !message.payload.hasOwnProperty('bundle') ? { ...message.payload, bundle: [ ...message.payload ] } : message.payload;

        // validate bundle type
        validateParams(payload, [
            { name: 'bundle', type: 'array' },
            { name: 'useEventListener', type: 'boolean' },
        ]);

        const bundle = [];
        payload.bundle.forEach(batch => {
            // validate incoming parameters for each batch
            validateParams(batch, [
                { name: 'path', obligatory: true },
                { name: 'address', type: 'string' },
                { name: 'showOnTrezor', type: 'boolean' },
            ]);

            const path: Array<number> = validatePath(batch.path, 3);
            let showOnTrezor: boolean = true;
            if (batch.hasOwnProperty('showOnTrezor')) {
                showOnTrezor = batch.showOnTrezor;
            }

            bundle.push({
                path,
                address: batch.address,
                showOnTrezor,
            });
        });

        const useEventListener = payload.useEventListener && payload.bundle.length === 1 && typeof payload.bundle[0].address === 'string' && payload.bundle[0].showOnTrezor;
        this.confirmed = useEventListener;
        this.useUi = !useEventListener;
        this.params = bundle;

        // set info
        if (bundle.length === 1) {
            this.info = `Export Stellar address for account #${ (fromHardened(this.params[0].path[2]) + 1) }`;
        } else {
            this.info = 'Export multiple Stellar addresses';
        }
    }

    getButtonRequestData(code: string) {
        if (code === 'ButtonRequest_Address') {
            const data = {
                type: 'address',
                serializedPath: getSerializedPath(this.params[this.progress].path),
                address: this.params[this.progress].address || 'not-set',
            };
            return data;
        }
        return null;
    }

    async confirmation(): Promise<boolean> {
        if (this.confirmed) return true;
        // wait for popup window
        await this.getPopupPromise().promise;
        // initialize user response promise
        const uiPromise = this.createUiPromise(UI.RECEIVE_CONFIRMATION, this.device);

        const label: string = this.info;
        // request confirmation view
        this.postMessage(new UiMessage(UI.REQUEST_CONFIRMATION, {
            view: 'export-address',
            label,
        }));

        // wait for user action
        const uiResp: UiPromiseResponse = await uiPromise.promise;
        const resp: string = uiResp.payload;

        this.confirmed = (resp === 'true');
        return this.confirmed;
    }

    async run(): Promise<StellarAddress | Array<StellarAddress>> {
        const responses: Array<StellarAddress> = [];
        const bundledResponse = this.params.length > 1;

        for (let i = 0; i < this.params.length; i++) {
            const batch: Batch = this.params[i];
            // silently get address and compare with requested address
            // or display as default inside popup
            if (batch.showOnTrezor) {
                const silent = await this.device.getCommands().stellarGetAddress(
                    batch.path,
                    false
                );
                if (typeof batch.address === 'string') {
                    if (batch.address !== silent.address) {
                        throw new Error('Addresses do not match');
                    }
                } else {
                    batch.address = silent.address;
                }
            }

            const response = await this.device.getCommands().stellarGetAddress(
                batch.path,
                batch.showOnTrezor
            );
            responses.push({
                address: response.address,
                path: batch.path,
                serializedPath: getSerializedPath(batch.path),
            });

            if (bundledResponse) {
                // send progress
                this.postMessage(new UiMessage(UI.BUNDLE_PROGRESS, {
                    progress: i,
                    response,
                }));
            }

            this.progress++;
        }
        return bundledResponse ? responses : responses[0];
    }
}
