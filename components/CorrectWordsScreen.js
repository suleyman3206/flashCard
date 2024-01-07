// CorrectWordsScreen.js

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getCorrectWords } from './db'; 

const CorrectWordsScreen = () => {
  const [correctWords, setCorrectWords] = useState([]);

  useEffect(() => {
    fetchCorrectWords();
  }, []);

  const fetchCorrectWords = async () => {
    try {
      const fetchedCorrectWords = await getCorrectWords(); 
      setCorrectWords(fetchedCorrectWords); 
    } catch (error) {
      console.error('Doğru kelimeler getirilirken bir hata oluştu: ', error);
    }
  };

  const renderWordItem = ({ item }) => (
    <View style={styles.wordItem}>
      <Text>{item.face} - {item.back}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Doğru Kelimeler</Text>
      <FlatList
        data={correctWords}
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

export default CorrectWordsScreen;
