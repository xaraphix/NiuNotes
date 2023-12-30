import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {PermissionsAndroid} from 'react-native';
import {useEffect} from 'react';
import {
  HOME_SCREEN,
  SELECT_ROOT_NOTE_SCREEN,
  SELECT_SCALE_SCREEN,
  WORKOUT_SCREEN,
} from '@/constants/Routes';
import SelectScaleScreen from './screens/SelectScaleScreen';
import WorkoutScreen from './screens/WorkoutScreen';
import SelectRootNoteScreen from './screens/SelectRootNoteScreen';

function App(): JSX.Element {
  const Stack = createNativeStackNavigator();

  useEffect(() => {
    requestMicPermission();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={HOME_SCREEN} component={HomeScreen} />
        <Stack.Screen name={WORKOUT_SCREEN} component={WorkoutScreen} />
        <Stack.Screen
          name={SELECT_SCALE_SCREEN}
          component={SelectScaleScreen}
        />
        <Stack.Screen
          name={SELECT_ROOT_NOTE_SCREEN}
          component={SelectRootNoteScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const requestMicPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    return false;
  }
};

export default App;
