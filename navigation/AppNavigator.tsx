import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '@/screens/SplashScreen';
import AuthNavigator from './AuthNavigator';
import TabNavigator from './TabNavigator';
import QuestionnaireScreen from '@/screens/QuestionnaireScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Auth" component={AuthNavigator} />
        <Stack.Screen name="AppTabs" component={TabNavigator} />
        <Stack.Screen
          name="QuestionnaireModal"
          component={QuestionnaireScreen}
          options={{
            presentation: 'modal',
          }}
        />
      </Stack.Navigator>
  );
}
