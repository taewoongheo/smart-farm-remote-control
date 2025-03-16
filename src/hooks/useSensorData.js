import {useEffect, useRef, useState} from 'react';
import {fetchSensorData} from '../services/esp32';

export function useSensorData({autoUpdate, interval}) {
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

    if (!autoUpdate) {
      return;
    }

    intervalRef.current = setInterval(updateSensorData, interval);

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
