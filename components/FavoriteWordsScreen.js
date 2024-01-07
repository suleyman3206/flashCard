// Favori kelimeleri göstermek için yeni bir component dosyası oluşturalım, örneğin FavoriteWordsScreen.js

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getFavoriteWords } from './db'; // db.js dosyasından favori kelimeleri çekmek için gerekli fonksiyonu içeri aktarın

const FavoriteWordsScreen = () => {
  const [favoriteWords, setFavoriteWords] = useState([]);

  useEffect(() => {
    fetchFavoriteWords();
  }, []);

  const fetchFavoriteWords = async () => {
    try {
      const fetchedFavoriteWords = await getFavoriteWords(); // Favori kelimeleri getir
      setFavoriteWords(fetchedFavoriteWords); // State'i güncelle
    } catch (error) {
      console.error('Favori kelimeler getirilirken bir hata oluştu: ', error);
    }
  };

  // Favori kelimeleri listeleyen bir renderItem fonksiyonu
  const renderWordItem = ({ item }) => (
    <View style={styles.wordItem}>
      <Text>{item.face} - {item.back}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favori Kelimeler</Text>
      <FlatList
        data={favoriteWords}
        renderItem={renderWordItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  wordItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default FavoriteWordsScreen;
