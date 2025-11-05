import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '@/screens/SplashScreen';
import AuthNavigator from './AuthNavigator';
import TabNavigator from './TabNavigator';
import QuestionnaireScreen from '@/screens/QuestionnaireScreen';
import RoleSelectionScreen from '@/screens/RoleSelectionScreen';
import DoctorNavigator from './DoctorNavigator';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
  <Stack.Screen name="Splash" component={SplashScreen} />
  {/* Role selection appears after splash; user chooses Patient or Médecin */}
  <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />
  <Stack.Screen name="DoctorLogin" component={require('@/screens/DoctorLoginScreen').default} />
  <Stack.Screen name="Auth" component={AuthNavigator} />
  {/* Doctor flow - separate navigator */}
  <Stack.Screen name="Doctor" component={DoctorNavigator} />
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
