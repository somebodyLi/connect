/* @flow */

// $FlowIssue
import BlockbookWorkerWrapper from '@onekeyhq/blockchain-link/build/module/blockbook-worker.js';
// $FlowIssue
import RippleWorkerWrapper from '@onekeyhq/blockchain-link/build/module/ripple-worker.js';
import TrezorLink from '@onekeyhq/link';
// import RNUsbPlugin from './RNUsbPlugin';
import { ReactNativePluginBle, RNBridge } from './RNBlePlugin';

export const WebUsbPlugin = undefined;

export const ReactNativeBlePlugin = (handle: RNBridge) => {
    return new TrezorLink.Lowlevel(new ReactNativePluginBle(handle));
};

// export const ReactNativeUsbPlugin = () => {
//     return new TrezorLink.Lowlevel(new RNUsbPlugin());
// };

export const BlockbookWorker = () => {
    return new BlockbookWorkerWrapper();
};

export const RippleWorker = () => {
    return new RippleWorkerWrapper();
};
