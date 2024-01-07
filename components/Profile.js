import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const Profile = () => {
  const navigation = useNavigation();

  const handleFavoriPress = () => {
    navigation.navigate('favorilerden');
  };

  const handleYanlisPress = () => {
    navigation.navigate('yanlislardan');
  };

  const handleDogruPress = () => {
    navigation.navigate('dogrulardan');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.quizText}>Quiz türü seçin:</Text>
      <TouchableOpacity style={[styles.button, styles.blueButton]} onPress={handleFavoriPress}>
        <Text style={styles.buttonText}>Favori Sözcükler</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.redButton]} onPress={handleYanlisPress}>
        <Text style={styles.buttonText}>Yanlış Bilinen Sözcükler</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.greyButton]} onPress={handleDogruPress}>
        <Text style={styles.buttonText}>Doğru Bilinen Sözcükler</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  quizText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    padding: 10,
    margin: 10,
    borderRadius: 5,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  blueButton: {
    backgroundColor: 'blue',
  },
  redButton: {
    backgroundColor: 'red',
  },
  greyButton:{
    backgroundColor :"green",
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
  },
});

export default Profile;
