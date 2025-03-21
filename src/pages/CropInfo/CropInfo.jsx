import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {URL} from '../../../env';

function CropInfo() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchUrl = async url => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUrl(URL);
  }, []);

  if (loading) {
    return (
      <View>
        <Text>로딩중.....</Text>
      </View>
    );
  }

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
