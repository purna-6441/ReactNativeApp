import { StyleSheet } from 'react-native';

export const colors = {
  primary: '#2563EB', // Primary Blue
  secondary: '#6366F1', // Accent Purple
  gradient1: '#3B82F6', // Gradient Blue 1
  gradient2: '#60A5FA', // Gradient Blue 2
  navy: '#1E293B', // Deep Navy
  background: '#F8FAFC', // Soft White
  card: '#FFFFFF', // Card background
  border: '#E5EAF1', // Light Gray
  text: '#1E293B', // Main text
  textSecondary: '#64748B', // Secondary text
  accent: '#6366F1', // Accent
};

export const theme = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 18,
    shadowColor: colors.navy,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 32,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 1,
  },
  input: {
    backgroundColor: 'transparent',
    //borderWidth: 0,
    //borderColor: 'transparent',
    //borderRadius: 18, // keep radius if needed for layout
    paddingHorizontal: 16,
    // paddingVertical: 12,
    height: 64, // 24 (original height) + 40px
    fontSize: 16,
    color: colors.text,
    marginBottom: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 16,
    textAlign: 'center',
  },
  text: {
    color: colors.text,
    fontSize: 16,
  },
  textSecondary: {
    color: colors.textSecondary,
    fontSize: 15,
  },
  accent: {
    color: colors.accent,
  },
}); 