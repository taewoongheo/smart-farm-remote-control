import {useState} from 'react';
import {sendThreshold} from '../services/esp32';
import {DEFAULT_THRESHOLD} from '../constants/defaultThreshold';

export function useThreshold(initialValue = DEFAULT_THRESHOLD) {
  const [threshold, setThresholdState] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateThreshold = async newValue => {
    setIsLoading(true);
    setError(null);

    try {
      await sendThreshold(newValue);
      setThresholdState(newValue);
    } catch (err) {
      setError('값 전송 실패: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    threshold,
    updateThreshold,
    isLoading,
    error,
  };
}
