import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {URL} from '../../../env';
import {tomato} from '../../constants/farmInfo';
import {styles} from './styles';

function CropInfo() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [crop, setCrop] = useState([]);

  useEffect(() => {
    setLoading(true);

    const fetchUrl = async () => {
      try {
        const result = [];
        const fetchArr = tomato.map(code => fetch(URL + code));
        await Promise.all(fetchArr)
          .then(response => Promise.all(response.map(r => r.json())))
          .then(data => {
            for (let i = 0; i < data.length; i++) {
              const res = data[i].response;
              const len = res.body.numOfRows;
              const items = res.body.items.item;
              for (let j = 0; j < len; j++) {
                // 측정일시, 누적일사량, 토양습도, 외부온도
                const {measDtStr, acSlrdQy, inHd, outTp} = items[j];
                result.push({
                  measDtStr: measDtStr,
                  acSlrdQy: acSlrdQy,
                  inHd: inHd,
                  outTp: outTp,
                });
              }
            }
          });
        setCrop(result);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUrl();
  }, []);

  const renderTableHeader = () => {
    return (
      <View style={styles.tableHeader}>
        <Text style={styles.headerText}>측정일시</Text>
        <Text style={styles.headerText}>누적일사량</Text>
        <Text style={styles.headerText}>토양습도</Text>
        <Text style={styles.headerText}>외부온도</Text>
      </View>
    );
  };

  const renderItem = ({item}) => (
    <View style={styles.tableRow}>
      <Text style={styles.cell}>
        {item.measDtStr.substring(0, 4)}.{item.measDtStr.substring(4, 6)}.
        {item.measDtStr.substring(6, 8)}
      </Text>
      <Text style={styles.cell}>{item.acSlrdQy}</Text>
      <Text style={styles.cell}>{item.inHd}</Text>
      <Text style={styles.cell}>{item.outTp}°C</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.loadingText}>로딩중.....</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>작물 정보</Text>

      {crop && crop.length > 0 ? (
        <View style={styles.tableContainer}>
          {renderTableHeader()}
          <FlatList
            data={crop}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      ) : (
        <Text style={styles.noData}>데이터가 없습니다.</Text>
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack('Main')}>
        <Text style={styles.buttonText}>메인으로 이동</Text>
      </TouchableOpacity>
    </View>
  );
}

export default CropInfo;
