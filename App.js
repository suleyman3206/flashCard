import React, { useState , createContext, useContext,useEffect } from 'react';
import { Text, View ,StyleSheet ,Alert, TouchableOpacity} from 'react-native';
import Profile from "./components/Profile";
import Menu from "./components/Menu";
import CustomButton from "./components/CustomButton";
import GoBackButton from "./components/GoBackButton";
import login from "./components/login";
import register from "./components/register";
import WrongWordsScreen from "./components/WrongWordsScreen";
import CorrectWordsScreen from "./components/CorrectWordsScreen";
import FavoriteWordsScreen from "./components/FavoriteWordsScreen";
import favorilerden from "./components/favorilerden"
import dogrulardan from "./components/dogrulardan"
import yanlislardan from "./components/yanlislardan"


import { setupDatabase } from './components/db';


import  {COLORS} from "./components/theme";
import { Entypo , Feather } from '@expo/vector-icons';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, createnativeStackNavigator } from '@react-navigation/native-stack';
import Main from './components/Main';


const stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    setupDatabase();
  }, []);

return(
<NavigationContainer>
  <stack.Navigator>
     <stack.Screen
          name="login"
          component={login}
          options={{
            headerStyle: {backgroundColor: COLORS.TERTIARY}, 
            headerShown: true,
            headerShadowVisible: false,
            headerBackVisible: false,
            headerTitleAlign: 'center',
           
          }}
        />
       
  <stack.Screen
          name="register"
          component={register}
          options={{
            headerStyle: {backgroundColor: COLORS.TERTIARY}, 
            headerShown: true,
            headerShadowVisible: false,
            headerBackVisible: false,
            headerTitleAlign: 'center',
            headerLeft: () => (
              <GoBackButton/>
            )
          }}
        />
 
        <stack.Screen
          name="Home"
          component={Main}
          options={{
            headerStyle:{backgroundColor:COLORS.TERTIARY},
            title:'AnaSayfa',
            headerShown:true,
            headerShadowVisible:false,
            headerBackVisible:false,
            headerTitleAlign:'center',
            headerLeft: () =>(
                <CustomButton navigate ='Menu' icon={<Entypo name="menu" size={24} color="black" />} />
            ),
            headerRight : () =>(
                <CustomButton navigate ='Profile' icon={<Feather name="user" size={24} color="black" />} />
            )
          }}
        />
        <stack.Screen
          name="Profile"
          component={Profile}
          options={{
            headerStyle: {backgroundColor: COLORS.TERTIARY}, 
            headerShown: true,
            headerShadowVisible: false,
            headerBackVisible: false,
            headerTitleAlign: 'center',
            headerLeft: () => (
              <GoBackButton/>
            )
          }}
        />
        <stack.Screen
          name="Menu"
          component={Menu}
          options={{
            title: 'Menü',
            headerStyle: {backgroundColor: COLORS.TERTIARY}, 
            headerShown: true,
            headerShadowVisible: false,
            headerBackVisible: false,
            headerTitleAlign: 'center',
            headerLeft: () => (
              <GoBackButton/>
            )
          }}
        />
        <stack.Screen
          name="WrongWordsScreen"
          component={WrongWordsScreen}
          options={{
            title: 'YANLIŞ KELİMELER',
            headerStyle: {backgroundColor: COLORS.TERTIARY}, 
            headerShown: true,
            headerShadowVisible: false,
            headerBackVisible: false,
            headerTitleAlign: 'center',
            headerLeft: () => (
              <GoBackButton/>
            )
          }}
        />
         <stack.Screen
          name="CorrectWordsScreen"
          component={CorrectWordsScreen}
          options={{
            title: 'DOĞRU KELİMELER',
            headerStyle: {backgroundColor: COLORS.TERTIARY}, 
            headerShown: true,
            headerShadowVisible: false,
            headerBackVisible: false,
            headerTitleAlign: 'center',
            headerLeft: () => (
              <GoBackButton/>
            )
          }}
        />
         <stack.Screen
          name="FavoriteWordsScreen"
          component={FavoriteWordsScreen}
          options={{
            title: 'FAVORİ KELİMELERİNİZ',
            headerStyle: {backgroundColor: COLORS.TERTIARY}, 
            headerShown: true,
            headerShadowVisible: false,
            headerBackVisible: false,
            headerTitleAlign: 'center',
            headerLeft: () => (
              <GoBackButton/>
            )
          }}
        />
        <stack.Screen
          name="favorilerden"
          component={favorilerden}
          options={{
            title: 'FAVORİLERDEN QUİZ',
            headerStyle: {backgroundColor: COLORS.TERTIARY}, 
            headerShown: true,
            headerShadowVisible: false,
            headerBackVisible: false,
            headerTitleAlign: 'center',
            headerLeft: () => (
              <GoBackButton/>
            )
          }}
        />
          <stack.Screen
          name="dogrulardan"
          component={dogrulardan}
          options={{
            title: 'DOGRU KELİMELERİNİZDEN QUİZ',
            headerStyle: {backgroundColor: COLORS.TERTIARY}, 
            headerShown: true,
            headerShadowVisible: false,
            headerBackVisible: false,
            headerTitleAlign: 'center',
            headerLeft: () => (
              <GoBackButton/>
            )
          }}
        />
          <stack.Screen
          name="yanlislardan"
          component={yanlislardan}
          options={{
            title: 'YANLİS KELİMELERİNİZDEN QUİZ',
            headerStyle: {backgroundColor: COLORS.TERTIARY}, 
            headerShown: true,
            headerShadowVisible: false,
            headerBackVisible: false,
            headerTitleAlign: 'center',
            headerLeft: () => (
              <GoBackButton/>
            )
          }}
        />
  </stack.Navigator>


</NavigationContainer>


);
}
const styles = StyleSheet.create({
  button:{
    borderRadius: 80,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.TERTIARY,
  }
})

