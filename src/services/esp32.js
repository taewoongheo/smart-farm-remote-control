import {ESP32_IS_CONNECT} from '../constants/config';
import {mockSensorData} from '../constants/mockSensorData';
import getESP32_IP from '../utils/utils';

export const fetchSensorData = async () => {
  if (!ESP32_IS_CONNECT) {
    return mockSensorData;
  }
  const esp32_ip = getESP32_IP();
  const response = await fetch(`http://${esp32_ip}/api/sensors`);
  console.log(response);
  return response.json();
};

export const sendThreshold = async threshold => {
  if (!ESP32_IS_CONNECT) {
    return {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({mockSensorData}),
    };
  }

  const esp32_ip = getESP32_IP();
  const response = await fetch(`http://${esp32_ip}/api/threshold`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(threshold),
  });

  return response.json();
};
