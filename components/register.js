    import React, { useState } from 'react';
    import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
    import * as SQLite from 'expo-sqlite';

    const db = SQLite.openDatabase('mobilodev1.db'); // Veritabanı adı 'dbName.db'

   
    
    const SignUpScreen = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    
    const handleSignUp = () => {
        if (username === '') {
            Alert.alert('Kullanıcı adı boş bırakılamaz.');
        } else if (email === '') {
            Alert.alert('Email boş bırakılamaz.');
        } else if (password === '') {
            Alert.alert('Şifre boş bırakılamaz.');
        } else {
            db.transaction((tx) => {
                tx.executeSql(
                    'CREATE TABLE IF NOT EXISTS users (userid INTEGER PRIMARY KEY AUTOINCREMENT, userName TEXT NOT NULL UNIQUE, email TEXT NOT NULL UNIQUE, password TEXT NOT NULL);',
                    [],
                    (tx, result) => {
                      console.log('Tablo oluşturuldu.');
                    },
                    (tx, error) => {
                      console.log('Tablo oluşturulurken hata oluştu:', error);
                    }
                  );
                tx.executeSql(
                    'SELECT * FROM users WHERE email = ? OR userName = ?;',
                    [email, username],
                    (tx, result) => {
                        if (result.rows.length > 0) {
                            const existingUser = result.rows.item(0);
                            if (existingUser.email === email) {
                                Alert.alert('Bu e-posta adresi zaten kullanılıyor.');
                            } else if (existingUser.userName === username) {
                                Alert.alert('Bu kullanıcı adı zaten kullanılıyor.');
                            }
                        } else {
                            tx.executeSql(
                                'INSERT INTO users (userName, email, password) VALUES (?, ?, ?);',
                                [username, email, password],
                                (tx, result) => {
                                    Alert.alert('Kayıt olma başarılı');
                                },
                                (tx, error) => {
                                    console.log('Kullanıcı eklenirken hata oluştu:', error);
                                }
                            );
                        }
                    },
                    (tx, error) => {
                        console.log('Kullanıcı kontrolü yapılırken hata oluştu:', error);
                    }
                );
            });
        }
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
        <Text style={styles.label}>Email</Text>
        <TextInput
            style={styles.input}
            onChangeText={(text) => setEmail(text)}
            value={email}
            placeholder="Email"
            keyboardType="email-address"
        />
        <Text style={styles.label}>Şifre</Text>
        <TextInput
            style={styles.input}
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={true}
            placeholder="Şifre"
        />
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
            <Text style={styles.buttonText}>Kaydol</Text>
        </TouchableOpacity>
        </View>
    );
    };

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        marginBottom:200
    },
    label: {
        alignSelf: 'flex-start',
        marginLeft: 30,
        marginBottom: 5,
        color: 'black',
    },
    input: {
        width: '80%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    });

    export default SignUpScreen;
