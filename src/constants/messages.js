export const ALERT_MESSAGES = Object.freeze({
  ERROR: {
    TITLE: '오류 발생',
    CONFIRM: '확인',
  },
  STATUS_CHANGE: {
    TEMPERATURE: {
      LOW: '온도 낮음',
      MESSAGE(currentTemperature, target, range) {
        return `현재 온도 ${currentTemperature}가 
        기준치: ${target + range}~${target - range} 보다 낮습니다`;
      },
      CONFIRM: '확인',
    },
  },
});
