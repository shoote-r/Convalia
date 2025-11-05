import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';
import { getAllPatients } from '@/lib/patientStore';
import { useIsFocused } from '@react-navigation/native';
import { LogOut, Stethoscope } from 'lucide-react-native';

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
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <View style={styles.iconContainer}>
              <Stethoscope size={24} color={colors.white} />
            </View>
            <Text style={styles.headerTitle}>Mes patients</Text>
          </View>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => navigation.replace('RoleSelection')}>
            <LogOut size={20} color={colors.white} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{patients.length}</Text>
            <Text style={styles.statLabel}>Total patients</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statNumber, { color: colors.error }]}>
              {patients.filter((p) => p.status === 'reconsult').length}
            </Text>
            <Text style={styles.statLabel}>Urgent</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statNumber, { color: '#FF9F1C' }]}>
              {patients.filter((p) => p.status === 'monitor').length}
            </Text>
            <Text style={styles.statLabel}>À surveiller</Text>
          </View>
        </View>

        <FlatList
          data={patients}
          keyExtractor={(i) => i.id}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate('PatientDetail', { patientId: item.id })}>
              <View style={styles.left}>
                {renderIndicator(item.status)}
                <View style={styles.patientInfo}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.sub}>{`Pouls ${item.vitals.pulse} - PA ${item.vitals.bp}`}</Text>
                </View>
              </View>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerTitle: {
    ...typography.h1,
    fontSize: 24,
    color: colors.white,
  },
  logoutButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 4,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statNumber: {
    ...typography.h1,
    fontSize: 28,
    color: colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    ...typography.body,
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  patientInfo: {
    marginLeft: 12,
    flex: 1,
  },
  indicator: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  red: {
    backgroundColor: colors.error,
  },
  orange: {
    backgroundColor: '#FF9F1C',
  },
  green: {
    backgroundColor: '#28A745',
  },
  name: {
    ...typography.body,
    fontWeight: '700',
    fontSize: 16,
    color: colors.textPrimary,
  },
  sub: {
    ...typography.body,
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },
  chevron: {
    fontSize: 28,
    color: colors.textSecondary,
  },
});
