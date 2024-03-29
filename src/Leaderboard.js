import React, { useState , useEffect} from 'react'
import { View, Text, Pressable, TouchableOpacity, Image, SafeAreaView, ImageBackground, StatusBar, Dimensions, ScrollView, Modal, FlatList } from 'react-native'
import BottomSheet from './BottomSheet';
import { Colors, IMAGES, LeaderboardImages, navigationImages } from './Constants'
import GlobalStyles from './GlobalStyles';
import { auth, db} from '../firebase'
import { collection, getDocs , query, orderBy, limit } from 'firebase/firestore'



export default function Leaderboard(props) {
  const userRef = collection(db, "users");
   const [users, setUsers] = useState([]);
   
   const [loggedInPlayerId,setLoggedInPlayerId] =  useState(null);              //primary key


  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if(user){
        setLoggedInPlayerId(auth.currentUser.uid)
      }
    })
    const getUsers = async () =>{
    const data = await getDocs(query(userRef, orderBy("Points","desc"),limit(10)));
    setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
    };
  getUsers();
  }, []);

 /* const [leaderBoardData, setLeaderBoardData] = useState([
    {id: 1, image: IMAGES.escoin_image, player: 'Aron', playedGames: 3, points: 2 },
    {id: 2, image: IMAGES.logo, player: 'David', playedGames: 6, points: 3 },
    {id: 3, image: IMAGES.escoin_image, player: 'Krisz', playedGames: 0, points: 0 },
    {id: 4, image: IMAGES.escoin_image, player: 'Robi1', playedGames: 3, points: 9 },
    {id: 5, image: IMAGES.logo, player: 'Robi2', playedGames: 9, points: 3 },
    {id: 6, image: IMAGES.escoin_image, player: 'Kocsog', playedGames: 3, points: 2 },
    {id: 7, image: IMAGES.escoin_image, player: 'Miskolci', playedGames: 6, points: 3 },
    {id: 8, image: IMAGES.escoin_image, player: 'Krisz', playedGames: 0, points: 0 },
    {id: 9, image: IMAGES.escoin_image, player: '/Lucky', playedGames: 3, points: 9 },
    {id: 10, image: IMAGES.escoin_image, player: 'gipsy', playedGames: 9, points: 3 },
  ]);*/

  const [currentIndex, setCurrentIndex] = useState("Armory");
 

    const [playerModal, setPlayerModal] = useState(false);

    const getBgColor = (id, department) => {                //your profile - indicator

      if(id == loggedInPlayerId && department === "Armor")
      {
        return Colors.blue;
      }
      if(id == loggedInPlayerId && department === "Weapon")
      {
        return Colors.red;
      }
      if(id == loggedInPlayerId && department === "Energy")
      {
        return Colors.energyGreen;
      }
      if(id == loggedInPlayerId && department === "Cyber")
      {
        return Colors.cyberPurple;
      }

      return Colors.opacityBlue;
    };




    const getHeader = () => {

      if(currentIndex === "Armory")
      {
        return LeaderboardImages.headerArmor;
      }
      if(currentIndex === "Weaponry")
      {
        return LeaderboardImages.headerWeapon;
      }
      if(currentIndex === "Energy")
      {
        return LeaderboardImages.headerEnergy;
      }
      if(currentIndex === "Cyber")
      {
        return LeaderboardImages.headerCyber;
      }
      return LeaderboardImages.headerArmor;
    };

    const myLocation = () => {
      
    };

    //////////////////////////////////////////////////////constants

    var height = Dimensions.get('window').height;
    var width = Dimensions.get('window').width;

    const profile = "../assets/images/avatar.png";
    const Escoin = 0;
    const estimatedRTO = "1.500";

  return (
    <SafeAreaView style={{ height: "100%", width: "100%" ,backgroundColor: Colors.trueBlack}}>
    
        <StatusBar style="hidden" />

      <View style={{width:"100%", height:"96%" , borderWidth: 0, borderColor: Colors.blue, alignItems: 'center', paddingTop: "1%"}}>

                <View style={{width:"98%", height:"20%" , zIndex: 1, borderWidth: 0, borderColor: Colors.white, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between'}}>

                  <View style={{height: "100%", width:"38%", justifyContent: 'space-evenly', borderColor: Colors.white, borderWidth: 0}}>
                    
                    <TouchableOpacity style={{width:"96%", height: "46%", borderWidth: 0, borderColor: Colors.blue}}
                                      onPress={()=>{
                                        setCurrentIndex('Armory')}}>
                      <Image style={{height:"100%", width: '100%', resizeMode: 'cover'}} source={LeaderboardImages.armorButton}/>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={{width:"96%", height: "46%", borderWidth: 0, borderColor: Colors.red}}
                          onPress={()=>{
                            setCurrentIndex('Weaponry')}}>
                      <Image style={{width:"100%", height:"100%", resizeMode: 'cover'}} source={LeaderboardImages.weaponButton}/>
                    </TouchableOpacity>

                  </View>



                  <View style={{ position: 'absolute', height: "100%", width:"42%", zIndex: -1, justifyContent: 'flex-end', alignItems: 'center', alignSelf: 'center', marginLeft: "29%", borderColor: Colors.white, borderWidth: 0}}>

                      <Text style={{color: Colors.white, fontSize: height/70, letterSpacing: 1, fontWeight: 'bold' }}>LEADERBOARD</Text>        
                    
                    <View style={{width:"100%", height: '80%', justifyContent: 'center', alignItems: 'center', top: 14, borderColor: Colors.white, borderWidth: 0  }}>
                      <ImageBackground style={{width:"100%", height:"98%", resizeMode: 'cover', alignItems: 'center', justifyContent: 'flex-end', paddingBottom:"8%",
                                                borderColor: Colors.white, borderWidth: 0 }} 
                                       source={getHeader()}>
                            <Text style={{color: Colors.white, fontSize: height/78, letterSpacing: 2, fontWeight: 'bold', zIndex: 2 , }}>Top CONTRACTORS</Text>
                      </ImageBackground>

                    </View>
                    
                  </View>



                  <View style={{height: "100%", width:"38%", justifyContent: 'space-evenly', borderColor: Colors.white, borderWidth: 0}}>
                    
                    <TouchableOpacity style={{width:"96%", height: "46%", borderWidth: 0, borderColor: Colors.primary}}
                                      onPress={()=>{
                                        setCurrentIndex('Energy')}}>
                      <Image style={{height:"100%", width: '100%', resizeMode: 'cover'}} source={LeaderboardImages.energyButton}/>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={{width:"96%", height: "46%", borderWidth: 0, borderColor: Colors.purple}}
                          onPress={()=>{
                            setCurrentIndex('Cyber')}}>
                      <Image style={{width:"100%", height:"100%", resizeMode: 'cover'}} source={LeaderboardImages.cyberButton}/>
                    </TouchableOpacity>

                  </View>
                    
               </View>
       
        <View style={{width:"92%", height:"80%" , borderWidth: 0, borderColor: Colors.white, alignItems: 'center',}}>
       
        

      { currentIndex === 'Armory' && 
        <View style={{width:"100%", height:"90%" , borderWidth: 0, borderColor: Colors.blue, alignItems: 'center', backgroundColor: Colors.darkBlue }}>
          
              <View style={{width:"100%", height:"10%" ,borderWidth: 0, borderBottomWidth: 0, borderColor: Colors.white, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: "2%"}}>
                
                <View style={{borderWidth: 0, borderColor: Colors.white, height: "100%", width: '60%', flexDirection: 'row', alignItems: 'center', paddingLeft: "4%", justifyContent: 'space-between'  }}>
                 <Text style={{ color:Colors.white, fontSize: height * 0.026}}>#</Text>
                  <View style={{flexDirection: 'row', width: "85%", height: "100%",alignItems:'center', justifyContent: 'center' , borderWidth: 0, borderColor: Colors.white }}>
                  <Text style={{ color:Colors.white, fontSize: height * 0.026}}>Player</Text>
                  </View>
                </View>

                <View style={{borderWidth: 0, borderColor: Colors.white, height: "100%", width: '40%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', paddingLeft:"4%" }}>
                  <View>
                    <Text style={{ color:Colors.white, fontSize: height * 0.013}}>Played</Text>
                    <Text style={{ color:Colors.white, fontSize: height * 0.013}}>Games</Text>
                  </View>
                  <Text style={{ color:Colors.white, fontSize: height * 0.020, paddingLeft:"4%"}}>Points</Text>
                </View>
          </View>


          <View style={{height:"90%", width:"100%", borderWidth: 0, borderColor: Colors.purple,}}>

          <ScrollView style={{width:"100%", height:"94%", borderWidth: 0, borderColor: Colors.blue, }}>
           
            {
              users.map((element, i)=>(

                  <TouchableOpacity key={i} onPress={()=>{setPlayerModal(true)}} 
                      style={{width:"100%", height:"100%", borderWidth: 0, borderColor: Colors.purple, flexDirection: 'row',alignItems: 'center', 
                      backgroundColor: getBgColor(element.id, 'Armor'),}}>
                    
                    <View style={{borderWidth: 0, borderColor: Colors.white, height: "100%", width: '60%', flexDirection: 'row', alignItems: 'center', paddingLeft: "3%", justifyContent: 'space-between'  }}>

                    
                      <View style={{width:"10%", height:"100%", borderWidth: 0, borderColor: Colors.purple, flexDirection: 'row',alignItems: 'center', justifyContent: 'center',}}>
                        <Text style={{ color:Colors.white, fontSize: height * 0.026}}>{i+1}</Text> 
                      </View>
                      
                       <View style={{width:"90%", height:"100%", borderWidth: 0, borderColor: Colors.white, flexDirection: 'row',alignItems: 'center', justifyContent: 'space-between', paddingRight:"10%",}}>

                        <View style={{height:"100%", width:"45%", paddingLeft:"2%", borderWidth: 0, borderColor: Colors.white, flexDirection: 'row', alignItems: 'center'}}>
                          <Image source={IMAGES.logo} style={{height: "80%", aspectRatio: 1}}/>
                          <Text style={{ color:Colors.white, fontSize: height * 0.026, paddingLeft:"5%"}}>{element.GameID}</Text> 
                        </View>
                       </View>
                      </View>

                        <View style={{borderWidth: 0, borderColor: Colors.white, height: "100%", width: '40%', flexDirection: 'row', alignItems: 'center', paddingLeft: "4%", justifyContent: 'space-around'  }}>
                          <Text style={{ color:Colors.white, fontSize: height * 0.026,}}>{element.Played}</Text> 
                          <Text style={{ color:Colors.white, fontSize: height * 0.026}}>{element.Points}</Text> 
                        </View>


                  </TouchableOpacity>
              ))
            }
         
          </ScrollView>

        </View>

        <View style={{width:"96%", height:"10%" , borderWidth: 0, borderColor: Colors.white, flexDirection:'row', justifyContent: 'space-between'}}>
        
            <TouchableOpacity style={{width:"45%", height:"100%",borderWidth: 0, borderColor: Colors.white,}}>
              <Image style={{width:"100%",aspectRatio:4}} source={LeaderboardImages.showAllArmor}/>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={()=>{myLocation()}}
              style={{width:"45%", height:"100%",borderWidth: 0, borderColor: Colors.white,}}>
                <Image style={{width:"100%",aspectRatio:4}} source={LeaderboardImages.myLocation}/>
            </TouchableOpacity>

        </View>

        </View>
        }

        
      { currentIndex === 'Weaponry' && 
        <View style={{width:"100%", height:"90%" , borderWidth: 0, borderColor: Colors.blue, alignItems: 'center', backgroundColor: Colors.darkBlue }}>
          
              <View style={{width:"100%", height:"10%" ,borderWidth: 0, borderBottomWidth: 0, borderColor: Colors.white, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: "2%"}}>
                
                <View style={{borderWidth: 0, borderColor: Colors.white, height: "100%", width: '60%', flexDirection: 'row', alignItems: 'center', paddingLeft: "4%", justifyContent: 'space-between'  }}>
                 <Text style={{ color:Colors.white, fontSize: height * 0.026}}>#</Text>
                  <View style={{flexDirection: 'row', width: "85%", height: "100%",alignItems:'center', justifyContent: 'center' , borderWidth: 0, borderColor: Colors.white }}>
                  <Text style={{ color:Colors.white, fontSize: height * 0.026}}>Player</Text>
                  </View>
                </View>

                <View style={{borderWidth: 0, borderColor: Colors.white, height: "100%", width: '40%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', paddingLeft:"4%" }}>
                  <View>
                    <Text style={{ color:Colors.white, fontSize: height * 0.013}}>Played</Text>
                    <Text style={{ color:Colors.white, fontSize: height * 0.013}}>Games</Text>
                  </View>
                  <Text style={{ color:Colors.white, fontSize: height * 0.020, paddingLeft:"4%"}}>Points</Text>
                </View>
          </View>


          <View style={{height:"90%", width:"100%", borderWidth: 0, borderColor: Colors.purple,}}>

          <ScrollView style={{width:"100%", height:"94%", borderWidth: 0, borderColor: Colors.blue, }}>
           
            {
              users.map((element, i)=>(

                  <TouchableOpacity key={i} onPress={()=>{setPlayerModal(true)}} 
                      style={{width:"100%", height:"100%", borderWidth: 0, borderColor: Colors.purple, flexDirection: 'row',alignItems: 'center', 
                      backgroundColor: getBgColor(element.id, 'Weapon'),}}>
                    
                    <View style={{borderWidth: 0, borderColor: Colors.white, height: "100%", width: '60%', flexDirection: 'row', alignItems: 'center', paddingLeft: "3%", justifyContent: 'space-between'  }}>

                    
                      <View style={{width:"10%", height:"100%", borderWidth: 0, borderColor: Colors.purple, flexDirection: 'row',alignItems: 'center', justifyContent: 'center',}}>
                        <Text style={{ color:Colors.white, fontSize: height * 0.026}}>{i+1}</Text> 
                      </View>
                      
                       <View style={{width:"90%", height:"100%", borderWidth: 0, borderColor: Colors.white, flexDirection: 'row',alignItems: 'center', justifyContent: 'space-between', paddingRight:"10%",}}>

                        <View style={{height:"100%", width:"45%", paddingLeft:"2%", borderWidth: 0, borderColor: Colors.white, flexDirection: 'row', alignItems: 'center'}}>
                          <Image source={IMAGES.logo} style={{height: "80%", aspectRatio: 1}}/>
                          <Text style={{ color:Colors.white, fontSize: height * 0.026, paddingLeft:"5%"}}>{element.GameID}</Text> 
                        </View>
                       </View>
                      </View>

                        <View style={{borderWidth: 0, borderColor: Colors.white, height: "100%", width: '40%', flexDirection: 'row', alignItems: 'center', paddingLeft: "4%", justifyContent: 'space-around'  }}>
                          <Text style={{ color:Colors.white, fontSize: height * 0.026,}}>{element.Played}</Text> 
                          <Text style={{ color:Colors.white, fontSize: height * 0.026}}>{element.Points}</Text> 
                        </View>


                  </TouchableOpacity>
              ))
            }
         
          </ScrollView>

        </View>

        <View style={{width:"96%", height:"10%" , borderWidth: 0, borderColor: Colors.white, flexDirection:'row', justifyContent: 'space-between'}}>
        
            <TouchableOpacity style={{width:"45%", height:"100%",borderWidth: 0, borderColor: Colors.white,}}>
              <Image style={{width:"100%",aspectRatio:4}} source={LeaderboardImages.showAllWeapon}/>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={()=>{myLocation()}}
              style={{width:"45%", height:"100%",borderWidth: 0, borderColor: Colors.white,}}>
                <Image style={{width:"100%",aspectRatio:4}} source={LeaderboardImages.myLocation}/>
            </TouchableOpacity>

        </View>

        </View>
        }


          
        
      { currentIndex === 'Energy' && 
        <View style={{width:"100%", height:"90%" , borderWidth: 0, borderColor: Colors.blue, alignItems: 'center', backgroundColor: Colors.darkBlue }}>
          
              <View style={{width:"100%", height:"10%" ,borderWidth: 0, borderBottomWidth: 0, borderColor: Colors.white, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: "2%"}}>
                
                <View style={{borderWidth: 0, borderColor: Colors.white, height: "100%", width: '60%', flexDirection: 'row', alignItems: 'center', paddingLeft: "4%", justifyContent: 'space-between'  }}>
                 <Text style={{ color:Colors.white, fontSize: height * 0.026}}>#</Text>
                  <View style={{flexDirection: 'row', width: "85%", height: "100%",alignItems:'center', justifyContent: 'center' , borderWidth: 0, borderColor: Colors.white }}>
                  <Text style={{ color:Colors.white, fontSize: height * 0.026}}>Player</Text>
                  </View>
                </View>

                <View style={{borderWidth: 0, borderColor: Colors.white, height: "100%", width: '40%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', paddingLeft:"4%" }}>
                  <View>
                    <Text style={{ color:Colors.white, fontSize: height * 0.013}}>Played</Text>
                    <Text style={{ color:Colors.white, fontSize: height * 0.013}}>Games</Text>
                  </View>
                  <Text style={{ color:Colors.white, fontSize: height * 0.020, paddingLeft:"4%"}}>Points</Text>
                </View>
          </View>


          <View style={{height:"90%", width:"100%", borderWidth: 0, borderColor: Colors.purple,}}>

          <ScrollView style={{width:"100%", height:"94%", borderWidth: 0, borderColor: Colors.blue, }}>
           
            {
              users.map((element, i)=>(

                  <TouchableOpacity key={i} onPress={()=>{setPlayerModal(true)}} 
                      style={{width:"100%", height:"100%", borderWidth: 0, borderColor: Colors.purple, flexDirection: 'row',alignItems: 'center', 
                      backgroundColor: getBgColor(element.id, 'Energy'),}}>
                    
                    <View style={{borderWidth: 0, borderColor: Colors.white, height: "100%", width: '60%', flexDirection: 'row', alignItems: 'center', paddingLeft: "3%", justifyContent: 'space-between'  }}>

                    
                      <View style={{width:"10%", height:"100%", borderWidth: 0, borderColor: Colors.purple, flexDirection: 'row',alignItems: 'center', justifyContent: 'center',}}>
                        <Text style={{ color:Colors.white, fontSize: height * 0.026}}>{i+1}</Text> 
                      </View>
                      
                       <View style={{width:"90%", height:"100%", borderWidth: 0, borderColor: Colors.white, flexDirection: 'row',alignItems: 'center', justifyContent: 'space-between', paddingRight:"10%",}}>

                        <View style={{height:"100%", width:"45%", paddingLeft:"2%", borderWidth: 0, borderColor: Colors.white, flexDirection: 'row', alignItems: 'center'}}>
                          <Image source={IMAGES.logo} style={{height: "80%", aspectRatio: 1}}/>
                          <Text style={{ color:Colors.white, fontSize: height * 0.026, paddingLeft:"5%"}}>{element.GameID}</Text> 
                        </View>
                       </View>
                      </View>

                        <View style={{borderWidth: 0, borderColor: Colors.white, height: "100%", width: '40%', flexDirection: 'row', alignItems: 'center', paddingLeft: "4%", justifyContent: 'space-around'  }}>
                          <Text style={{ color:Colors.white, fontSize: height * 0.026,}}>{element.Played}</Text> 
                          <Text style={{ color:Colors.white, fontSize: height * 0.026}}>{element.Points}</Text> 
                        </View>


                  </TouchableOpacity>
              ))
            }
         
          </ScrollView>

        </View>

        <View style={{width:"96%", height:"10%" , borderWidth: 0, borderColor: Colors.white, flexDirection:'row', justifyContent: 'space-between'}}>
        
            <TouchableOpacity style={{width:"45%", height:"100%",borderWidth: 0, borderColor: Colors.white,}}>
              <Image style={{width:"100%",aspectRatio:4}} source={LeaderboardImages.showAllEnergy}/>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={()=>{myLocation()}}
              style={{width:"45%", height:"100%",borderWidth: 0, borderColor: Colors.white,}}>
                <Image style={{width:"100%",aspectRatio:4}} source={LeaderboardImages.myLocation}/>
            </TouchableOpacity>

        </View>

        </View>
        }

          
        
      { currentIndex === 'Cyber' &&
        <View style={{width:"100%", height:"90%" , borderWidth: 0, borderColor: Colors.blue, alignItems: 'center', backgroundColor: Colors.darkBlue }}>
          
              <View style={{width:"100%", height:"10%" ,borderWidth: 0, borderBottomWidth: 0, borderColor: Colors.white, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: "2%"}}>
                
                <View style={{borderWidth: 0, borderColor: Colors.white, height: "100%", width: '60%', flexDirection: 'row', alignItems: 'center', paddingLeft: "4%", justifyContent: 'space-between'  }}>
                 <Text style={{ color:Colors.white, fontSize: height * 0.026}}>#</Text>
                  <View style={{flexDirection: 'row', width: "85%", height: "100%",alignItems:'center', justifyContent: 'center' , borderWidth: 0, borderColor: Colors.white }}>
                  <Text style={{ color:Colors.white, fontSize: height * 0.026}}>Player</Text>
                  </View>
                </View>

                <View style={{borderWidth: 0, borderColor: Colors.white, height: "100%", width: '40%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', paddingLeft:"4%" }}>
                  <View>
                    <Text style={{ color:Colors.white, fontSize: height * 0.013}}>Played</Text>
                    <Text style={{ color:Colors.white, fontSize: height * 0.013}}>Games</Text>
                  </View>
                  <Text style={{ color:Colors.white, fontSize: height * 0.020, paddingLeft:"4%"}}>Points</Text>
                </View>
          </View>


          <View style={{height:"90%", width:"100%", borderWidth: 0, borderColor: Colors.purple,}}>

          <ScrollView style={{width:"100%", height:"94%", borderWidth: 0, borderColor: Colors.blue, }}>
           
            {
              users.map((element, i)=>(

                  <TouchableOpacity key={i} onPress={()=>{setPlayerModal(true)}} 
                      style={{width:"100%", height:"100%", borderWidth: 0, borderColor: Colors.purple, flexDirection: 'row',alignItems: 'center', 
                      backgroundColor: getBgColor(element.id, 'Cyber'),}}>
                    
                    <View style={{borderWidth: 0, borderColor: Colors.white, height: "100%", width: '60%', flexDirection: 'row', alignItems: 'center', paddingLeft: "3%", justifyContent: 'space-between'  }}>

                    
                      <View style={{width:"10%", height:"100%", borderWidth: 0, borderColor: Colors.purple, flexDirection: 'row',alignItems: 'center', justifyContent: 'center',}}>
                        <Text style={{ color:Colors.white, fontSize: height * 0.026}}>{i+1}</Text> 
                      </View>
                      
                       <View style={{width:"90%", height:"100%", borderWidth: 0, borderColor: Colors.white, flexDirection: 'row',alignItems: 'center', justifyContent: 'space-between', paddingRight:"10%",}}>

                        <View style={{height:"100%", width:"45%", paddingLeft:"2%", borderWidth: 0, borderColor: Colors.white, flexDirection: 'row', alignItems: 'center'}}>
                          <Image source={IMAGES.logo} style={{height: "80%", aspectRatio: 1}}/>
                          <Text style={{ color:Colors.white, fontSize: height * 0.026, paddingLeft:"5%"}}>{element.GameID}</Text> 
                        </View>
                       </View>
                      </View>

                        <View style={{borderWidth: 0, borderColor: Colors.white, height: "100%", width: '40%', flexDirection: 'row', alignItems: 'center', paddingLeft: "4%", justifyContent: 'space-around'  }}>
                          <Text style={{ color:Colors.white, fontSize: height * 0.026,}}>{element.Played}</Text> 
                          <Text style={{ color:Colors.white, fontSize: height * 0.026}}>{element.Points}</Text> 
                        </View>


                  </TouchableOpacity>
              ))
            }
         
          </ScrollView>

        </View>

        <View style={{width:"96%", height:"10%" , borderWidth: 0, borderColor: Colors.white, flexDirection:'row', justifyContent: 'space-between'}}>
        
            <TouchableOpacity style={{width:"45%", height:"100%",borderWidth: 0, borderColor: Colors.white,}}>
              <Image style={{width:"100%",aspectRatio:4}} source={LeaderboardImages.showAllCyber}/>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={()=>{myLocation()}}
              style={{width:"45%", height:"100%",borderWidth: 0, borderColor: Colors.white,}}>
                <Image style={{width:"100%",aspectRatio:4}} source={LeaderboardImages.myLocation}/>
            </TouchableOpacity>

        </View>

        </View>
        }
      
      </View>

      

    </View>
    











    <Modal transparent={true} visible={playerModal} animationType='fade'>
              <View style={GlobalStyles.modal}>
                <View
                   style={{ elevation: 10, zIndex: 10, backgroundColor: Colors.black, flex: 1, width: "100%", height: "60%", maxHeight: "40%", maxWidth: 250,
                    justifyContent: 'center',alignItems: 'center', borderRadius: 10, borderColor: Colors.darkgrey, borderWidth: 1}}>
                         
                          <TouchableOpacity onPress={()=>{setPlayerModal(false)}} style={{width:"12%", aspectRatio:1, borderColor: Colors.white, borderWidth: 1, borderRadius:6, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{color: Colors.white, fontSize: 20}}>X</Text>
                          </TouchableOpacity>

                          <Text style={{color: Colors.white, fontSize: 20}}>Player Info</Text>
                            
                </View>
              </View>
            </Modal>


   </SafeAreaView>
  )
}
