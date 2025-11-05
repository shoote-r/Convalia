import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';
import { User } from 'lucide-react-native';
import { Alert } from 'react-native';
import { router } from 'expo-router';

export default function ProfileScreen({ navigation }: any) {
    const handleSubmit = () => {
      Alert.alert('La mutuelle a été modifiée avec succès !');
    };
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profil</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <User size={48} color={colors.white} />
          </View>
        </View>

        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Nom</Text>
            <Text style={styles.infoValue}>David Laroche</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={styles.infoValue}>david.laroche@patient.fr</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Ma Mutuelle</Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
             <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingTop: 10}}>
            <Text style={styles.infoValue}>Mutuelle Santé Plus</Text>
              </View>
             <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                      <Text style={styles.submitButtonText}>Modifier</Text>
                    </TouchableOpacity>
                     </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => navigation.replace('RoleSelection')}>
          <Text style={styles.logoutButtonText}>Déconnexion</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.primary,
    padding: 24,
    paddingTop: 60,
    paddingBottom: 32,
  },
  title: {
    ...typography.h1,
    color: colors.white,
  },
  content: {
    padding: 20,
  },
  avatarContainer: {
    alignItems: 'center',
    marginVertical: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.textSecondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  infoRow: {
    paddingVertical: 12,
  },
  infoLabel: {
    ...typography.body,
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  infoValue: {
    ...typography.body,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
  },
  logoutButton: {
    backgroundColor: colors.error,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  logoutButtonText: {
    ...typography.button,
    color: colors.white,
  },
  submitButtonText: {
    ...typography.button,
    color: colors.white,

  },
  submitButton: {
    width: 150,
    height: 48,
    backgroundColor: colors.primary,
    borderRadius: 12,
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
});
