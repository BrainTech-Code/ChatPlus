const ResponseBLoc=({item}) => {
  //shared item
const options ={
  message:item.content,
  title:"partage par chatPlus",
  url:null,
  email:null,
  recipient:null
  }    
const handleShared =()=>{
Share.open(options)
   .then((res) => {
      
    }).catch((err) => {
        console.log(err);
    });
}
  
  return(
    <View style={[styles.chatBubble]}>
       {item.role==='user'?<Icon name="ios-person-circle-outline" size={30} color="#4F8EF7"/>:<Image source={require("../assets/botmin.jpg")} style={{width:35,height:35}}/>} 
      <View style={{width:"100%",
                    }}>                         
          <TouchableOpacity onLongPress={handleShared} ><Text style={styles.chatText}>{item.content}</Text></TouchableOpacity>
          <TouchableOpacity onPress={handleShared} style={{
                             position:'relative',
                             left:'60%',}}><Icon name="share-outline" size={30} color="rgba(255,255,255,0.8)"/></TouchableOpacity>
      </View>
    </View> 
      ) ;
}
