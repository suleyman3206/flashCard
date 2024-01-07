import { TouchableOpacity, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { COLORS } from './theme.js';


const CustomButton = ({ navigate = '', icon = ''}) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity
            style={styles.containerDefault}
            onPress={() => navigation.navigate(navigate)}
        >
            {__filename = icon}
        </TouchableOpacity >
    )
}

const styles = StyleSheet.create({
    containerDefault: {
        padding: 20,
        borderRadius: 80,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.TERTIARY,
    },
});

export default CustomButton