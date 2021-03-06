/* @flow */

// device list events
export const CONNECT: 'device-connect' = 'device-connect';
export const CONNECT_UNACQUIRED: 'device-connect_unacquired' = 'device-connect_unacquired';
export const DISCONNECT: 'device-disconnect' = 'device-disconnect';
export const CHANGED: 'device-changed' = 'device-changed';
export const ACQUIRE: 'device-acquire' = 'device-acquire';
export const RELEASE: 'device-release' = 'device-release';
export const ACQUIRED: 'device-acquired' = 'device-acquired';
export const RELEASED: 'device-released' = 'device-released';
export const USED_ELSEWHERE: 'device-used_elsewhere' = 'device-used_elsewhere';

export const LOADING: 'device-loading' = 'device-loading';

// @onekeyfe/link events in protobuf format
export const BUTTON: 'button' = 'button';
export const PIN: 'pin' = 'pin';
export const PASSPHRASE: 'passphrase' = 'passphrase';
export const PASSPHRASE_ON_DEVICE: 'passphrase_on_device' = 'passphrase_on_device';
export const WORD: 'word' = 'word';

// custom
export const WAIT_FOR_SELECTION: 'device-wait_for_selection' = 'device-wait_for_selection';

// this string has different prefix than other constants and it's used as device path
export const UNREADABLE: 'unreadable-device' = 'unreadable-device';
