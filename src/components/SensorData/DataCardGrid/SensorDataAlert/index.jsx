import React, {useEffect, useState} from 'react';
import {statusAlert} from '../../../../utils/alerts';
import {ALERT_MESSAGES} from '../../../../constants/messages';

function SensorDataAlert(props) {
  const {sensorData, threshold, children} = props;

  const [isAlerted, setIsAlerted] = useState(false);

  useEffect(() => {
    const temperature = sensorData.dht11.temperature;
    const temperatureTarget = threshold.temperature;
    const temperatureRange = threshold.tempRange;
    if (temperature < temperatureTarget - temperatureRange) {
      if (!isAlerted) {
        setIsAlerted(true);
        statusAlert(
          ALERT_MESSAGES.STATUS_CHANGE.TEMPERATURE.LOW,
          ALERT_MESSAGES.STATUS_CHANGE.TEMPERATURE.LOW_TEMPERATURE_MESSAGE(
            temperature,
            temperatureTarget,
            temperatureRange,
          ),
          ALERT_MESSAGES.STATUS_CHANGE.TEMPERATURE.CONFIRM,
        );
      }
    } else if (temperature > temperatureTarget + temperatureRange) {
      if (!isAlerted) {
        setIsAlerted(true);
        statusAlert(
          ALERT_MESSAGES.STATUS_CHANGE.TEMPERATURE.HIGH,
          ALERT_MESSAGES.STATUS_CHANGE.TEMPERATURE.HIGH_TEMPERATURE_MESSAGE(
            temperature,
            temperatureTarget,
            temperatureRange,
          ),
          ALERT_MESSAGES.STATUS_CHANGE.TEMPERATURE.CONFIRM,
        );
      }
    } else {
      setIsAlerted(false);
    }
  }, [sensorData, threshold]);

  return <>{children}</>;
}

export default SensorDataAlert;
