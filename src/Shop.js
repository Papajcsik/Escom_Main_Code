import React from 'react'
import { View, Text, Pressable, TouchableOpacity, SafeAreaView, Image } from 'react-native'
import { Colors } from './Constants'
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
    Escoins: increment(1)
  })
  setEscoinListener(!escoinListener)
}

const update2= async () =>{
  const user = doc(db, "users", auth.currentUser.uid);

  await updateDoc(user, {
    Escoins: increment(5)
  })
  setEscoinListener(!escoinListener)
}

const update3= async () =>{
  const user = doc(db, "users", auth.currentUser.uid);

  await updateDoc(user, {
    Escoins: increment(10)
  })
  setEscoinListener(!escoinListener)
}


  return (
    <SafeAreaView style={{ height: "100%", width: "100%" ,backgroundColor: Colors.trueBlack}}>


        <View style={{width:'100%', height:"100%", justifyContent: 'center', alignItems: 'center'}}>

        <Text style={{color: Colors.white, fontSize: 25, fontWeight: 'bold', letterSpacing: 4, marginBottom:"10%"}}>Shop</Text>
              
            <View style={{width:"20%", aspectRatio:1,borderRadius:50, borderWidth:3, borderColor: Colors.purple}}>
              <TouchableOpacity onPress={()=>{props.navigation.navigate('Users')}} style={{width:'100%', height:'100%'}}>
                  <Image source={IMAGES.escoin_image} style={{width:'100%', height:'100%'}}/>
              </TouchableOpacity>
            </View>

            <br></br>

            <Text style={{color: Colors.white, fontSize: 20}}>{escoin}</Text>
            <View>
                      <Image source={IMAGES.escoin_image} style={{height:"55%", aspectRatio:1, borderColor: Colors.white, borderWidth:0,}} />
            </View>
            
        


                 <TouchableOpacity 
                  style={{width:"60%", height:"12%", marginTop: 40,borderRadius: 10, borderColor: Colors.lightgrey, borderWidth:2,
                  alignItems: 'center', justifyContent: 'center'}}
                  onPress={update}>
                   <Text style={{color: Colors.white, fontSize: 20}}>Buy 1</Text>
                </TouchableOpacity>

                 <TouchableOpacity 
                  style={{width:"60%", height:"12%", marginTop: 40,borderRadius: 10, borderColor: Colors.lightgrey, borderWidth:2,
                  alignItems: 'center', justifyContent: 'center'}}
                  onPress={update2}>
                   <Text style={{color: Colors.white, fontSize: 20}}>Buy 5</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={{width:"60%", height:"12%", marginTop: 40,borderRadius: 10, borderColor: Colors.lightgrey, borderWidth:2,
                  alignItems: 'center', justifyContent: 'center'}}
                  onPress={update3}>
                   <Text style={{color: Colors.white, fontSize: 20}}>Buy 10</Text>
                </TouchableOpacity>
            
        </View>


   </SafeAreaView>
  )
}
