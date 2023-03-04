import React from 'react'
import { View, Text, Pressable, TouchableOpacity, SafeAreaView, Image, ImageBackground } from 'react-native'
import { Colors, shopImages } from './Constants'
import GlobalStyles from './GlobalStyles';
import { useState, useEffect } from 'react';
import { IMAGES } from './Constants';
import { collection, getDocs, doc, getDoc, updateDoc, FieldValue,increment, setDoc} from 'firebase/firestore'
import { auth, db} from '../firebase'
import { async } from '@firebase/util';
import eachMinuteOfIntervalWithOptions from 'date-fns/esm/fp/eachMinuteOfIntervalWithOptions/index.js';

export default function Shop(props) {
  
  const userRef = collection(db, "users");
  const [users, setUsers] = useState([]);
  const user = doc(db, "users", auth.currentUser.uid);
  const [escoinListener, setEscoinListener] = useState(false);
  

  const [escoin, setEscoin] = useState(0);
  useEffect(() => {
  
    const getUsers = async () =>{
    const data = await getDocs(userRef);
    setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
   const userSnap = await getDoc(user)

    setEscoin(userSnap.data().Escoins)


    };
  getUsers();
  }, [escoinListener]);

 const update= async () =>{
  const user = doc(db, "users", auth.currentUser.uid);

  await updateDoc(user, {
    Escoins: increment(5)
  })
  setEscoinListener(!escoinListener)
}

const update2= async () =>{
  const user = doc(db, "users", auth.currentUser.uid);

  await updateDoc(user, {
    Escoins: increment(10)
  })
  setEscoinListener(!escoinListener)
}

const update3= async () =>{
  const user = doc(db, "users", auth.currentUser.uid);

  await updateDoc(user, {
    Escoins: increment(15)
  })
  setEscoinListener(!escoinListener)
}


  return (
    <SafeAreaView style={{ height: "100%", width: "100%" ,backgroundColor: Colors.trueBlack}}>

      <ImageBackground source={shopImages.screenBackground} style={{width:"100%", height:"100%", borderWidth: 0, borderColor: Colors.white}}>

        <View style={{width:'100%', height:"100%", alignItems: 'center'}}>

                <ImageBackground source={shopImages.header} style={{width:"100%", aspectRatio: 3, borderWidth:0, borderColor: Colors.white, alignItems: 'center'}}>
                
                  <Text style={{color: Colors.white, fontSize: 25, fontWeight: 'bold', letterSpacing: 4, marginTop: "1.5%"}}>
                   SHOP
                  </Text>
            
                  <View style={{width:"15%", aspectRatio:1,borderRadius:50, borderWidth:3, borderColor: Colors.purple, marginTop:"3.5%", marginRight:"0.5%"}}>
                    <TouchableOpacity onPress={()=>{props.navigation.navigate('Users')}} style={{width:'100%', height:'100%'}}>
                        <Image source={IMAGES.escoin_image} style={{width:'100%', height:'100%'}}/>
                    </TouchableOpacity>
                  </View>


                  <View style={{height:"30%", aspectRatio:2, position: 'absolute', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', 
                                marginRight:"80%", marginTop:"25%",  borderWidth: 0, borderColor:Colors.white,}}>
                      
                      <Text style={{color: Colors.white, fontSize: 20, fontWeight: 'bold'}}>{escoin} </Text>

                      <Image source={IMAGES.escoin_image} style={{height:"100%", aspectRatio:1, borderColor: Colors.white, borderWidth:0,}} />

                  </View>

                </ImageBackground>

              
                      
                <TouchableOpacity 
                  style={{width:"70%", height:"14%", marginTop: 40, borderColor: Colors.lightgrey, borderWidth:0,
                  alignItems: 'center', justifyContent: 'center', marginTop:"40%"}}
                  onPress={update}>
                        <ImageBackground source={shopImages.button} 
                          style={{width:"100%", height:"100%", borderWidth:0, borderColor: Colors.white, paddingTop:"6%", paddingLeft:"45%"}} 
                          resizeMode="stretch">
                           <Text style={{color: Colors.white, fontSize: 34, fontWeight: 'bold'}}>Buy 5</Text>
                        </ImageBackground>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={{width:"70%", height:"14%", marginTop: 20, borderColor: Colors.lightgrey, borderWidth:0,
                  alignItems: 'center', justifyContent: 'center',}}
                  onPress={update2}>
                        <ImageBackground source={shopImages.button} 
                          style={{width:"100%", height:"100%", borderWidth:0, borderColor: Colors.white, paddingTop:"6%", paddingLeft:"45%"}} 
                          resizeMode="stretch">
                           <Text style={{color: Colors.white, fontSize: 34, fontWeight: 'bold'}}>Buy 10</Text>
                        </ImageBackground>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={{width:"70%", height:"14%", marginTop: 20, borderColor: Colors.lightgrey, borderWidth:0,
                  alignItems: 'center', justifyContent: 'center'}}
                  onPress={update3}>
                        <ImageBackground source={shopImages.button} 
                          style={{width:"100%", height:"100%", borderWidth:0, borderColor: Colors.white, paddingTop:"6%", paddingLeft:"45%"}} 
                          resizeMode="stretch">
                           <Text style={{color: Colors.white, fontSize: 34, fontWeight: 'bold'}}>Buy 15</Text>
                        </ImageBackground>
                </TouchableOpacity>


        </View>

      </ImageBackground>

   </SafeAreaView>
  )
}
