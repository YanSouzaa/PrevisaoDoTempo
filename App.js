import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Switch, Button, PermissionsAndroid, LogBox } from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';
import Icon2 from 'react-native-vector-icons/Entypo';
import Geolocation from '@react-native-community/geolocation';
import LinearGradient from 'react-native-linear-gradient';

import api from './api'


export default function App() {

  LogBox.ignoreAllLogs();
  const [cor, setCor] = useState(false)

  const [location, setLocation] = useState('BR, Fortaleza')
  const [currentLatitude, setCurrentLatitude] = useState('');
  const [currentLongitude, setCurrentLongitude] = useState('');


  const [dados, setDados] = useState()

  const callLocation = () => {
      const requestLocationPermission = async () => {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Permissão de Acesso à Localização",
            message: "Este aplicativo precisa acessar sua localização.",
            buttonNeutral: "Pergunte-me depois",
            buttonNegative: "Cancelar",
            buttonPositive: "OK"
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getLocation();
          getWeather()
        } else {
          alert('Permissão de Localização negada');
        }
      };
      requestLocationPermission();
    
  }
  
  const getLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const currentLatitude = JSON.stringify(position.coords.latitude);
        const currentLongitude = JSON.stringify(position.coords.longitude);
        setCurrentLatitude(currentLatitude);
        setCurrentLongitude(currentLongitude);
      },
      (error) => alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
    
   
  }
  
  
  useEffect(() => {
 
    callLocation();
    

  }, [])



  async function getWeather(lat, lon) {
    const result = await api.get(`https://api.openweathermap.org/data/2.5/weather?lat=${currentLatitude}&lon=${currentLongitude}&appid=fb7e12726fbd563fae18e79417be66a6`)
      .then(result => setDados(result.data))
    // .catch((err) => {
    //   console.error("Ops" + err)
    // })
  }

  const [wind, setWind] = useState('65')
  const [umidity, setUmidity] = useState('')
  const [tempMin, setTempMin] = useState('21')
  const [tempMax, setTempMax] = useState('31')





  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    viewTop: {
      justifyContent: 'center',
      alignItems: 'center',
      height: 200,
      width: 200,
      marginTop: 30,
    },
    textTemp: {
      fontSize: 90,
      color: '#919091',
      fontWeight: '100',
    },
    viewBloco1: {
      marginTop:25,
      height: 100,
      width: 110,
      margin: 5,
      borderRadius: 90,
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    viewBloco2: {
      backgroundColor: '#ffc53c',
      height: 120,
      width: 110,
      margin: 5,
      borderRadius: 40,
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    viewBloco3: {
      backgroundColor: '#4db5c1',
      height: 120,
      width: 110,
      margin: 5,
      borderRadius: 40,
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    viewInfo: {
      backgroundColor: '#919091',
      height: '40%',
      width: 380,
      borderRadius: 20,
      marginTop:60,

    },
    textBloco: {
      color: 'white',
      fontSize: 17,
    },
    iconBloco: {
      color: 'white',
      fontSize: 35,
    },
    textInfo: {
      fontSize: 15,
      fontWeight: 'bold',
    },
    textInfo2: {
      textAlign: 'center',
      fontSize: 16
    },
    viewDados: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    }



  })

  const [isEnable, setIsEnable] = useState(false)
  const [cora, setCora] = useState(['#acd3e9', '#efefef'])



  function handleSwitch() {
    setIsEnable(previousState => !previousState)
    if (cor === false) {
      setCor(true)
      setCora(['#314776', '#1e2e47'])
    } else {
      setCor(false)
      setCora(['#acd3e9', '#efefef'])
    }

  }






  return (
    <LinearGradient colors={cora} style={styles.container}>

      <View style={styles.viewTop}>
        <Icon name="day-sunny" style={{ fontSize: 60, marginBottom: 4, color: '#fdc561', fontWeight: 'bold' }} />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.textTemp}>{(dados?.main.temp - 273.15).toFixed([0])}</Text>
          <Text style={[styles.textTemp, { fontSize: 40, textAlign: 'center' }]}>ºc</Text>
        </View>
        <Text style={{ color: '#919091', fontSize: 20 }}>{(dados?.sys.country)}, {(dados?.name)}</Text>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%' }}>





      </View>

      <View style={styles.viewInfo}>

        <View style={styles.viewDados}>

          <View style={styles.viewBloco1}>
            <Text style={styles.textBloco}>Umidade</Text>
            <Icon2 style={styles.iconBloco} name="water" />
            <Text style={styles.textBloco}>{dados?.main.humidity}</Text>
          </View>

          <View style={styles.viewBloco1}>
            <Text style={styles.textBloco}>Vento</Text>
            <Icon style={styles.iconBloco} name="wind" />
            <Text style={styles.textBloco}>{dados?.wind.speed + ' Km'}</Text>
          </View>

        </View>
        <View style={styles.viewDados}>

          <View style={styles.viewBloco1}>
            <Text style={styles.textBloco}>Temp. Min</Text>
            <Icon2 style={styles.iconBloco} name="thermometer" />
            <Text style={styles.textBloco}>{(dados?.main.temp_min - 273.15).toFixed([0]) + 'ºc'}</Text>
          </View>
          <View style={styles.viewBloco1}>
            <Text style={styles.textBloco}>Temp. Max</Text>
            <Icon style={styles.iconBloco} name="thermometer" />
            <Text style={styles.textBloco}>{(dados?.main.temp_max - 273.15).toFixed([0]) + 'ºc' }</Text>
          </View>
        </View>






      </View>
        <View style={{ width: 350, marginTop: 20, }}>
          <Switch value={isEnable} onChange={handleSwitch} />

        </View>
        <Button title='Refresh' onPress={() => callLocation()} style={{}}>

        </Button>


    </LinearGradient>
  );
}



