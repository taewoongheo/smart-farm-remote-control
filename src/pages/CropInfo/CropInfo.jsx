import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

function CropInfo() {
  const navigation = useNavigation();

  return (
    <View>
      <Text>Crop info</Text>
      <TouchableOpacity onPress={() => navigation.goBack('Main')}>
        <Text>main으로 이동</Text>
      </TouchableOpacity>
    </View>
  );
}

export default CropInfo;
