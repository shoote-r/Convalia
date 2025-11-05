import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';
import { getPatient, addNote, updateStatus } from '@/lib/patientStore';
import { ArrowLeft, Activity, AlertCircle } from 'lucide-react-native';

export default function PatientDetailScreen({ route, navigation }: any) {
  const { patientId } = route.params || {};
  const [patient, setPatient] = useState(() => getPatient(patientId));
  const [rehab, setRehab] = useState('');
  const [diet, setDiet] = useState('');
  const [prescription, setPrescription] = useState('');
  const [notes, setNotes] = useState<any[]>(patient?.notes || []);

  const saveInfo = () => {
    if (!patient) return;
    Alert.alert('Enregistré', 'Les informations ont été ajoutées au dossier du patient.');
    navigation.goBack();
  };

  const renderIndicator = (status: string) => {
    if (status === 'reconsult') return <View style={[styles.indicator, styles.red]} />;
    if (status === 'monitor') return <View style={[styles.indicator, styles.orange]} />;
    return <View style={[styles.indicator, styles.green]} />;
  };

  const markStatus = (status: 'normal' | 'monitor' | 'reconsult') => {
    if (!patient) return;
    updateStatus(patient.id, status);
    setPatient(getPatient(patient.id));
  };

  return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <ArrowLeft size={24} color={colors.white} />
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            {renderIndicator(patient?.status ?? 'normal')}
            <Text style={styles.name}>{patient?.name}</Text>
          </View>
          <View style={styles.headerRight} />
        </View>

        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          <TouchableOpacity style={styles.section} onPress={() => navigation.navigate('VitalsChart', { patientId: patient?.id })}>
            <View style={styles.sectionHeader}>
              <Activity size={20} color={colors.primary} />
              <Text style={styles.sectionTitle}>Constantes vitales</Text>
            </View>
            <View style={styles.vitalsGrid}>
              <View style={styles.vitalCard}>
                <Text style={styles.vitalValue}>{patient?.vitals?.pulse ?? '-'}</Text>
                <Text style={styles.vitalLabel}>Pouls (bpm)</Text>
              </View>
              <View style={styles.vitalCard}>
                <Text style={styles.vitalValue}>{patient?.vitals?.bp ?? '-'}</Text>
                <Text style={styles.vitalLabel}>PA</Text>
              </View>
              <View style={styles.vitalCard}>
                <Text style={styles.vitalValue}>{patient?.vitals?.spo2 ?? '-'}</Text>
                <Text style={styles.vitalLabel}>SpO₂ (%)</Text>
              </View>
            </View>
          </TouchableOpacity>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <AlertCircle size={20} color={colors.primary} />
              <Text style={styles.sectionTitle}>Ajouter une note après consultation</Text>
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Programme de rééducation</Text>
              <TextInput
                placeholder="Détails du programme..."
                placeholderTextColor={colors.textSecondary}
                style={styles.input}
                value={rehab}
                onChangeText={setRehab}
                multiline
              />
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Régime alimentaire</Text>
              <TextInput
                placeholder="Recommandations alimentaires..."
                placeholderTextColor={colors.textSecondary}
                style={styles.input}
                value={diet}
                onChangeText={setDiet}
                multiline
              />
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Prescription</Text>
              <TextInput
                placeholder="Médicaments et posologie..."
                placeholderTextColor={colors.textSecondary}
                style={styles.input}
                value={prescription}
                onChangeText={setPrescription}
                multiline
              />
            </View>

            <TouchableOpacity style={styles.saveButton} onPress={saveInfo}>
              <Text style={styles.saveText}>Enregistrer la note</Text>
            </TouchableOpacity>

            <View style={styles.actionsContainer}>
              <Text style={styles.actionsTitle}>Actions rapides</Text>
              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={[styles.actionButton, styles.actionButtonDanger]}
                  onPress={() => markStatus('reconsult')}>
                  <AlertCircle size={16} color={colors.white} />
                  <Text style={styles.actionText}>Reconsultation</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionButton, styles.actionButtonWarning]}
                  onPress={() => markStatus('monitor')}>
                  <Activity size={16} color={colors.white} />
                  <Text style={styles.actionText}>Surveiller</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={[styles.section, styles.lastSection]}>
            <Text style={styles.sectionTitle}>Historique des notes</Text>
            {notes.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateText}>Aucune note pour le moment.</Text>
              </View>
            ) : (
              notes.map((n) => (
                <View key={n.id} style={styles.noteCard}>
                  <Text style={styles.noteDate}>{new Date(n.timestamp).toLocaleString()}</Text>
                  {n.rehab ? (
                    <View style={styles.noteItem}>
                      <Text style={styles.noteLabel}>Rééducation:</Text>
                      <Text style={styles.noteText}>{n.rehab}</Text>
                    </View>
                  ) : null}
                  {n.diet ? (
                    <View style={styles.noteItem}>
                      <Text style={styles.noteLabel}>Régime:</Text>
                      <Text style={styles.noteText}>{n.diet}</Text>
                    </View>
                  ) : null}
                  {n.prescription ? (
                    <View style={styles.noteItem}>
                      <Text style={styles.noteLabel}>Prescription:</Text>
                      <Text style={styles.noteText}>{n.prescription}</Text>
                    </View>
                  ) : null}
                </View>
              ))
            )}
          </View>
        </ScrollView>
      </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 8,
  },
  headerCenter: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerRight: {
    width: 40,
  },
  name: {
    ...typography.h2,
    fontSize: 20,
    color: colors.white,
    marginLeft: 12,
  },
  indicator: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  red: {
    backgroundColor: '#FF4444',
  },
  orange: {
    backgroundColor: '#FF9F1C',
  },
  green: {
    backgroundColor: '#28A745',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  section: {
    padding: 20,
    backgroundColor: colors.white,
    marginTop: 12,
    marginHorizontal: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  lastSection: {
    marginBottom: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    ...typography.h2,
    fontSize: 18,
    marginLeft: 8,
    color: colors.textPrimary,
  },
  vitalsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  vitalCard: {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: 8,
    padding: 12,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  vitalValue: {
    ...typography.h2,
    fontSize: 24,
    color: colors.primary,
    marginBottom: 4,
  },
  vitalLabel: {
    ...typography.body,
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  inputWrapper: {
    marginBottom: 16,
  },
  inputLabel: {
    ...typography.body,
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  input: {
    minHeight: 80,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    backgroundColor: colors.background,
    ...typography.body,
    color: colors.textPrimary,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  saveText: {
    ...typography.button,
    color: colors.white,
    fontSize: 16,
  },
  actionsContainer: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  actionsTitle: {
    ...typography.body,
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 12,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
  },
  actionButtonDanger: {
    backgroundColor: colors.error,
  },
  actionButtonWarning: {
    backgroundColor: '#FF9F1C',
  },
  actionText: {
    ...typography.button,
    color: colors.white,
    fontSize: 13,
    marginLeft: 6,
  },
  emptyState: {
    padding: 24,
    alignItems: 'center',
  },
  emptyStateText: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  noteCard: {
    backgroundColor: colors.background,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  noteDate: {
    ...typography.body,
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 8,
  },
  noteItem: {
    marginBottom: 6,
  },
  noteLabel: {
    ...typography.body,
    fontSize: 13,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  noteText: {
    ...typography.body,
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
});
