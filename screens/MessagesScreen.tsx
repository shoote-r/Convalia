import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';
import { MessageCircle } from 'lucide-react-native';

export default function MessagesScreen() {
  const conversations = [
    {
      id: 1,
      name: 'Dr. Martin (Chirurgien)',
      lastMessage: 'Tout semble normal sur la...',
      time: '10:30',
    },
    {
      id: 2,
      name: 'Infirmière de suivi (Clara)',
      lastMessage: "N'oubliez pas votre traitement de...",
      time: 'Hier',
    },
    {
      id: 3,
      name: 'Support Convalia',
      lastMessage: "Bienvenue sur l'application !",
      time: '2 jours',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Messagerie</Text>
      </View>

      <ScrollView style={styles.content}>
        {conversations.map((conversation) => (
          <TouchableOpacity key={conversation.id} style={styles.conversationCard}>
            <View style={styles.avatar}>
              <MessageCircle size={24} color={colors.white} />
            </View>
            <View style={styles.conversationContent}>
              <View style={styles.conversationHeader}>
                <Text style={styles.conversationName}>{conversation.name}</Text>
                <Text style={styles.conversationTime}>{conversation.time}</Text>
              </View>
              <Text style={styles.conversationMessage} numberOfLines={1}>
                {conversation.lastMessage}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
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
    padding: 24,
    paddingTop: 60,
    paddingBottom: 32,
  },
  title: {
    ...typography.h1,
    color: colors.white,
  },
  content: {
    flex: 1,
  },
  conversationCard: {
    backgroundColor: colors.white,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  conversationContent: {
    flex: 1,
  },
  conversationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  conversationName: {
    ...typography.body,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  conversationTime: {
    ...typography.body,
    fontSize: 12,
    color: colors.textSecondary,
  },
  conversationMessage: {
    ...typography.body,
    fontSize: 14,
    color: colors.textSecondary,
  },
});
