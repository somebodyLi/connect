/* @flow */
import { UI } from './constants';
import {
    eventEmitter,
    manifest,
    init,
    call,
    getSettings,
    customMessage,
    requestLogin,
    uiResponse,
    renderWebUSBButton,
    disableWebUSB,
    cancel,
    dispose,
} from './env/node';
import type { API } from './types';

const OneKeyConnect: API = {
    manifest,
    init: settings => init(settings),
    getSettings,

    on: (type, fn) => {
        eventEmitter.on(type, fn);
    },

    off: (type, fn) => {
        eventEmitter.removeListener(type, fn);
    },

    removeAllListeners: () => {
        eventEmitter.removeAllListeners();
    },

    uiResponse,

    // methods

    blockchainGetAccountBalanceHistory: params => {
        return call({ method: 'blockchainGetAccountBalanceHistory', ...params });
    },

    blockchainGetCurrentFiatRates: params => {
        return call({ method: 'blockchainGetCurrentFiatRates', ...params });
    },

    blockchainGetFiatRatesForTimestamps: params => {
        return call({ method: 'blockchainGetFiatRatesForTimestamps', ...params });
    },

    blockchainDisconnect: params => {
        return call({ method: 'blockchainDisconnect', ...params });
    },

    blockchainEstimateFee: params => {
        return call({ method: 'blockchainEstimateFee', ...params });
    },

    blockchainGetTransactions: params => {
        return call({ method: 'blockchainGetTransactions', ...params });
    },

    blockchainSetCustomBackend: params => {
        return call({ method: 'blockchainSetCustomBackend', ...params });
    },

    blockchainSubscribe: params => {
        return call({ method: 'blockchainSubscribe', ...params });
    },

    blockchainSubscribeFiatRates: params => {
        return call({ method: 'blockchainSubscribeFiatRates', ...params });
    },

    blockchainUnsubscribe: params => {
        return call({ method: 'blockchainUnsubscribe', ...params });
    },

    blockchainUnsubscribeFiatRates: params => {
        return call({ method: 'blockchainUnsubscribeFiatRates', ...params });
    },

    customMessage: params => {
        return customMessage(params);
    },

    requestLogin: params => {
        return requestLogin(params);
    },

    cardanoGetAddress: params => {
        const useEventListener = eventEmitter.listenerCount(UI.ADDRESS_VALIDATION) > 0;
        return call({ method: 'cardanoGetAddress', ...params, useEventListener });
    },

    cardanoGetPublicKey: params => {
        return call({ method: 'cardanoGetPublicKey', ...params });
    },

    cardanoSignTransaction: params => {
        return call({ method: 'cardanoSignTransaction', ...params });
    },

    cipherKeyValue: params => {
        return call({ method: 'cipherKeyValue', ...params });
    },

    composeTransaction: params => {
        return call({ method: 'composeTransaction', ...params });
    },
    confluxGetAddress: params => {
        const useEventListener = eventEmitter.listenerCount(UI.ADDRESS_VALIDATION) > 0;
        return call({ method: 'confluxGetAddress', ...params, useEventListener });
    },

    confluxGetPublicKey: params => {
        return call({ method: 'ethereumGetPublicKey', ...params });
    },

    confluxSignMessage: params => {
        return call({ method: 'confluxSignMessage', ...params });
    },

    confluxSignTransaction: params => {
        return call({ method: 'confluxSignTransaction', ...params });
    },
    confluxSignMessageCIP23: params => {
        return call({ method: 'confluxSignMessageCIP23', ...params });
    },
    debugLinkDecision: params => {
        return call({ method: 'debugLinkDecision', ...params });
    },

    debugLinkGetState: params => {
        return call({ method: 'debugLinkGetState', ...params });
    },

    solanaGetAddress: params => {
        const useEventListener = eventEmitter.listenerCount(UI.ADDRESS_VALIDATION) > 0;
        return call({ method: 'solanaGetAddress', ...params, useEventListener });
    },

    solanaSignTransaction: params => {
        return call({ method: 'solanaSignTransaction', ...params });
    },

    starcoinGetAddress: params => {
        const useEventListener = eventEmitter.listenerCount(UI.ADDRESS_VALIDATION) > 0;
        return call({ method: 'starcoinGetAddress', ...params, useEventListener });
    },

    starcoinSignTransaction: params => {
        return call({ method: 'starcoinSignTransaction', ...params });
    },

    starcoinGetPublicKey: params => {
        return call({ method: 'starcoinGetPublicKey', ...params });
    },

    starcoinSignMessage: params => {
        return call({ method: 'starcoinSignMessage', ...params });
    },

    starcoinVerifyMessage: params => {
        return call({ method: 'starcoinVerifyMessage', ...params });
    },

    ethereumGetAddress: params => {
        const useEventListener = eventEmitter.listenerCount(UI.ADDRESS_VALIDATION) > 0;
        return call({ method: 'ethereumGetAddress', ...params, useEventListener });
    },

    ethereumGetPublicKey: params => {
        return call({ method: 'ethereumGetPublicKey', ...params });
    },

    ethereumSignMessage: params => {
        return call({ method: 'ethereumSignMessage', ...params });
    },

    ethereumSignTransaction: params => {
        return call({ method: 'ethereumSignTransaction', ...params });
    },

    ethereumVerifyMessage: params => {
        return call({ method: 'ethereumVerifyMessage', ...params });
    },

    getAccountInfo: params => {
        return call({ method: 'getAccountInfo', ...params });
    },

    getAddress: params => {
        const useEventListener = eventEmitter.listenerCount(UI.ADDRESS_VALIDATION) > 0;
        return call({ method: 'getAddress', ...params, useEventListener });
    },

    getDeviceState: params => {
        return call({ method: 'getDeviceState', ...params });
    },

    getFeatures: params => {
        return call({ method: 'getFeatures', ...params });
    },

    getPublicKey: params => {
        return call({ method: 'getPublicKey', ...params });
    },

    liskGetAddress: params => {
        const useEventListener = eventEmitter.listenerCount(UI.ADDRESS_VALIDATION) > 0;
        return call({ method: 'liskGetAddress', ...params, useEventListener });
    },

    liskGetPublicKey: params => {
        return call({ method: 'liskGetPublicKey', ...params });
    },

    liskSignMessage: params => {
        return call({ method: 'liskSignMessage', ...params });
    },

    liskSignTransaction: params => {
        return call({ method: 'liskSignTransaction', ...params });
    },

    liskVerifyMessage: params => {
        return call({ method: 'liskVerifyMessage', ...params });
    },

    nemGetAddress: params => {
        const useEventListener = eventEmitter.listenerCount(UI.ADDRESS_VALIDATION) > 0;
        return call({ method: 'nemGetAddress', ...params, useEventListener });
    },

    nemSignTransaction: params => {
        return call({ method: 'nemSignTransaction', ...params });
    },

    pushTransaction: params => {
        return call({ method: 'pushTransaction', ...params });
    },

    rippleGetAddress: params => {
        const useEventListener = eventEmitter.listenerCount(UI.ADDRESS_VALIDATION) > 0;
        return call({ method: 'rippleGetAddress', ...params, useEventListener });
    },

    rippleSignTransaction: params => {
        return call({ method: 'rippleSignTransaction', ...params });
    },

    signMessage: params => {
        return call({ method: 'signMessage', ...params });
    },

    signTransaction: params => {
        return call({ method: 'signTransaction', ...params });
    },

    stellarGetAddress: params => {
        const useEventListener = eventEmitter.listenerCount(UI.ADDRESS_VALIDATION) > 0;
        return call({ method: 'stellarGetAddress', ...params, useEventListener });
    },

    stellarSignTransaction: params => {
        return call({ method: 'stellarSignTransaction', ...params });
    },

    tezosGetAddress: params => {
        const useEventListener = eventEmitter.listenerCount(UI.ADDRESS_VALIDATION) > 0;
        return call({ method: 'tezosGetAddress', ...params, useEventListener });
    },

    tezosGetPublicKey: params => {
        return call({ method: 'tezosGetPublicKey', ...params });
    },

    tezosSignTransaction: params => {
        return call({ method: 'tezosSignTransaction', ...params });
    },

    eosGetPublicKey: params => {
        return call({ method: 'eosGetPublicKey', ...params });
    },

    eosSignTransaction: params => {
        return call({ method: 'eosSignTransaction', ...params });
    },

    binanceGetAddress: params => {
        const useEventListener = eventEmitter.listenerCount(UI.ADDRESS_VALIDATION) > 0;
        return call({ method: 'binanceGetAddress', ...params, useEventListener });
    },

    binanceGetPublicKey: params => {
        return call({ method: 'binanceGetPublicKey', ...params });
    },

    binanceSignTransaction: params => {
        return call({ method: 'binanceSignTransaction', ...params });
    },

    verifyMessage: params => {
        return call({ method: 'verifyMessage', ...params });
    },

    resetDevice: params => {
        return call({ method: 'resetDevice', ...params });
    },

    wipeDevice: params => {
        return call({ method: 'wipeDevice', ...params });
    },

    applyFlags: params => {
        return call({ method: 'applyFlags', ...params });
    },

    applySettings: params => {
        return call({ method: 'applySettings', ...params });
    },

    backupDevice: params => {
        return call({ method: 'backupDevice', ...params });
    },

    changePin: params => {
        return call({ method: 'changePin', ...params });
    },

    firmwareUpdate: params => {
        return call({ method: 'firmwareUpdate', ...params });
    },

    recoveryDevice: params => {
        return call({ method: 'recoveryDevice', ...params });
    },

    getCoinInfo: params => {
        return call({ method: 'getCoinInfo', ...params });
    },

    bixinReboot: params => {
        return call({ method: 'bixinReboot', ...params });
    },

    ethereumSignMessageEIP712: params => {
        return call({ method: 'ethereumSignMessageEIP712', ...params });
    },

    dispose,

    cancel,

    renderWebUSBButton,

    disableWebUSB,
};

export default OneKeyConnect;

export * from './constants';
export * from './types';
