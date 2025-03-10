import {useEffect, useRef, useState} from 'react';
import {fetchSensorData} from '../services/esp32';
import {UPDATE_INTERVAL} from '../constants/config';

export function useSensorData() {
  const [sensorData, setSensorData] = useState(null);
  const intervalRef = useRef(null);

  const updateSensorData = async () => {
    try {
      const data = await fetchSensorData();
      setSensorData({
        ...data,
        lastUpdate: new Date().toLocaleTimeString(),
      });
    } catch (err) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      throw new Error(`센서 데이터를 가져올 수 없습니다: ${err.message}`);
    }
  };

  useEffect(() => {
    updateSensorData();
    intervalRef.current = setInterval(updateSensorData, UPDATE_INTERVAL);

    return () => {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, []);

  return {
    sensorData,
    updateSensorData,
  };
}
