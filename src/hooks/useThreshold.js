import {useEffect, useState} from 'react';
import {DEFAULT_THRESHOLD} from '../constants/defaultThreshold';
import {firebase} from '@react-native-firebase/database';

export function useThreshold(initialValue = DEFAULT_THRESHOLD) {
  const [threshold, setThresholdState] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const onThresholdChange = firebase
      .app()
      .database()
      .ref('/thresholds')
      .on('value', snapshot => {
        setThresholdState(snapshot.val());
      });

    return () =>
      firebase
        .app()
        .database.ref('/thresholds')
        .off('value', onThresholdChange);
  }, []);

  const updateThreshold = async newValue => {
    setIsLoading(true);
    setError(null);

    try {
      firebase.app().database().ref('/thresholds').update(newValue);
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
