import React, { useState, useEffect, useRef } from 'react'
import { Image, StyleSheet, TouchableOpacity, View, Animated, DrawerLayoutAndroid, Pressable, Modal, Text } from 'react-native'
import { Colors, navigationImages } from './Constants'
import { Dimensions } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Armory from './Armory';
import GlobalStyles from './GlobalStyles';

import { Transition } from 'react-native-reanimated';
import { Transitioning } from 'react-native-reanimated';


import { collection, getDocs, updateDoc, increment, doc} from 'firebase/firestore'
import { auth, db} from '../firebase'
import { getDatabase, query, orderByChild } from "firebase/database";
import { ref as sRef } from 'firebase/storage';

import { Audio } from 'expo-av';
import { useFirstInstallTime } from 'react-native-device-info';

 export const transition = (
    <Transition.Together>
      <Transition.In type='fade' durationMs={2000}/>
      <Transition.Change />
      <Transition.Out type='fade' durationMs={2000}/>
    </Transition.Together>
  );
  

export default function BottomSheet(props) {

    var height = Dimensions.get('window').height;

    const [escoinModalState, setEscoinModalState] = useState(false);
    const [escoinListener, setEscoinListener] = useState(false);


   /////////////////////////////////////////escoin data

    const userRef = collection(db, "users");
    //const useR = collection(db, "users", userID); 
    const [users, setUsers] = useState([]);


    useEffect(() => {
        
      const getUsers = async () =>{
      const data = await getDocs(userRef);
      setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
      };
    
    getUsers();


    }, [escoinListener]);

    const update= async () =>{
      const user = doc(db, "users", auth.currentUser.uid);
    
      await updateDoc(user, {
        Escoins: increment(-1)
      })
      setEscoinListener(!escoinListener)
    }

    const played= async () =>{
      const user = doc(db, "users", auth.currentUser.uid);
    
      await updateDoc(user, {
        Played: increment(1)
      })
   
    }
///////////////////////////////////////////////////////////up and down moving

    const [position, setPosition] = useState(false);
    const reference = useRef();



    
///////////////////////////////////////////////////////////////click sound

const [sound, setSound] = useState();

  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync( Musics.click );
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync();
  }


  useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <Transitioning.View 
     ref={reference}
     transition={transition}
     
     style={{width:"90%", height: height/3.5, position: 'absolute',borderWidth:0, 
    borderColor: Colors.white, backgroundColor: Colors.opacityBlue, alignItems: 'center',
     alignSelf: 'center', justifyContent: 'flex-end', flexGrow: 1 }}
     >

        <Pressable 
            style={{height:"17%", width:"100%", borderWidth:0, borderColor: Colors.white, }} 
            onPress={() => { 
              
              reference.current.animateNextTransition();
              setPosition(!position);
              }}>
            <Image source={navigationImages.choose_department} style={{height:"100%", width:"100%", resizeMode:'stretch' }} />
        </Pressable>



      { position &&
         <View style={{width:"100%", height:"83%", backgroundColor: Colors.opacityBlue,  justifyContent: 'space-evenly'}}>
         
            <View style={{height: "50%", width:"100%",paddingTop:"1%", paddingBottom:"0.5%", borderWidth:0, borderColor: Colors.white, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <TouchableOpacity 
                    style={{width: "49%", height:"95%", backgroundColor: Colors.opacityBlue}} 
                    onPress={() =>{if(props.escoin > 0)  { props.props.navigation.navigate('Armory'); update(), played() } if(props.escoin <= 0){setEscoinModalState(true)} }}>
                    <Image source={navigationImages.armory_button} style={{width:"100%", height:"100%", resizeMode: 'stretch'}}/>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={{width: "49%", height:"95%", backgroundColor: Colors.opacityBlue}} 
                    onPress={() => {if(props.escoin > 0) { props.props.navigation.navigate('Energy'); update(), played()} if(props.escoin <= 0){setEscoinModalState(true)}}}>
                    <Image source={navigationImages.energy_button} style={{width:"100%", height:"100%", resizeMode: 'stretch'}}/>
                </TouchableOpacity>
                
            </View>

            <View style={{height: "50%", width:"100%", paddingTop:"0%", paddingBottom:"1%", borderWidth:0, borderColor: Colors.white, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <TouchableOpacity 
                    style={{width: "49%", height:"95%", backgroundColor: Colors.opacityBlue}} 
                    onPress={() => {if(props.escoin > 0) { props.props.navigation.navigate('Weaponry'); update(), played()} if(props.escoin <= 0){setEscoinModalState(true)}}}>
                    <Image source={navigationImages.weaponry_button} style={{width:"100%", height:"100%", resizeMode: 'stretch'}}/>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={{width: "49%", height:"95%", backgroundColor: Colors.opacityBlue}}
                    onPress={() => {if(props.escoin > 0) { props.props.navigation.navigate('Cyber'); update(), played()} if(props.escoin <= 0){setEscoinModalState(true)}}}>
                    <Image source={navigationImages.cybercore_button} style={{width:"100%", height:"100%", resizeMode: 'stretch'}}/>
                </TouchableOpacity>
                
            </View>

        </View>
      }

    <Modal transparent={true} visible={escoinModalState} animationType={'fade'} >
        <View style={[GlobalStyles.modal]} >
         <View 
             style={{ elevation: 10, zIndex: 10, backgroundColor: Colors.black, flex: 1, width: "100%", height: "60%", maxHeight: "40%", maxWidth: 250, 
             justifyContent: 'center', borderRadius: 10, borderColor: Colors.darkgrey, borderWidth: 1}}>

            <Text style={{ fontWeight: 'bold', letterSpacing: 6, fontSize: 20, color: Colors.white, alignSelf: 'center', textAlign: 'center' }}>You're out of <br></br>ESCoin's</Text>
            <Text style={[GlobalStyles.modalText, {marginTop:10}]}>Buy more to <br></br>play again</Text>
             
              <TouchableOpacity style={[GlobalStyles.modalButton, {marginTop:12}]} onPress={()=>{setEscoinModalState(false)}}>
                <Text style={GlobalStyles.modalText}>Sorry, I'm poor</Text>  
              </TouchableOpacity>
              <TouchableOpacity style={[GlobalStyles.modalButton, {marginTop:10}]} onPress={() => {setEscoinModalState(false); props.props.navigation.navigate('Shop')}}>
                <Text style={GlobalStyles.modalText}>Buy 1 & Play</Text>  
              </TouchableOpacity>
          </View>
        </View>
    </Modal>


    </Transitioning.View>
  )
  
}

