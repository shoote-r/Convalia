import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';

export default function DoctorLoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // For demo purposes accept any non-empty credentials
    if (!email || !password) return Alert.alert('Erreur', "Veuillez entrer vos identifiants.");
    // In a real app validate credentials with backend
    navigation.replace('Doctor');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connexion Médecin</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginText}>Se connecter</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.replace('Auth')}>
        <Text style={styles.backText}>Retour Patient</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 20, justifyContent: 'center' },
  title: { ...typography.h1, textAlign: 'center', marginBottom: 24 },
  input: { height: 48, backgroundColor: colors.white, borderRadius: 8, paddingHorizontal: 12, marginBottom: 12, borderWidth: 1, borderColor: colors.border },
  loginButton: { height: 52, backgroundColor: colors.secondary, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginTop: 8 },
  loginText: { ...typography.button, color: colors.white },
  backButton: { marginTop: 12, alignItems: 'center' },
  backText: { color: colors.textSecondary },
});
