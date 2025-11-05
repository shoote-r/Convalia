import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';
import { getPatient, addNote, updateStatus } from '@/lib/patientStore';

export default function PatientDetailScreen({ route, navigation }: any) {
  const { patientId } = route.params || {};
  const [patient, setPatient] = useState(() => getPatient(patientId));
  const [rehab, setRehab] = useState('');
  const [diet, setDiet] = useState('');
  const [prescription, setPrescription] = useState('');
  const [notes, setNotes] = useState<any[]>(patient?.notes || []);

  const saveInfo = () => {
    if (!patient) return;
    const newNote = addNote(patient.id, { rehab, diet, prescription });
    setNotes((s) => [newNote, ...s]);
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
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {renderIndicator(patient?.status ?? 'normal')}
          <Text style={styles.name}>{patient?.name}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Constantes</Text>
        <Text style={styles.constText}>{`Pouls: ${patient?.vitals?.pulse ?? '-'} bpm`}</Text>
        <Text style={styles.constText}>{`PA: ${patient?.vitals?.bp ?? '-'}`}</Text>
        <Text style={styles.constText}>{`SpO₂: ${patient?.vitals?.spo2 ?? '-' } %`}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ajouter une note après consultation</Text>
        <TextInput
          placeholder="Programme de rééducation"
          style={styles.input}
          value={rehab}
          onChangeText={setRehab}
          multiline
        />
        <TextInput
          placeholder="Régime / recommandations alimentaires"
          style={styles.input}
          value={diet}
          onChangeText={setDiet}
          multiline
        />
        <TextInput
          placeholder="Prescription"
          style={styles.input}
          value={prescription}
          onChangeText={setPrescription}
          multiline
        />

        <TouchableOpacity style={styles.saveButton} onPress={saveInfo}>
          <Text style={styles.saveText}>Enregistrer</Text>
        </TouchableOpacity>
        <View style={{ height: 12 }} />
        <Text style={[typography.body, { marginBottom: 8 }]}>Actions :</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.error }]} onPress={() => markStatus('reconsult')}>
            <Text style={styles.actionText}>Reconsultation obligatoire</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#FF9F1C' }]} onPress={() => markStatus('monitor')}>
            <Text style={styles.actionText}>Surveiller</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={[styles.section, { marginTop: 12 }]}>
        <Text style={styles.sectionTitle}>Historique des notes</Text>
        {notes.length === 0 ? (
          <Text style={styles.constText}>Aucune note pour le moment.</Text>
        ) : (
          notes.map((n) => (
            <View key={n.id} style={{ marginBottom: 12 }}>
              <Text style={{ ...typography.body, fontWeight: '600' }}>{new Date(n.timestamp).toLocaleString()}</Text>
              {n.rehab ? <Text style={styles.constText}>Rééducation: {n.rehab}</Text> : null}
              {n.diet ? <Text style={styles.constText}>Régime: {n.diet}</Text> : null}
              {n.prescription ? <Text style={styles.constText}>Prescription: {n.prescription}</Text> : null}
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { padding: 20, backgroundColor: colors.white, borderBottomWidth: 1, borderBottomColor: colors.border },
  name: { ...typography.h2, marginLeft: 12 },
  indicator: { width: 14, height: 14, borderRadius: 7 },
  red: { backgroundColor: colors.error },
  orange: { backgroundColor: '#FF9F1C' },
  green: { backgroundColor: '#28A745' },
  section: { padding: 20, backgroundColor: colors.white, marginTop: 12 },
  sectionTitle: { ...typography.h2, marginBottom: 8 },
  constText: { ...typography.body, color: colors.textPrimary, marginBottom: 6 },
  input: { minHeight: 48, borderColor: colors.border, borderWidth: 1, borderRadius: 8, padding: 10, marginBottom: 12, backgroundColor: '#fff' },
  saveButton: { backgroundColor: colors.primary, padding: 14, borderRadius: 12, alignItems: 'center' },
  saveText: { ...typography.button, color: colors.white },
  actionButton: { flex: 1, padding: 10, borderRadius: 8, alignItems: 'center', marginHorizontal: 4 },
  actionText: { ...typography.button, color: colors.white, fontSize: 12 },
});
