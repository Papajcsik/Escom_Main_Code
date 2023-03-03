import React, { useState, useEffect } from 'react'
import { View, Text, Pressable, TouchableOpacity, SafeAreaView, Image, ImageBackground } from 'react-native'
import { Colors, IMAGES, profileImages } from './Constants'
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
      <ImageBackground source={profileImages.screenBackground} style={{width:"100%", height:"100%"}}>
        <ImageBackground source={profileImages.keret} style={{width:"100%", height:"100%"}}>

            <View style={{height:"19%", width:"100%",borderRadius:0, borderWidth:0, borderColor: Colors.purple, flexDirection: 'row'}}>
              <TouchableOpacity onPress={()=>{setProfileModal(true)}} style={{width:'37%', height:'100%'}}>
                  <Image source={profileImages.blankProfilePicture} style={{width:'100%', height:'100%'}}/>
              </TouchableOpacity>

                      <View style={{height:"60%", width:"63%", borderWidth:0, borderColor: Colors.purple, alignItems: 'center', justifyContent: 'center', bottom: "6%"}}>

                        <Text style={{color: Colors.white, fontSize: 15, top: 2, letterSpacing: 2, }}>Contractor Name</Text>
                        
                          { users.filter((val)=>{if(val.id == auth.currentUser.uid){return val}}).map((user) => 
                          {return <View key={user.id}> 
                            
                            <Text style={{color: Colors.white, fontSize: 20, fontWeight: 'bold', top: 12, letterSpacing: 4, }}>{user.GameID}</Text>
                            </View> } )}
                      
                      </View>

            </View>

      <View style={{width:'100%', height:'81%', paddingLeft:"8%", paddingTop:"20%", borderWidth: 1, borderColor:Colors.white}}> 
 

      {users.filter((val)=>{if(val.id == auth.currentUser.uid){return val}}).map((user) => 
     {return <View key={user.id}> 
      
       <Text style={{color: Colors.white, fontSize: 20}}>Name:  {user.First_name} {user.Last_name}</Text>
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
            </ImageBackground>
      </ImageBackground>

    </SafeAreaView>

  )
}
