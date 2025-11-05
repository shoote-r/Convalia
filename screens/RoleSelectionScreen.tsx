import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';

export default function RoleSelectionScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenue</Text>
      <Text style={styles.subtitle}>Vous êtes :</Text>

      <TouchableOpacity
        style={[styles.button, styles.patientButton]}
        onPress={() => navigation.replace('Auth')}>
        <Text style={styles.buttonText}>Patient</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.doctorButton]}
        onPress={() => navigation.replace('DoctorLogin')}>
        <Text style={styles.buttonText}>Médecin</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    ...typography.h1,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    ...typography.body,
    textAlign: 'center',
    marginBottom: 24,
    color: colors.textSecondary,
  },
  button: {
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
  },
  patientButton: {
    backgroundColor: colors.primary,
  },
  doctorButton: {
    backgroundColor: colors.secondary,
  },
  buttonText: {
    ...typography.button,
    color: colors.white,
  },
});
