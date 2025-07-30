import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { theme, colors } from '../assets/Style/theme';

interface SettingItem {
  id: string;
  title: string;
  subtitle?: string;
  type: 'switch' | 'navigation' | 'info';
  value?: boolean;
  onPress?: () => void;
}

const SettingsScreen = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(false);
  const [locationAccess, setLocationAccess] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const settingsSections = [
    {
      title: 'Notifications',
      items: [
        {
          id: 'push_notifications',
          title: 'Push Notifications',
          subtitle: 'Receive notifications about orders and updates',
          type: 'switch' as const,
          value: notificationsEnabled,
          onPress: () => setNotificationsEnabled(!notificationsEnabled)
        },
        {
          id: 'email_updates',
          title: 'Email Updates',
          subtitle: 'Get promotional emails and newsletters',
          type: 'switch' as const,
          value: emailUpdates,
          onPress: () => setEmailUpdates(!emailUpdates)
        }
      ]
    },
    {
      title: 'Privacy & Security',
      items: [
        {
          id: 'location_access',
          title: 'Location Access',
          subtitle: 'Allow app to access your location',
          type: 'switch' as const,
          value: locationAccess,
          onPress: () => setLocationAccess(!locationAccess)
        },
        {
          id: 'privacy_policy',
          title: 'Privacy Policy',
          subtitle: 'Read our privacy policy',
          type: 'navigation' as const,
          onPress: () => console.log('Navigate to Privacy Policy')
        },
        {
          id: 'data_usage',
          title: 'Data Usage',
          subtitle: 'Manage your data preferences',
          type: 'navigation' as const,
          onPress: () => console.log('Navigate to Data Usage')
        }
      ]
    },
    {
      title: 'Appearance',
      items: [
        {
          id: 'dark_mode',
          title: 'Dark Mode',
          subtitle: 'Switch to dark theme',
          type: 'switch' as const,
          value: darkMode,
          onPress: () => setDarkMode(!darkMode)
        },
        {
          id: 'language',
          title: 'Language',
          subtitle: 'English',
          type: 'navigation' as const,
          onPress: () => console.log('Navigate to Language Selection')
        }
      ]
    },
    {
      title: 'Account',
      items: [
        {
          id: 'edit_profile',
          title: 'Edit Profile',
          subtitle: 'Update your personal information',
          type: 'navigation' as const,
          onPress: () => console.log('Navigate to Edit Profile')
        },
        {
          id: 'change_password',
          title: 'Change Password',
          subtitle: 'Update your account password',
          type: 'navigation' as const,
          onPress: () => console.log('Navigate to Change Password')
        },
        {
          id: 'delete_account',
          title: 'Delete Account',
          subtitle: 'Permanently delete your account',
          type: 'navigation' as const,
          onPress: () => console.log('Navigate to Delete Account')
        }
      ]
    },
    {
      title: 'Support',
      items: [
        {
          id: 'help_center',
          title: 'Help Center',
          subtitle: 'Get help and support',
          type: 'navigation' as const,
          onPress: () => console.log('Navigate to Help Center')
        },
        {
          id: 'contact_us',
          title: 'Contact Us',
          subtitle: 'Get in touch with our support team',
          type: 'navigation' as const,
          onPress: () => console.log('Navigate to Contact Us')
        },
        {
          id: 'version',
          title: 'App Version',
          subtitle: '1.0.0',
          type: 'info' as const
        }
      ]
    }
  ];

  const renderSettingItem = (item: SettingItem) => (
    <TouchableOpacity
      key={item.id}
      style={styles.settingItem}
      onPress={item.onPress}
      disabled={item.type === 'info'}
    >
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{item.title}</Text>
        {item.subtitle && <Text style={styles.settingSubtitle}>{item.subtitle}</Text>}
      </View>
      <View style={styles.settingAction}>
        {item.type === 'switch' && (
          <Switch
            value={item.value}
            onValueChange={item.onPress}
            trackColor={{ false: '#767577', true: colors.primary }}
            thumbColor={item.value ? '#fff' : '#f4f3f4'}
          />
        )}
        {item.type === 'navigation' && (
          <Text style={styles.chevron}>›</Text>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
        <Text style={styles.headerSubtitle}>Manage your app preferences</Text>
      </View>

      {settingsSections.map((section, index) => (
        <View key={index} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          <View style={styles.sectionContent}>
            {section.items.map(renderSettingItem)}
          </View>
        </View>
      ))}

      <View style={styles.footer}>
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: colors.primary,
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  sectionContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  settingAction: {
    marginLeft: 12,
  },
  chevron: {
    fontSize: 24,
    color: '#ccc',
    fontWeight: 'bold',
  },
  footer: {
    padding: 20,
    paddingBottom: 40,
  },
  logoutButton: {
    backgroundColor: '#FF4444',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SettingsScreen;