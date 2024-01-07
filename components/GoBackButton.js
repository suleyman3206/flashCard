import { TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

import {COLORS} from './theme.js';
import { MaterialIcons } from '@expo/vector-icons';

const GoBackButton = () => {
    const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => {navigation.goBack()}} style={styles.container} >
        <MaterialIcons style={styles.image} name="arrow-back" size={24} color="black" />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container: {
        width: 40,
        height: 40,
        backgroundColor: COLORS.TERTIARY,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
});

export default GoBackButton