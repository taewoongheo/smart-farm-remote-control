import React from 'react';
import {useEffect} from 'react';
import {useThreshold} from './hooks/useThreshold';
import {Alert, Text, TouchableOpacity, View} from 'react-native';
import ThresholdBottomSheet from './components/ThresholdControl';
import SensorData from './components/SensorData';
import {useNavigation} from '@react-navigation/native';
import {styles} from './style';

function Main() {
  const {threshold, updateThreshold, isLoading, error} = useThreshold();
  const navigation = useNavigation();

  useEffect(() => {
    if (error) {
      Alert.alert('Error', error);
    }
  }, [error]);

  return (
    <>
      <SensorData threshold={threshold} thresholdIsLoading={isLoading} />

      <View style={styles.cropInfoBtnContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('CropInfo')}>
          <Text style={styles.buttonText}>작물별 생육 최적 정보 확인하기</Text>
        </TouchableOpacity>
      </View>

      {/* bottom sheet modal */}
      <ThresholdBottomSheet
        threshold={threshold}
        updateThreshold={updateThreshold}
      />
    </>
  );
}

export default Main;
