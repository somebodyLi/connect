/* @flow */
import { Features } from '../../ts/types';

export const findDefectiveBatchDevice = (features: Features) => {
    if (!features) return;
    const onekeySerial = features.onekey_serial;
    if (!onekeySerial) return;
    const versionNum = +onekeySerial.slice(5);
    if (Number.isNaN(versionNum)) return;
    return versionNum >= 21032200001 && versionNum <= 21032201500;
};
