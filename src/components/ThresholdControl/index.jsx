import React, {useCallback, useRef, useState} from 'react';
import {
  BottomSheetModalProvider,
  BottomSheetView,
  BottomSheetModal,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import {Text, TouchableOpacity, View, TextInput} from 'react-native';
import {styles} from './style';

function ThresholdBottomSheet({threshold, updateThreshold}) {
  const bottomSheetModalRef = useRef(null);
  const [values, setValues] = useState({
    temperature: threshold.temperature?.toString() || '',
    humidity: threshold.humidity?.toString() || '',
    soilHumidity: threshold.soilHumidity?.toString() || '',
    light: threshold.light?.toString() || '',
  });

  const handleInputChange = (key, value) => {
    setValues(prev => ({...prev, [key]: value}));
  };

  const handleSubmit = () => {
    updateThreshold({
      temperature: Number(values.temperature),
      humidity: Number(values.humidity),
      soilHumidity: Number(values.soilHumidity),
      light: Number(values.light),
    });
    bottomSheetModalRef.current?.dismiss();
  };

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback(index => {
    console.log('handleSheetChanges', index);
  }, []);

  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    [],
  );

  return (
    <BottomSheetModalProvider>
      <TouchableOpacity
        onPress={handlePresentModalPress}
        style={styles.bottomsheetBtn}>
        <Text style={styles.bottomsheetBtnText}>목표 값 설정</Text>
      </TouchableOpacity>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        detached={true}
        style={styles.bottomsheetModal}
        bottomInset={50}
        backdropComponent={renderBackdrop}
        onChange={handleSheetChanges}>
        <BottomSheetView style={styles.bottomsheetContentContainer}>
          <View style={styles.inputContainer}>
            <View style={styles.inputRow}>
              <Text style={styles.inputText}>온도 °C:</Text>
              <TextInput
                style={styles.input}
                value={values.temperature}
                onChangeText={value => handleInputChange('temperature', value)}
                keyboardType="numeric"
                placeholder="온도 설정"
              />
            </View>
            <View style={styles.inputRow}>
              <Text style={styles.inputText}>습도 %:</Text>
              <TextInput
                style={styles.input}
                value={values.humidity}
                onChangeText={value => handleInputChange('humidity', value)}
                keyboardType="numeric"
                placeholder="습도 설정"
              />
            </View>
            <View style={styles.inputRow}>
              <Text style={styles.inputText}>토양습도 %: </Text>
              <TextInput
                style={styles.input}
                value={values.soilHumidity}
                onChangeText={value => handleInputChange('soilHumidity', value)}
                keyboardType="numeric"
                placeholder="토양습도 설정"
              />
            </View>
            <View style={styles.inputRow}>
              <Text style={styles.inputText}>조도 %: </Text>
              <TextInput
                style={styles.input}
                value={values.light}
                onChangeText={value => handleInputChange('light', value)}
                keyboardType="numeric"
                placeholder="조도 설정"
              />
            </View>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}>
              <Text style={styles.sendText}>설정</Text>
            </TouchableOpacity>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
}

export default ThresholdBottomSheet;
