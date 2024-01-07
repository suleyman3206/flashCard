
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getWrongWords } from './db'; 

const WrongWordsScreen = () => {
  const [wrongWords, setWrongWords] = useState([]);

  useEffect(() => {
    fetchWrongWords();
  }, []);

  const fetchWrongWords = async () => {
    try {
      const fetchedWrongWords = await getWrongWords(); 
      setWrongWords(fetchedWrongWords); 
    } catch (error) {
      console.error('Yanlış kelimeler getirilirken bir hata oluştu: ', error);
    }
  };

  const renderWordItem = ({ item }) => (
    <View style={styles.wordItem}>
      <Text>{item.face} - {item.back}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Yanlış Kelimeler</Text>
      <FlatList
        data={wrongWords}
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

export default WrongWordsScreen;