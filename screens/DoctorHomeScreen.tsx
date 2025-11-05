import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';
import { getAllPatients } from '@/lib/patientStore';
import { useIsFocused } from '@react-navigation/native';

export default function DoctorHomeScreen({ navigation }: any) {
  const [patients, setPatients] = useState(getAllPatients());
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) setPatients(getAllPatients());
  }, [isFocused]);

  const renderIndicator = (status: string) => {
    if (status === 'reconsult') return <View style={[styles.indicator, styles.red]} />;
    if (status === 'monitor') return <View style={[styles.indicator, styles.orange]} />;
    return <View style={[styles.indicator, styles.green]} />;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mes patients</Text>

      <FlatList
        data={patients}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('PatientDetail', { patientId: item.id })}>
            <View style={styles.left}>
              {renderIndicator(item.status)}
              <View style={{ marginLeft: 12 }}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.sub}>{`Pouls ${item.vitals.pulse} - PA ${item.vitals.bp}`}</Text>
              </View>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 16 },
  title: { ...typography.h2, marginBottom: 12 },
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  left: { flexDirection: 'row', alignItems: 'center' },
  indicator: { width: 14, height: 14, borderRadius: 7 },
  red: { backgroundColor: colors.error },
  orange: { backgroundColor: '#FF9F1C' },
  green: { backgroundColor: '#28A745' },
  name: { ...typography.body, fontWeight: '700' },
  sub: { ...typography.body, color: colors.textSecondary, marginTop: 4 },
  chevron: { fontSize: 24, color: colors.textSecondary },
});
