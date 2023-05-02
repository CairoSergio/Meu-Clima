import React, { useEffect, useState, useRef } from 'react';
import { Image, ScrollView, Keyboard,TouchableWithoutFeedback,Text, TextInput, TouchableOpacity, View, ActivityIndicator } from 'react-native'
import {useWeatherData, Weather,Forecast } from '../features/whather';
import { styles } from './style';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

export default function Home() {
    const [weatherData, setWeatherData] = useState<Weather | null>();
    const [forecastWeather, setForecastWeather] = useState<Forecast[]>();
    const [city, setCity] = useState<string>("Maputo");
    const [newcity, setNewCity] = useState<string>("");
    const [showInput, setShowInput] = useState(false);
    const handleButtonClick = () => {
        setShowInput(true);
    };
    Keyboard.addListener('keyboardDidHide', () => {
        if(showInput){
            setShowInput(false)
        }
    });

    const months =[
        'JAN',
        'FEV',
        'MAR',
        'ABR',
        'MAI',
        'JUN',
        'JUL',
        'AGO',
        'SET',
        'OUT',
        'NOV',
        'DEC',
    ]
  const ViewClima = async () =>{
    try{
        if (newcity !== '') {
            useWeatherData(newcity).then(({ currentWeather, forecastWeather }) => {
              setWeatherData(currentWeather);
              setForecastWeather(forecastWeather);
            });
        } else {
            useWeatherData(city).then(({ currentWeather, forecastWeather }) => {
              setWeatherData(currentWeather);
              setForecastWeather(forecastWeather);
            });
        }
          
    }catch(erro){
      console.log(erro)
    }
  }
  const NovaCity = () =>{
    setCity(newcity)
    ViewClima().then(()=>{
        Keyboard.dismiss()
    })
    setNewCity('')
  }

  useEffect(()=>{
    ViewClima();
  },[])
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.TitleView}>
            {
                showInput ? (
                    <TextInput  
                        value={newcity}
                        onChangeText={(e)=>setNewCity(e)}
                        placeholder='Escrevao nome da sua cidade.....' style={{width:310,marginRight:20,borderRadius:5, padding:10,backgroundColor:'#ffffff'}}
                        onSubmitEditing={()=> setShowInput(false)}
                        autoFocus={true}
                    />
                ) : (

                    <Text style={styles.HeaderTitle}>TEMPERATURA</Text>
                )
            }
            {
                showInput && newcity.length > 1 ? (
                    <TouchableOpacity onPress={NovaCity} style={styles.Search}>
                        <Ionicons name='send' color="#fff"  size={25}/>
                    </TouchableOpacity>
                ):(
                    <TouchableOpacity onPress={handleButtonClick} style={styles.Search}>
                            <Ionicons name='search' color="#fff"  size={25}/>
                    </TouchableOpacity>

                )
            }
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <Text style={{textAlign:'center', fontFamily:'NotoSerif-Bold', fontSize:10, marginTop:15,marginBottom:15, color:'#1E293B'}}>O TEMPO NA SUA LOCALIZAÇÃO ATUAL</Text>
        <View style={styles.TempComtainer}>
            <View style={{flexDirection:'row', alignItems:'flex-start'}}>
                <View style={{flexDirection:'column'}}>
                    <Text style={styles.Temperatura}>
                        {weatherData?.temperature.toString().split(".")[0]}°C
                    </Text>
                    <Text style={styles.regiao}>
                        {city}
                    </Text>
                </View>
                <View style={{alignItems:'flex-end', width:'50%', elevation:10}}>
                    <Image style={{height:100, width:100}} source={{uri: weatherData?.image}}/>
                </View>
            </View>
            <Text style={styles.descricao}>{weatherData?.description.toString().toUpperCase()}</Text>
        </View>
        <View style={{marginTop:20,flexDirection:'row', justifyContent:'space-between', width:'85%', alignSelf:'center'}}>
            <View style={{flexDirection:'column', alignItems:'center'}}>
                <Text style={{color:'#1E293B', fontFamily:'Roboto-Bold'}}>UMIDADE</Text>
                <Text style={{color:'#1E293B', fontFamily:'Roboto-Bold', fontSize:11}}>{weatherData?.humidity}%</Text>
            </View>
            <View style={{flexDirection:'column', alignItems:'center'}}>
                <Text style={{color:'#1E293B', fontFamily:'Roboto-Bold'}}>SENSAÇÃO</Text>
                <Text style={{color:'#1E293B', fontFamily:'Roboto-Bold', fontSize:11}}>{weatherData?.feelsLike.toString().split(".")[0]}°C</Text>
            </View>
            <View style={{flexDirection:'column', alignItems:'center'}}>
                <Text style={{color:'#1E293B', fontFamily:'Roboto-Bold'}}>PRESÃO</Text>
                <Text style={{color:'#1E293B', fontFamily:'Roboto-Bold', fontSize:11}}>{weatherData?.pressure} hPa</Text>
            </View>
            <View style={{flexDirection:'column', alignItems:'center'}}>
                <Text style={{color:'#1E293B', fontFamily:'Roboto-Bold'}}>VENTO</Text>
                <Text style={{color:'#1E293B', fontFamily:'Roboto-Bold', fontSize:11}}>{weatherData?.windSpeed} m/s</Text>
            </View>
        </View>
        <View style={{width:'100%',marginTop:30}}>
            {forecastWeather?.map((forecast, i) => (
                <View key={i} style={{width:'100%', height:70, borderTopColor:"#0273dc", borderTopWidth:1}}>
                    <View style={{flexDirection:'row',width:'90%', height:'100%', alignSelf:'center', justifyContent:'space-between', alignItems:'center'}}>
                        <View style={{flexDirection:'row', alignItems:'flex-end'}}>
                            <Text style={{color:'#1E293B', fontFamily:'Roboto-Bold', fontSize:15}}>
                                {new Date(Date.now() + (i+1) * 24 * 60 * 60 * 1000).getDate().toString()}
                            </Text>
                            <Text style={{color:'#1E293B', fontFamily:'Roboto-Bold', fontSize:13}}>
                                .{months[(new Date(Date.now() + i * 24 * 60 * 60 * 1000).getMonth() + 1 ).toString() -1 ]}
                        </Text>
                        </View>
                        <Image style={{height:50, width:50}} source={{uri: forecast.description}}/>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{color:'#f11212', fontFamily:'Roboto-Bold', fontSize:15}}>{forecast.temperatureMax.toString().split(".")[0]}°C</Text>
                            <Text style={{color:'#1E293B', fontFamily:'Roboto-Bold', fontSize:15}}> / </Text>
                            <Text style={{color:'#0062ff', fontFamily:'Roboto-Bold', fontSize:15}}>{forecast.temperatureMin.toString().split(".")[0]}°C</Text>
                        </View>
                        <View style={{alignItems:'center'}}>
                            <Text style={{color:'#1E293B', fontFamily:'Roboto-Bold', fontSize:15}}>{forecast.windSpeed}m/s</Text>
                        </View>
                    </View>
                </View>

            ))}
        </View>
      </ScrollView>
      <StatusBar style='light'/>
    </View>
  );
}
{/* <View key={i}>
<Text>Date: {new Date(Date.now() + i * 24 * 60 * 60 * 1000).toLocaleDateString()}</Text>
<Text>Temperatura maxima: {forecast.temperatureMax}°C</Text>
<Text>Temperatura minima: {forecast.temperatureMin}%</Text>
<Text>Description: {forecast.windSpeed}</Text>
</View> */}

{/* <Text>Current weather for {city}:</Text>
<Text>Feels like: {weatherData?.feelsLike}°C</Text>
<Text>Wind speed: {weatherData?.windSpeed} m/s</Text>
<Text>Pressure: {weatherData?.pressure} hPa</Text>
</View> */}

//5.66