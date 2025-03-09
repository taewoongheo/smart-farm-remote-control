import React from 'react';
import {useBottomSheetModal} from '@gorhom/bottom-sheet';
import {useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {styles} from './inputStyle';

function ThresholdInput({threshold, updateThreshold}) {
  const {dismiss} = useBottomSheetModal();

  const [values, setValues] = useState({
    temperature: threshold.temperature?.toString() || '',
    tempRange: threshold.tempRange?.toString() || '',
    humidity: threshold.humidity?.toString() || '',
    humidityRange: threshold.humidityRange?.toString() || '',
    soilHumidity: threshold.soilHumidity?.toString() || '',
    soilHumidityRange: threshold.soilHumidityRange?.toString() || '',
    light: threshold.light?.toString() || '',
    lightRange: threshold.lightRange?.toString() || '',
  });

  const handleInputChange = (key, value) => {
    setValues(prev => ({...prev, [key]: value}));
  };

  const handleSubmit = () => {
    updateThreshold({
      temperature: Number(values.temperature),
      tempRange: Number(values.tempRange),
      humidity: Number(values.humidity),
      humidityRange: Number(values.humidityRange),
      soilHumidity: Number(values.soilHumidity),
      soilHumidityRange: Number(values.soilHumidityRange),
      light: Number(values.light),
      lightRange: Number(values.lightRange),
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
        <Text style={styles.inputText}>온도 범위 ±°C:</Text>
        <TextInput
          style={styles.input}
          value={values.tempRange}
          onChangeText={value => handleInputChange('tempRange', value)}
          keyboardType="numeric"
          placeholder="온도 범위 설정"
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
        <Text style={styles.inputText}>습도 범위 ±%:</Text>
        <TextInput
          style={styles.input}
          value={values.humidityRange}
          onChangeText={value => handleInputChange('humidityRange', value)}
          keyboardType="numeric"
          placeholder="습도 범위 설정"
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
        <Text style={styles.inputText}>토양습도 범위 ±%: </Text>
        <TextInput
          style={styles.input}
          value={values.soilHumidityRange}
          onChangeText={value => handleInputChange('soilHumidityRange', value)}
          keyboardType="numeric"
          placeholder="토양습도 범위 설정"
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
      <View style={styles.inputRow}>
        <Text style={styles.inputText}>조도 범위 ±%: </Text>
        <TextInput
          style={styles.input}
          value={values.lightRange}
          onChangeText={value => handleInputChange('lightRange', value)}
          keyboardType="numeric"
          placeholder="조도 범위 설정"
        />
      </View>
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.sendText}>설정</Text>
      </TouchableOpacity>
    </View>
  );
}

export default ThresholdInput;
