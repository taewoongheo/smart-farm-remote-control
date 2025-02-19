import React from 'react';
import {Text, View} from 'react-native';
import {styles} from './DataCardStyle';

function DataCard({card, thresholdIsLoading}) {
  return (
    <View>
      <View style={styles.cardHeader}>
        <Text style={styles.cardIcon}>{card.icon}</Text>
        <Text style={styles.cardTitle}>{card.title}</Text>
      </View>

      <View style={styles.valueContainerVertical}>
        <View style={styles.valueBox}>
          <Text style={styles.valueLabel}>목표</Text>
          <Text style={styles.currentValue}>
            {thresholdIsLoading ? '로딩 중..' : card.target}
            <Text style={styles.unit}>{card.unit}</Text>
          </Text>
        </View>

        <View style={styles.dividerHorizontal} />

        <View style={styles.valueBox}>
          <Text style={styles.valueLabel}>현재</Text>
          <Text style={styles.targetValue}>
            {card.current}
            <Text style={styles.unit}>{card.unit}</Text>
          </Text>
        </View>
      </View>

      <View
        style={[
          styles.statusBar,
          card.current >= card.target
            ? styles.statusGood
            : styles.statusWarning,
        ]}
      />
    </View>
  );
}

export default DataCard;
