import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const matches = [
  { time: '18:00', teams: 'Raja CA vs Wydad AC', league: 'Botola Pro' },
  { time: '20:30', teams: 'Real Madrid vs Bayern', league: 'Champions League' },
  { time: '22:00', teams: 'PSG vs Marseille', league: 'Ligue 1' },
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.eyebrow}>Football App</Text>
            <Text style={styles.title}>Bienvenue</Text>
          </View>
          <View style={styles.scorePill}>
            <Text style={styles.scoreText}>Live</Text>
          </View>
        </View>

        <View style={styles.hero}>
          <Text style={styles.heroLabel}>Match du jour</Text>
          <Text style={styles.heroTitle}>Suivez vos equipes preferees en direct</Text>
          <Text style={styles.heroText}>
            Scores, calendrier, favoris et notifications dans une seule application.
          </Text>
          <Pressable style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Voir les matchs</Text>
          </Pressable>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Prochains matchs</Text>
          <Text style={styles.sectionAction}>Aujourd&apos;hui</Text>
        </View>

        <View style={styles.matchList}>
          {matches.map((match) => (
            <View key={`${match.time}-${match.teams}`} style={styles.matchCard}>
              <View style={styles.matchTime}>
                <Text style={styles.matchTimeText}>{match.time}</Text>
              </View>
              <View style={styles.matchInfo}>
                <Text style={styles.matchTeams}>{match.teams}</Text>
                <Text style={styles.matchLeague}>{match.league}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#101820',
  },
  container: {
    padding: 20,
    paddingBottom: 36,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  eyebrow: {
    color: '#7ddf9a',
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  title: {
    color: '#ffffff',
    fontSize: 34,
    fontWeight: '800',
    marginTop: 4,
  },
  scorePill: {
    backgroundColor: '#e63845',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  scoreText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '800',
  },
  hero: {
    backgroundColor: '#1d2f2a',
    borderRadius: 8,
    padding: 22,
  },
  heroLabel: {
    color: '#9be7b2',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 12,
  },
  heroTitle: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: '900',
    lineHeight: 34,
  },
  heroText: {
    color: '#c8d7d0',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 12,
  },
  primaryButton: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#7ddf9a',
    borderRadius: 8,
    marginTop: 22,
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  primaryButtonText: {
    color: '#0e1814',
    fontSize: 15,
    fontWeight: '800',
  },
  sectionHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
    marginTop: 28,
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '800',
  },
  sectionAction: {
    color: '#7ddf9a',
    fontSize: 14,
    fontWeight: '700',
  },
  matchList: {
    gap: 12,
  },
  matchCard: {
    alignItems: 'center',
    backgroundColor: '#f4f7f5',
    borderRadius: 8,
    flexDirection: 'row',
    gap: 14,
    padding: 16,
  },
  matchTime: {
    alignItems: 'center',
    backgroundColor: '#101820',
    borderRadius: 8,
    justifyContent: 'center',
    minWidth: 64,
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  matchTimeText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '900',
  },
  matchInfo: {
    flex: 1,
  },
  matchTeams: {
    color: '#101820',
    fontSize: 16,
    fontWeight: '800',
  },
  matchLeague: {
    color: '#64736d',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 4,
  },
});
