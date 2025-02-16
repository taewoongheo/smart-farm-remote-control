import React from 'react';
import {useBottomSheetModal} from '@gorhom/bottom-sheet';
import {useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {styles} from './inputStyle';

function ThresholdInput({threshold, updateThreshold}) {
  const {dismiss} = useBottomSheetModal();

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
    dismiss();
  };

  return (
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
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.sendText}>설정</Text>
      </TouchableOpacity>
    </View>
  );
}

export default ThresholdInput;
