import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';
import { ClipboardList, Video, Calendar } from 'lucide-react-native';

export default function HomeScreen({ navigation }: any) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Bonjour, David</Text>
        <Text style={styles.subtitle}>Votre suivi du jour</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <ClipboardList size={28} color={colors.primary} />
            <View style={styles.cardHeaderText}>
              <Text style={styles.cardTitle}>Questionnaire quotidien</Text>
              <Text style={styles.cardDescription}>
                Prêt à remplir votre suivi de cicatrisation ?
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => navigation.navigate('QuestionnaireModal')}>
            <Text style={styles.secondaryButtonText}>Commencer (5 min)</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Calendar size={28} color={colors.primary} />
            <View style={styles.cardHeaderText}>
              <Text style={styles.cardTitle}>Prochain rendez-vous</Text>
              <Text style={styles.cardDescription}>
                Lundi 10 Nov. - 14h30 avec Dr. Martin (Visio)
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('Plan')}>
          <View style={styles.cardHeader}>
            <Video size={28} color={colors.primary} />
            <View style={styles.cardHeaderText}>
              <Text style={styles.cardTitle}>Votre plan de rééducation</Text>
              <Text style={styles.cardDescription}>Voir les exercices (3 vidéos)</Text>
            </View>
          </View>
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
  greeting: {
    ...typography.h1,
    color: colors.white,
    marginBottom: 4,
  },
  subtitle: {
    ...typography.body,
    color: colors.white,
    opacity: 0.9,
  },
  content: {
    padding: 20,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  cardHeaderText: {
    flex: 1,
    marginLeft: 12,
  },
  cardTitle: {
    ...typography.h2,
    fontSize: 18,
    color: colors.textPrimary,
    marginBottom: 6,
  },
  cardDescription: {
    ...typography.body,
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  secondaryButton: {
    backgroundColor: colors.secondary,
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
  },
  secondaryButtonText: {
    ...typography.button,
    color: colors.white,
  },
});
