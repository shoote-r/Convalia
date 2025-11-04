import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';
import { Camera, X } from 'lucide-react-native';

export default function QuestionnaireScreen({ navigation }: any) {
  const [painLevel, setPainLevel] = useState<number | null>(null);

  const handleSubmit = () => {
    Alert.alert('Merci !', 'Votre suivi a bien été envoyé.');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Suivi de la cicatrice</Text>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => navigation.goBack()}>
          <X size={24} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.questionSection}>
          <Text style={styles.questionTitle}>
            Quel est votre niveau de douleur aujourd'hui ?
          </Text>
          <Text style={styles.questionSubtitle}>(0 = nul, 5 = intense)</Text>

          <View style={styles.painLevelContainer}>
            {[0, 1, 2, 3, 4, 5].map((level) => (
              <TouchableOpacity
                key={level}
                style={[
                  styles.painLevelButton,
                  painLevel === level && styles.painLevelButtonActive,
                ]}
                onPress={() => setPainLevel(level)}>
                <Text
                  style={[
                    styles.painLevelText,
                    painLevel === level && styles.painLevelTextActive,
                  ]}>
                  {level}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.questionSection}>
          <Text style={styles.questionTitle}>Prendre une photo de la zone</Text>

          <TouchableOpacity
            style={styles.cameraButton}
            onPress={() => Alert.alert('Fonctionnalité non disponible')}>
            <Camera size={32} color={colors.white} />
            <Text style={styles.cameraButtonText}>Ouvrir l'appareil photo</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Envoyer mon suivi</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.white,
    padding: 20,
    paddingTop: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    ...typography.h2,
    color: colors.textPrimary,
  },
  closeButton: {
    padding: 4,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  questionSection: {
    marginBottom: 32,
  },
  questionTitle: {
    ...typography.body,
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  questionSubtitle: {
    ...typography.body,
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 20,
  },
  painLevelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 10,
  },
  painLevelButton: {
    width: 55,
    height: 55,
    borderRadius: 12,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.border,
  },
  painLevelButtonActive: {
    backgroundColor: colors.secondary,
    borderColor: colors.secondary,
  },
  painLevelText: {
    ...typography.h2,
    color: colors.textPrimary,
  },
  painLevelTextActive: {
    color: colors.white,
  },
  cameraButton: {
    backgroundColor: colors.secondary,
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 12,
  },
  cameraButtonText: {
    ...typography.button,
    color: colors.white,
    fontSize: 18,
  },
  submitButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 40,
  },
  submitButtonText: {
    ...typography.button,
    color: colors.white,
  },
});
