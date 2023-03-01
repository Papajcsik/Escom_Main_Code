import React, { useState, useEffect } from 'react'
import { View, Text, Pressable, TouchableOpacity, SafeAreaView, Image } from 'react-native'
import { Colors, IMAGES } from './Constants'
import GlobalStyles from './GlobalStyles'
import { Modal } from 'react-native'
import { auth, db} from '../firebase'
import { useNavigation } from '@react-navigation/native'
import { collection, getDocs} from 'firebase/firestore'




export default function Users(props) {
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

  const [profileModal, setProfileModal] = useState(false);
  const escoin = 0;

  return (
    <SafeAreaView style={GlobalStyles.container}>

      <View style={{width:'100%', height:'100%', alignItems: 'center', justifyContent: 'center'}}>


      <Text style={{color: Colors.white, fontSize: 25, fontWeight: 'bold', top: 20, letterSpacing: 4,}}>User</Text>
            <br></br>

            
            <View style={{width:"20%", aspectRatio:1,borderRadius:50, borderWidth:3, borderColor: Colors.purple}}>
              <TouchableOpacity onPress={()=>{setProfileModal(true)}} style={{width:'100%', height:'100%'}}>
                  <Image source={IMAGES.escoin_image} style={{width:'100%', height:'100%'}}/>
              </TouchableOpacity>
            </View>

            <br></br>

      {users.filter((val)=>{if(val.id == auth.currentUser.uid){return val}}).map((user) => 
     {return <View key={user.id}> 
       <Text style={{color: Colors.white, fontSize: 20}}>GameID:  {user.GameID}
       </Text>
       <Text style={{color: Colors.white, fontSize: 20}}>First Name:    {user.First_name}</Text>
       <Text style={{color: Colors.white, fontSize: 20}}>Last Name:    {user.Last_name}</Text>
       <Text style={{color: Colors.white, fontSize: 20}}>Escoins:    {user.Escoins}</Text>
       </View> } )}



            
           

            <TouchableOpacity style={{width:"60%", height:"10%", marginTop: 40,borderRadius: 10, borderColor: Colors.lightgrey, borderWidth:2, alignItems: 'center', justifyContent: 'center'}} onPress={() => props.navigation.navigate("Home") }>
              <Text style={{color: Colors.white, fontSize: 20}}>Go Back</Text>
            </TouchableOpacity>

            
            <TouchableOpacity style={{width:"60%", height:"10%", marginTop: 40,borderRadius: 10, borderColor: Colors.lightgrey, borderWidth:2, alignItems: 'center', justifyContent: 'center'}} onPress={handleSignOut}>
              <Text style={{color: Colors.white, fontSize: 20}}>Sign Out</Text>
            </TouchableOpacity>
            


            <Modal transparent={true} visible={profileModal} animationType='fade'>
              <View style={GlobalStyles.modal}>
                <View
                   style={{ elevation: 10, zIndex: 10, backgroundColor: Colors.black, flex: 1, width: "100%", height: "60%", maxHeight: "40%", maxWidth: 250,
                    justifyContent: 'center',alignItems: 'center', borderRadius: 10, borderColor: Colors.darkgrey, borderWidth: 1}}>
                          <TouchableOpacity onPress={()=>{setProfileModal(false)}} style={{width:"12%", aspectRatio:1, borderColor: Colors.white, borderWidth: 1, borderRadius:6, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{color: Colors.white, fontSize: 20}}>X</Text>
                          </TouchableOpacity>

                            <Text style={{color: Colors.white, fontSize: 20}}>Select new Image</Text>
                            
                            <br></br>

                          <View style={{borderWidth:1,borderColor: Colors.white, borderRadius:15, width:"80%", height:"50%", }}>
                           <TouchableOpacity style={{ width:"100%", height:"100%",alignItems:'center', justifyContent: 'center'}}>
                              <Text style={{color: Colors.white, fontSize: 50}}>+</Text>
                           </TouchableOpacity>
                          </View>
                          
                </View>
              </View>
            </Modal>

      </View>

    </SafeAreaView>

  )
}
