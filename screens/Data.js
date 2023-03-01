import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { auth, db } from '../firebase'
import {doc, getDoc, collection, getDocs, Timestamp} from 'firebase/firestore'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { async } from '@firebase/util'
import dayjs from "dayjs";


 const Data = () => {
  const userRef = collection(db, "users");
  const [users, setUsers] = useState([]);
  useEffect(() => {

    const getUsers = async () =>{
    const data = await getDocs(userRef);
    setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
    };
  
  getUsers();
  }, []);

  const navigation= useNavigation()
  const handleSignOut = () => {
    auth.signOut().then(() => {
      navigation.replace("Login")
    })
    .catch(error=> alert(error.message))
  }
  return (
       
    <View style={styles.container}>
         {users.filter((val)=>{if(val.id == auth.currentUser.uid){return val}}).map((user) => 
     {return <View key={user.id}> 
       <Text> GameID:
       &nbsp; 
       {user.GameID}
       </Text>
       <Text>    First Name:    {user.First_name}</Text>
       <Text>    Last Name:    {user.Last_name}</Text>
       </View> } )}
           <Text>Email: {auth.currentUser?.email}</Text>
      <TouchableOpacity onPress={handleSignOut}
      style={styles.button}
      >
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>
    </View>
      
  )
  
}

export default Data

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#0782F9',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40,
  
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
 
})