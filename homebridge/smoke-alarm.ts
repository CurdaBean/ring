import { BaseAccessory } from './base-accessory'
import { RingDevice } from '../api'
import { HAP, hap } from './hap'
import { RingAlarmPlatformConfig } from './config'

export class SmokeAlarm extends BaseAccessory {
  constructor(
    public readonly device: RingDevice,
    public readonly accessory: HAP.Accessory,
    public readonly logger: HAP.Log,
    public readonly config: RingAlarmPlatformConfig
  ) {
    super()

    const {
      Characteristic: { SmokeDetected },
      Service: { SmokeSensor }
    } = hap

    this.registerCharacteristic(SmokeDetected, SmokeSensor, data => {
      return data.alarmStatus === 'active'
        ? SmokeDetected.SMOKE_DETECTED
        : SmokeDetected.SMOKE_NOT_DETECTED
    })

    this.initSensorService(SmokeSensor)
  }
}