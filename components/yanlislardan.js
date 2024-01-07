import { View, Text, StyleSheet, TouchableOpacity, Alert, } from 'react-native'
import React, { useState, createContext, useContext,useEffect } from 'react'
import { AntDesign, Feather, FontAwesome5 } from '@expo/vector-icons'
import wordsData from './words.json';
import FlipCard from 'react-native-flip-card';
import Toast from 'react-native-toast-message';
import * as Speech from 'expo-speech';
import { setupDatabase, insertCorrectWord, insertWrongWord, insertFavoriteWord,getFavoriteWords, getWrongWords } from './db';
import { useNavigation } from '@react-navigation/native';
import WrongWordsScreen from './WrongWordsScreen';
import CorrectWordsScreen from './CorrectWordsScreen';
import FavoriteWordsScreen from './FavoriteWordsScreen';




function Main() {

    const navigation = useNavigation();
    const speakText = async (text) => {
        try {
            await Speech.speak(text, { language: 'en' }); 
        } catch (error) {
            console.error('Seslendirme hatası:', error);
        }
    };
    
    const [currentIndex, setCurrentIndex] = useState(0);
    const [flipCardData, setFlipCardData] = useState([]);
  
    useEffect(() => {
      // Favori kelimeleri çekme işlemi
      getWrongWords()
        .then((favoriteWords) => {
          // Favori kelimeleri flipcardData state'ine ata
          setFlipCardData(favoriteWords);
        })
        .catch((error) => {
          console.error('Favori kelimeler alınırken bir hata oluştu:', error);
        });
    }, []); 


        
        
   // const [currentIndex, setCurrentIndex] = useState(0);
    const [wrongWords, setWrongWords] = useState([]);
    const [favoriteWords, setFavoriteWords] = useState([]);
    const [correctWords, setCorrectWords] = useState([]);

    const handleNextWord = () => {
        const randomNumber = Math.floor(Math.random() * 100) + 1;////rastgele sayı gelmesi
        setCurrentIndex(currentIndex + 1);
       
    };

    const onPressHandlerDogru = (message) => {
        setCorrectWords((prevWords) => [
            ...prevWords,
            { face: flipCardData[currentIndex].face, back: flipCardData[currentIndex].back },
        ]);
        Toast.show({
            type: 'success',
            text1: 'Bildirim',
            text2: message,
        });
        insertCorrectWord(
            flipCardData[currentIndex].face,
            flipCardData[currentIndex].back
          );
          setCurrentIndex(currentIndex + 1);
        handleNextWord();
    };

    const onPressHandlerYanlis = (message) => {
        setWrongWords((prevWords) => [
            ...prevWords,
            { face: flipCardData[currentIndex].face, back: flipCardData[currentIndex].back },
        ]);
        Toast.show({
            type: 'error',
            text1: 'Bildirim',
            text2: message,
        });

        insertWrongWord(
            flipCardData[currentIndex].face,
            flipCardData[currentIndex].back
          );
          setCurrentIndex(currentIndex + 1);
        handleNextWord();
    };
    const onPressHandlerFavori = (message) => {
        const currentCard = flipCardData[currentIndex];

        // Favori kelimeler listesinde o kelimenin olup olmadığını kontrol et
        const isAlreadyFavorite = favoriteWords.some(word => word.face === currentCard.face && word.back === currentCard.back);
        insertFavoriteWord(
            flipCardData[currentIndex].face,
            flipCardData[currentIndex].back,
           
          );
          setCurrentIndex(currentIndex + 1);
       
        if (!isAlreadyFavorite) {
            setFavoriteWords((prevWords) => [
                ...prevWords,
                { face: currentCard.face, back: currentCard.back },
            ]);
            Toast.show({
                type: 'info',
                text1: 'Bildirim',
                text2: message,
            });
        } else {
            
            Toast.show({
                type: 'info',
                text1: 'Bildirim',
                text2: 'Bu kelime zaten favorilerde!',
            });
        }

    };

    const onLongPressHandlerYanlis = () => {
        
        navigation.navigate("WrongWordsScreen");
    };

    const onLongPressHandlerFavori = () => {
        

      
        navigation.navigate('FavoriteWordsScreen');
    };

    const onLongPressHandlerDogru = () => {
        

        navigation.navigate('CorrectWordsScreen');
    };


    return (
        <>
            <View style={styles.background}>


                <>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity
                                style={styles.buttoni}
                                onPress={() => speakText(flipCardData[currentIndex].face) }
                                onLongPress={() => speakText(flipCardData[currentIndex].description)}

                            >
                                <AntDesign name="sound" size={28} color="black" />
                            </TouchableOpacity>
                        </View>
                        <View>

                            <View style={styles.main}>

                                <View style={styles.container}>

                                    <TouchableOpacity style={styles.button} onPress={() => onPressHandlerYanlis('Yanlışlarım listesine eklendi lütfen daha dikkatli ol')} onLongPress={onLongPressHandlerYanlis}>
                                        <Feather name='x' size={28} color='black' />
                                    </TouchableOpacity>
                                    {flipCardData.map((card, index) => (
                                        index === currentIndex && (
                                            <FlipCard key={card.id} style={styles.cardContainer}>
                                                <View style={styles.face}>
                                                    <Text style={styles.text}>{card.face}</Text>
                                                </View>
                                                <View style={styles.back}>
                                                    <Text style={styles.text}>{card.back}</Text>
                                                </View>
                                                <TouchableOpacity style={styles.button} onPress={() => onPressHandlerDogru('Bravo bir kelime daha öğrendin')} onLongPress={onLongPressHandlerDogru}>
                                                    <FontAwesome5 name='check' size={28} color='black' />

                                                </TouchableOpacity>
                                            </FlipCard>
                                        )
                                    ))}
                                    <TouchableOpacity style={styles.button} onPress={() => onPressHandlerDogru('Bravo bir kelime daha öğrendin')} onLongPress={onLongPressHandlerDogru}>
                                        <FontAwesome5 name='check' size={20} color='black' />

                                    </TouchableOpacity>

                                </View>

                            </View>
                            <TouchableOpacity style={styles.button} onPress={() => onPressHandlerFavori('Favoriler listesine eklendi.')} onLongPress={onLongPressHandlerFavori}>
                                <AntDesign name='star' size={28} color='black' />
                            </TouchableOpacity>


                        </View>
                       
                        <Toast ref={(ref) => Toast.setRef(ref)} /></>
            </View></>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        color: 'red',
        backgroundColor: 'red',
    },

    main: {
        marginTop: 50,
        height: 200,
        alignItems: 'center',
        flexDirection: 'row', // Yatay sıralama
        justifyContent: 'space-between', // Uçlarda boşluk bırakarak sıralama
        alignItems: 'center', // Dikey hizalama
    },
    container: {
        width: '100%',
        height: '100%',
        flexDirection: 'row', // Yatay sıralama
        justifyContent: 'space-between', // Uçlarda boşluk bırakarak sıralama
        alignItems: 'center', // Dikey hizalama
        alignItems: 'center',
        borderRadius: 20,
        overflow: 'hidden',
    },
    cardContainer: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    back: {
        flex: 1,
        width: 250,
        height: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        shadowColor: '#000', // Gölge rengi
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
        elevation: 5,
    },
    face: {
        flex: 1,
        width: 250,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        shadowColor: '#000', // Gölge rengi
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
        elevation: 5,
    },
    text: {
        color: 'black', //
        fontSize: 36, // Yazı boyutu   
    },
    button: {
        padding: 20,
        borderRadius: 80,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        paddingTop: 25,
        alignItems: 'center',
    },
    headerText: {
        fontSize: 18,
        color: 'white',
    },
    definition: {
        
        borderRadius: 10,
        marginBottom: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    definitionText: {
        fontSize: 16,
        color: 'white',
    },
    exampleSentences: {
        padding: 10,
        borderRadius: 8,
        marginTop: 20,
    },
    exampleSentencesText: {
        fontSize: 16,
        color: 'white',
    },
})

export default Main