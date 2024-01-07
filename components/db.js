// db.js

import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('wordDatabase.db');

const setupDatabase = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS correctWords (id INTEGER PRIMARY KEY AUTOINCREMENT, face TEXT, back TEXT);'
    );
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS wrongWords (id INTEGER PRIMARY KEY AUTOINCREMENT, face TEXT, back TEXT);'
    );
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS favoriteWords (id INTEGER PRIMARY KEY AUTOINCREMENT, face TEXT, back TEXT);'
    );
  });
};

const insertCorrectWord = (face, back) => {
  db.transaction(tx => {
    tx.executeSql('INSERT INTO correctWords (face, back) VALUES (?, ?)', [face, back]);
  });
};

const insertWrongWord = (face, back) => {
  db.transaction(tx => {
    tx.executeSql('INSERT INTO wrongWords (face, back) VALUES (?, ?)', [face, back]);
  });
};

const insertFavoriteWord = (face, back) => {
  db.transaction(tx => {
    tx.executeSql('INSERT INTO favoriteWords (face, back) VALUES (?, ?)', [face, back]);
  });
};
const getCorrectWords = () => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql('SELECT * FROM correctWords', [], (_, { rows }) => {
          const correctWords = rows._array; // rows._array, sorgu sonucu dönen doğru kelimeler dizisini içerir
          resolve(correctWords);
        }, (tx, error) => {
          console.error('Doğru kelimeler alınırken bir hata oluştu:', error);
          reject(error);
        });
      });
    });
  };
  
  const getWrongWords = () => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql('SELECT * FROM wrongWords', [], (_, { rows }) => {
          const wrongWords = rows._array; 
          resolve(wrongWords);
        }, (tx, error) => {
          console.error('Yanlış kelimeler alınırken bir hata oluştu:', error);
          reject(error);
        });
      });
    });
  };
  
 
const getFavoriteWords = () => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql('SELECT * FROM favoriteWords', [], (_, { rows }) => {
          const favoriteWords = rows._array; // rows._array, sorgu sonucu dönen favori kelimeler dizisini içerir
          resolve(favoriteWords);
        }, (tx, error) => {
          console.error('Favori kelimeler alınırken bir hata oluştu:', error);
          reject(error);
        });
      });
    });
  };

export {
  setupDatabase,
  insertCorrectWord,
  insertWrongWord,
  insertFavoriteWord,
  getFavoriteWords,
  getCorrectWords,
  getWrongWords,
};
