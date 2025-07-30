import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, FlatList, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchCompanyList } from '../api/productsApi';

// Add Company type
interface Company {
  companyId: number;
  companyName: string;
}

const LoginScreen = () => {
  const navigation: any = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; company?: string }>({});
  const [company, setCompany] = useState<Company | null>(null); // Store selected company object
  const [companyModalVisible, setCompanyModalVisible] = useState(false);
  const [companies, setCompanies] = useState<Company[]>([]); // No static companies, only fetched
  const [loadingCompanies, setLoadingCompanies] = useState(false);

  React.useEffect(() => {
    setLoadingCompanies(true);
    fetchCompanyList()
      .then((data) => {
        if (Array.isArray(data)) {
          if (typeof data[0] === 'object' && data[0] !== null && data[0].companyName) {
            setCompanies(data);
          } else {
            setCompanies([]); // No fallback to static companies
          }
        }
        setLoadingCompanies(false);
      })
      .catch((error) => {
        setLoadingCompanies(false);
        setCompanies([]); // No static companies on error
      });
  }, []);

  const validate = () => {
    const newErrors: { email?: string; password?: string; company?: string } = {};
    if (!email) {
      newErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Enter a valid email address.';
    }
    if (!password) {
      newErrors.password = 'Password is required.';
    }
    if (!company) {
      newErrors.company = 'Company selection is required.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
 
  const handleLogin = () => {
    if (validate()) {
      navigation.navigate('Categories');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>LOGIN</Text>
      <View style={styles.form}>
        {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
        {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
        {errors.company ? <Text style={styles.errorText}>{errors.company}</Text> : null}
        <View style={styles.inputWrapper}>
          <Text style={styles.inputIcon}>📧</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#888"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.inputIcon}>🔒</Text>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#888"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
        </View>
        {/* Company input */}
        <View style={styles.inputWrapper}>
          <Text style={styles.inputIcon}>🏢</Text>
          <TouchableOpacity style={{ flex: 1 }} onPress={() => setCompanyModalVisible(true)} activeOpacity={0.7}>
            <TextInput
              style={styles.input}
              placeholder="Select Company"
              placeholderTextColor="#888"
              value={company ? company.companyName : ''}
              editable={false}
              showSoftInputOnFocus={false}
            />
          </TouchableOpacity>
        </View>
        {/* Company selection modal */}
        <Modal
          visible={companyModalVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setCompanyModalVisible(false)}
        >
          <TouchableWithoutFeedback onPress={() => setCompanyModalVisible(false)}>
            <View style={styles.modalOverlay} />
          </TouchableWithoutFeedback>
          <View style={styles.modalContainer}>
            {loadingCompanies ? (
              <Text style={{ textAlign: 'center', padding: 20 }}>Loading companies...</Text>
            ) : (
              <FlatList
                data={companies}
                keyExtractor={(item) => item.companyId.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      styles.companyOption,
                      company && item.companyId === company.companyId && styles.companyOptionSelected,
                    ]}
                    onPress={() => {
                      setCompany(item);
                      setCompanyModalVisible(false);
                    }}
                  >
                    <Text
                      style={[
                        styles.companyOptionText,
                        company && item.companyId === company.companyId && styles.companyOptionTextSelected,
                      ]}
                    >
                      {item.companyName}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            )}
          </View>
        </Modal>
        {/* End company modal */}
        <View style={styles.rememberMeRow}>
          <TouchableOpacity onPress={() => setRememberMe(!rememberMe)} style={styles.checkboxContainer}>
            <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
              {rememberMe && <Text style={styles.checkboxTick}>✓</Text>}
            </View>
          </TouchableOpacity>
          <Text style={styles.rememberMeText}>Remember me</Text>
        </View>
        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
          <Text style={styles.loginBtnText}>LOGIN</Text>
        </TouchableOpacity>
        <View style={styles.dividerRow}>
          <View style={styles.divider} />
          <Text style={styles.orText}>Or login with</Text>
          <View style={styles.divider} />
        </View>
        <View style={styles.socialRow}>
          <TouchableOpacity style={styles.socialBtnFacebook}>
            <Text style={styles.socialIcon}>📘</Text>
            <Text style={styles.socialBtnTextFacebook}>Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialBtnGoogle}>
            <Text style={styles.socialIcon}>🟦</Text>
            <Text style={styles.socialBtnTextGoogle}>Google</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.signupRow}>
        <Text style={styles.signupText}>Not a member? </Text>
        <TouchableOpacity>
          <Text style={styles.signupLink}>Sign up now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 32,
    color: '#222',
    letterSpacing: 1,
  },
  form: {
    width: '100%',
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  errorText: {
    color: '#ff4d4f',
    fontSize: 14,
    marginBottom: 8,
    textAlign: 'center',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 6,
    marginBottom: 16,
    paddingHorizontal: 12,
    width: '100%',
    height: 48,
  },
  inputIcon: {
    width: 24,
    fontSize: 20,
    marginRight: 8,
    textAlign: 'center',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#222',
  },
  rememberMeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
    width: '100%',
  },
  checkboxContainer: {
    marginRight: 6,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: '#d32f6f',
    borderRadius: 4,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#d32f6f',
    borderColor: '#d32f6f',
  },
  checkboxTick: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
  },
  rememberMeText: {
    fontSize: 14,
    color: '#222',
  },
  loginBtn: {
    backgroundColor: '#d32f6f',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  loginBtnText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 18,
    width: '100%',
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#e5e7eb',
  },
  orText: {
    marginHorizontal: 8,
    color: '#6b7280',
    fontSize: 13,
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 8,
  },
  socialBtnFacebook: {
    flex: 1,
    backgroundColor: '#4267B2',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginRight: 8,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socialBtnGoogle: {
    flex: 1,
    backgroundColor: '#fff',
    borderColor: '#e5e7eb',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginLeft: 8,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socialIcon: {
    width: 24,
    fontSize: 20,
    marginRight: 8,
    textAlign: 'center',
  },
  socialBtnTextFacebook: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  socialBtnTextGoogle: {
    color: '#222',
    fontSize: 15,
    fontWeight: 'bold',
  },
  signupRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
  },
  signupText: {
    color: '#888',
    fontSize: 14,
  },
  signupLink: {
    color: '#d32f6f',
    fontWeight: 'bold',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    width: '100%',
    maxHeight: '60%',
    padding: 20,
  },
  companyOption: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  companyOptionText: {
    fontSize: 16,
    color: '#222',
  },
  companyOptionSelected: {
    backgroundColor: '#f0e6f6',
  },
  companyOptionTextSelected: {
    color: '#d32f6f',
    fontWeight: 'bold',
  },
});

export default LoginScreen; 