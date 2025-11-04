import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';
import { CheckCircle, PlayCircle, Camera, Moon } from 'lucide-react-native';

export default function PlanScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mon Plan de Soins</Text>
        <Text style={styles.subtitle}>Chirurgie de la hanche - 12 Nov. 2025</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.taskCard}>
          <CheckCircle size={24} color={colors.success} />
          <View style={styles.taskContent}>
            <Text style={styles.taskTitle}>Jour 1 (Aujourd'hui)</Text>
            <Text style={styles.taskDescription}>Questionnaire douleur</Text>
          </View>
        </View>

        <View style={styles.taskCard}>
          <PlayCircle size={24} color={colors.textSecondary} />
          <View style={styles.taskContent}>
            <Text style={styles.taskTitle}>Jour 2</Text>
            <Text style={styles.taskDescription}>
              Exercices de respiration (Vidéo)
            </Text>
          </View>
        </View>

        <View style={styles.taskCard}>
          <Camera size={24} color={colors.textSecondary} />
          <View style={styles.taskContent}>
            <Text style={styles.taskTitle}>Jour 2</Text>
            <Text style={styles.taskDescription}>Prise de photo cicatrice</Text>
          </View>
        </View>

        <View style={styles.taskCard}>
          <Moon size={24} color={colors.textSecondary} />
          <View style={styles.taskContent}>
            <Text style={styles.taskTitle}>Jour 3</Text>
            <Text style={styles.taskDescription}>Repos complet</Text>
          </View>
        </View>
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
    marginBottom: 8,
  },
  subtitle: {
    ...typography.body,
    color: colors.white,
    opacity: 0.9,
  },
  content: {
    padding: 20,
  },
  taskCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 20,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  taskContent: {
    flex: 1,
    marginLeft: 16,
  },
  taskTitle: {
    ...typography.body,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  taskDescription: {
    ...typography.body,
    fontSize: 14,
    color: colors.textSecondary,
  },
});
