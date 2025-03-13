import React, {useEffect, useState} from 'react';
import {statusAlert} from '../../../../utils/alerts';
import {ALERT_MESSAGES} from '../../../../constants/messages';
import {TEMPERATURE_STATUS} from '../../../../constants/temperatureStatus';

function SensorDataAlert(props) {
  const {sensorData, threshold, children} = props;

  const [temperatureStatus, setTemperatureStatus] = useState(
    TEMPERATURE_STATUS.NORMAL,
  );

  useEffect(() => {
    const temperature = sensorData.dht11.temperature;
    const temperatureTarget = threshold.temperature;
    const temperatureRange = threshold.tempRange;
    if (
      temperature < temperatureTarget - temperatureRange &&
      temperatureStatus !== TEMPERATURE_STATUS.HIGH
    ) {
      setTemperatureStatus(TEMPERATURE_STATUS.HIGH);
      statusAlert({
        title: ALERT_MESSAGES.STATUS_CHANGE.TEMPERATURE.LOW,
        message:
          ALERT_MESSAGES.STATUS_CHANGE.TEMPERATURE.LOW_TEMPERATURE_MESSAGE(
            temperature,
            temperatureTarget,
            temperatureRange,
          ),
        confirm: ALERT_MESSAGES.STATUS_CHANGE.TEMPERATURE.CONFIRM,
      });
    } else if (
      temperature > temperatureTarget + temperatureRange &&
      temperatureStatus !== TEMPERATURE_STATUS.LOW
    ) {
      setTemperatureStatus(TEMPERATURE_STATUS.LOW);
      statusAlert({
        title: ALERT_MESSAGES.STATUS_CHANGE.TEMPERATURE.HIGH,
        message:
          ALERT_MESSAGES.STATUS_CHANGE.TEMPERATURE.HIGH_TEMPERATURE_MESSAGE(
            temperature,
            temperatureTarget,
            temperatureRange,
          ),
        confirm: ALERT_MESSAGES.STATUS_CHANGE.TEMPERATURE.CONFIRM,
      });
    } else {
      setTemperatureStatus(TEMPERATURE_STATUS.NORMAL);
    }
  }, [
    sensorData.dht11.temperature,
    threshold.temperature,
    threshold.tempRange,
  ]);

  return <>{children}</>;
}

export default SensorDataAlert;
