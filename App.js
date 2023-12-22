import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { LogBox, SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import Video from "react-native-video";

const App = () => {

  let date = new Date();
  let dateFormat = date.getFullYear() +  
    '-' + ( (date.getMonth()+1) < 9 ? "0" + (date.getMonth()+1) : (date.getMonth()+1) )+
    '-' + ( (date.getDate()) < 9 ? "0" + (date.getDate()) : (date.getDate()) );
  let today = String(date.getFullYear()).substring(2, 4)
  + ( (date.getMonth()+1) < 9 ? "0" + (date.getMonth()+1) : (date.getMonth()+1) ) 
  + ( (date.getDate()) < 9 ? "0" + (date.getDate()) : (date.getDate()) );

  const form = new FormData();
  form.append('today', dateFormat);
  const ip = process.env.REACT_APP_IP;
  const [uri, setUri] = useState('');
  const [duration, setDuration] = useState('00:00:00');


  const refresh = () => {
    axios.post(ip + "/select", form, { headers: { 'content-type': 'multipart/form-data' }})
    .then((res) => {
      console.warn(res);
      if(res.data !== null){
        setDuration(res.data.elapsed);
      }
    })
    .catch((e) => {console.warn(e)});
    axios.post(ip + "/selectVideo", form, { headers: { 'content-type': 'multipart/form-data' }})
    .then((res) => setUri(res.data.videoUrl))
    .catch((e) => {console.warn(e)});
  }

  /* warning 막기 */
  // LogBox.ignoreAllLogs();
  
  return (
    <SafeAreaView style={{flex: 1, justifyContent:'space-between'}}>
      <View style={{borderBottomWidth: 1.5, borderTopWidth: 1.5, padding: 8, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontSize: 32, fontWeight: 600}}>Tracking {today}</Text>
            <TouchableOpacity onPress={() => {refresh()}}>
                <Ionicons name='refresh-outline' size={28} />
            </TouchableOpacity>
        </View>
        <View style={{alignItems: 'center', marginTop: 15, justifyContent: 'center'}}>
            <Text style={{fontSize: 80, fontWeight: 600, fontVariant: ['tabular-nums']}}>{duration}</Text>
        </View>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Video 
            source={{uri: uri}}
            paused={false}
            resizeMode={"cover"}
            repeat={false}
            style={{backgroundColor: 'gray'}}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
            <TouchableOpacity 
                style={{width: '100%', borderBottomWidth: 1, borderTopWidth: 1, backgroundColor: 'black', alignItems: 'center', padding: 10}}
                // onPress={() => {}}
            >
                <Text style={{fontSize: 24, color: 'white'}}>인쇄하기</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

export default App