import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DoctorHomeScreen from '@/screens/DoctorHomeScreen';
import PatientDetailScreen from '@/screens/PatientDetailScreen';

const Stack = createStackNavigator();

export default function DoctorNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="DoctorHome" component={DoctorHomeScreen} />
      <Stack.Screen name="PatientDetail" component={PatientDetailScreen} />
    </Stack.Navigator>
  );
}
