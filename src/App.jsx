import React from 'react';
import {SafeAreaView} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {styles} from './style';
import Main from './Main';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CropInfo from './pages/CropInfo/CropInfo';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <GestureHandlerRootView>
        <SafeAreaView style={styles.container}>
          <Stack.Navigator initialRouteName="Main">
            <Stack.Screen
              name="Main"
              component={Main}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="CropInfo"
              component={CropInfo}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </SafeAreaView>
      </GestureHandlerRootView>
    </NavigationContainer>
  );
}

export default App;
