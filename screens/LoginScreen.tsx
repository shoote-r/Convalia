import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';
import { ArrowLeft } from 'lucide-react-native';

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.header}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled">
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.replace('RoleSelection')}>
            <ArrowLeft size={24} color={colors.textSecondary} />
            <Text style={styles.backText}>Retour</Text>
          </TouchableOpacity>
        <View style={styles.content}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>C</Text>
          </View>

          <Text style={styles.title}>Heureux de vous revoir</Text>

          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="nom@patient.fr"
                placeholderTextColor={colors.textSecondary}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Mot de passe</Text>
              <TextInput
                style={styles.input}
                placeholder="********"
                placeholderTextColor={colors.textSecondary}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
              />
            </View>

            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => navigation.replace('AppTabs')}>
              <Text style={styles.primaryButtonText}>Connexion</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.textButton}
              onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.textButtonText}>Créer un compte</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  header: {
    paddingTop: 60,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  logoText: {
    fontSize: 40,
    fontWeight: '700',
    color: colors.white,
  },
  title: {
    ...typography.h1,
    color: colors.textPrimary,
    marginBottom: 32,
    textAlign: 'center',
  },
  form: {
    width: '100%',
    maxWidth: 400,
  },
  inputContainer: {
    marginBottom: 20,
  },
    backText: {
    ...typography.body,
    color: colors.textSecondary,
    marginLeft: 8,
    fontWeight: '600',
  },
  label: {
    ...typography.body,
    color: colors.textPrimary,
    marginBottom: 8,
    fontWeight: '600',
  },
  input: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    ...typography.body,
    color: colors.textPrimary,
    borderWidth: 1,
    borderColor: colors.border,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 12,
  },
  primaryButtonText: {
    ...typography.button,
    color: colors.white,
  },
   backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: 20,
  },
  textButton: {
    padding: 16,
    alignItems: 'center',
  },
  textButtonText: {
    ...typography.body,
    color: colors.primary,
    fontWeight: '600',
  },
});
