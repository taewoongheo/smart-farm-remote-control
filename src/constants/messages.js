import deepFreeze from '../utils/freeze';

export const ALERT_MESSAGES = deepFreeze({
  ERROR: {
    TITLE: '오류 발생',
    CONFIRM: '확인',
  },
  STATUS_CHANGE: {
    TEMPERATURE: {
      LOW: '온도 낮음',
      LOW_TEMPERATURE_MESSAGE(currentTemperature, target, range) {
        return `현재 온도 ${currentTemperature}가 
        기준치: ${target + range}~${target - range} 보다 낮습니다`;
      },
      HIGH: '온도 높음',
      HIGH_TEMPERATURE_MESSAGE(currentTemperature, target, range) {
        return `현재 온도 ${currentTemperature}가 
        기준치: ${target + range}~${target - range} 보다 높습니다`;
      },
      CONFIRM: '확인',
    },
  },
});
