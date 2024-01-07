import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { useNavigation } from '@react-navigation/native';

const db = SQLite.openDatabase('mobilodev1.db'); // Veritabanı adı 'dbName.db'

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = () => {
    if(username==''){
        Alert.alert('kullanıcı adı boş bırakılamaz.')
    }
    else if(password==''){
        Alert.alert('şifre boş bırakılamaz.')
    }
    else{
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM users WHERE userName = ? AND password = ?;',
        [username, password],
        (tx, result) => {
          if (result.rows.length > 0) {
            navigation.navigate('Home');
            console.log('Giriş başarılı. Kullanıcı:');
          } else {
            Alert.alert('Kullanıcı adı veya şifre hatalı.');
            console.log('Kullanıcı bulunamadı veya hatalı giriş.');
          }
        },
        (tx, error) => {
          console.log('Kullanıcı girişi sırasında hata:', error);
        }
      );
    });
}
  };

  const handleSignUp = () => {
    navigation.navigate('register')
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Kullanıcı Adı</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setUsername(text)}
        value={username}
        placeholder="Kullanıcı Adı"
      />
      <Text style={styles.label}>Şifre</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry={true}
        placeholder="Şifre"
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Giriş Yap</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Kaydol</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginBottom:250
  },
  label: {
    alignSelf: 'flex-start',
    marginLeft: 30,
    marginBottom: 5,
    color: 'black',
    fontSize: 17,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
