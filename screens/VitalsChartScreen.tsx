import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';
import { getPatient } from '@/lib/patientStore';
import { ArrowLeft, TrendingUp, TrendingDown, Activity } from 'lucide-react-native';
import Svg, { Line, Circle, Text as SvgText, Rect } from 'react-native-svg';

const { width: screenWidth } = Dimensions.get('window');
const chartWidth = screenWidth - 64;
const chartHeight = 180;

export default function VitalsChartScreen({ route, navigation }: any) {
  const { patientId } = route.params || {};
  const patient = getPatient(patientId);

  const pulseData = [65, 68, 72, 70, 75, 72, 71];
  const spo2Data = [96, 97, 98, 97, 99, 98, 97];
  const bpSystolicData = [115, 118, 120, 122, 120, 118, 120];
  const bpDiastolicData = [75, 78, 80, 82, 80, 78, 80];
  const days = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

  const renderLineChart = (data: number[], color: string, minVal: number, maxVal: number) => {
    const padding = 40;
    const graphWidth = chartWidth - padding * 2;
    const graphHeight = chartHeight - padding * 2;
    const stepX = graphWidth / (data.length - 1);
    const range = maxVal - minVal;

    const points = data.map((val, index) => {
      const x = padding + index * stepX;
      const y = padding + graphHeight - ((val - minVal) / range) * graphHeight;
      return { x, y, val };
    });

    return (
      <Svg width={chartWidth} height={chartHeight}>
        {points.map((point, index) => {
          if (index < points.length - 1) {
            const nextPoint = points[index + 1];
            return (
              <Line
                key={`line-${index}`}
                x1={point.x}
                y1={point.y}
                x2={nextPoint.x}
                y2={nextPoint.y}
                stroke={color}
                strokeWidth="3"
              />
            );
          }
          return null;
        })}
        {points.map((point, index) => (
          <Circle
            key={`circle-${index}`}
            cx={point.x}
            cy={point.y}
            r="5"
            fill={color}
          />
        ))}
        {points.map((point, index) => (
          <SvgText
            key={`value-${index}`}
            x={point.x}
            y={point.y - 10}
            fontSize="10"
            fill={colors.textSecondary}
            textAnchor="middle">
            {point.val}
          </SvgText>
        ))}
        {days.map((day, index) => {
          const x = padding + index * stepX;
          return (
            <SvgText
              key={`day-${index}`}
              x={x}
              y={chartHeight - 10}
              fontSize="11"
              fill={colors.textSecondary}
              textAnchor="middle">
              {day}
            </SvgText>
          );
        })}
      </Svg>
    );
  };

  const renderBarChart = (systolic: number[], diastolic: number[], color1: string, color2: string) => {
    const padding = 40;
    const graphWidth = chartWidth - padding * 2;
    const graphHeight = chartHeight - padding * 2;
    const barWidth = (graphWidth / systolic.length) * 0.35;
    const stepX = graphWidth / systolic.length;
    const maxVal = Math.max(...systolic, ...diastolic);
    const minVal = Math.min(...systolic, ...diastolic) - 10;
    const range = maxVal - minVal;

    return (
      <Svg width={chartWidth} height={chartHeight}>
        {systolic.map((val, index) => {
          const x = padding + index * stepX + stepX * 0.15;
          const barHeight = ((val - minVal) / range) * graphHeight;
          const y = padding + graphHeight - barHeight;
          return (
            <Rect
              key={`sys-${index}`}
              x={x}
              y={y}
              width={barWidth}
              height={barHeight}
              fill={color1}
              rx="4"
            />
          );
        })}
        {diastolic.map((val, index) => {
          const x = padding + index * stepX + stepX * 0.5;
          const barHeight = ((val - minVal) / range) * graphHeight;
          const y = padding + graphHeight - barHeight;
          return (
            <Rect
              key={`dia-${index}`}
              x={x}
              y={y}
              width={barWidth}
              height={barHeight}
              fill={color2}
              rx="4"
            />
          );
        })}
        {days.map((day, index) => {
          const x = padding + index * stepX + stepX * 0.5;
          return (
            <SvgText
              key={`day-${index}`}
              x={x}
              y={chartHeight - 10}
              fontSize="11"
              fill={colors.textSecondary}
              textAnchor="middle">
              {day}
            </SvgText>
          );
        })}
      </Svg>
    );
  };

  const getCurrentTrend = (data: number[]) => {
    const recent = data.slice(-3);
    const avg = recent.reduce((a, b) => a + b, 0) / recent.length;
    const lastVal = data[data.length - 1];
    return lastVal > avg ? 'up' : lastVal < avg ? 'down' : 'stable';
  };

  const pulseTrend = getCurrentTrend(pulseData);
  const spo2Trend = getCurrentTrend(spo2Data);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <ArrowLeft size={24} color={colors.white} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Activity size={24} color={colors.white} />
          <Text style={styles.headerTitle}>Constantes vitales</Text>
        </View>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.patientInfo}>
          <Text style={styles.patientName}>{patient?.name}</Text>
          <Text style={styles.patientSubtext}>Suivi sur 7 jours</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <Text style={styles.sectionTitle}>Pouls (bpm)</Text>
              {pulseTrend === 'up' ? (
                <TrendingUp size={18} color={colors.error} />
              ) : pulseTrend === 'down' ? (
                <TrendingDown size={18} color={colors.success} />
              ) : null}
            </View>
            <Text style={styles.currentValue}>{patient?.vitals?.pulse ?? '-'}</Text>
          </View>
          <View style={styles.chartContainer}>
            {renderLineChart(pulseData, colors.secondary, 60, 80)}
          </View>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Min</Text>
              <Text style={styles.statValue}>{Math.min(...pulseData)}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Moy</Text>
              <Text style={styles.statValue}>
                {Math.round(pulseData.reduce((a, b) => a + b, 0) / pulseData.length)}
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Max</Text>
              <Text style={styles.statValue}>{Math.max(...pulseData)}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <Text style={styles.sectionTitle}>Saturation (SpO₂%)</Text>
              {spo2Trend === 'up' ? (
                <TrendingUp size={18} color={colors.success} />
              ) : spo2Trend === 'down' ? (
                <TrendingDown size={18} color={colors.error} />
              ) : null}
            </View>
            <Text style={styles.currentValue}>{patient?.vitals?.spo2 ?? '-'}</Text>
          </View>
          <View style={styles.chartContainer}>
            {renderLineChart(spo2Data, colors.primary, 92, 100)}
          </View>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Min</Text>
              <Text style={styles.statValue}>{Math.min(...spo2Data)}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Moy</Text>
              <Text style={styles.statValue}>
                {Math.round(spo2Data.reduce((a, b) => a + b, 0) / spo2Data.length)}
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Max</Text>
              <Text style={styles.statValue}>{Math.max(...spo2Data)}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Pression artérielle (mmHg)</Text>
            <Text style={styles.currentValue}>{patient?.vitals?.bp ?? '-'}</Text>
          </View>
          <View style={styles.chartContainer}>
            {renderBarChart(bpSystolicData, bpDiastolicData, '#E74C3C', '#3498DB')}
          </View>
          <View style={styles.legendRow}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#E74C3C' }]} />
              <Text style={styles.legendText}>Systolique</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#3498DB' }]} />
              <Text style={styles.legendText}>Diastolique</Text>
            </View>
          </View>
        </View>

        <View style={[styles.section, styles.infoSection]}>
          <Text style={styles.infoTitle}>Recommandations</Text>
          <Text style={styles.infoText}>
            Les constantes vitales sont globalement stables. Continuez à surveiller
            régulièrement et contactez le médecin en cas de variation importante.
          </Text>
        </View>
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
  headerTitle: {
    ...typography.h2,
    fontSize: 20,
    color: colors.white,
    marginLeft: 12,
  },
  headerRight: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  patientInfo: {
    backgroundColor: colors.white,
    padding: 20,
    marginTop: 12,
    marginHorizontal: 16,
    borderRadius: 12,
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
  patientName: {
    ...typography.h2,
    fontSize: 22,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  patientSubtext: {
    ...typography.body,
    fontSize: 14,
    color: colors.textSecondary,
  },
  section: {
    backgroundColor: colors.white,
    padding: 20,
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    ...typography.h2,
    fontSize: 18,
    color: colors.textPrimary,
    marginRight: 8,
  },
  currentValue: {
    ...typography.h2,
    fontSize: 24,
    color: colors.primary,
  },
  chartContainer: {
    alignItems: 'center',
    marginVertical: 8,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    ...typography.body,
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  statValue: {
    ...typography.body,
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 12,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  legendText: {
    ...typography.body,
    fontSize: 14,
    color: colors.textSecondary,
  },
  infoSection: {
    backgroundColor: '#E8F4F8',
  },
  infoTitle: {
    ...typography.body,
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: 8,
  },
  infoText: {
    ...typography.body,
    fontSize: 14,
    color: colors.textPrimary,
    lineHeight: 20,
  },
});
