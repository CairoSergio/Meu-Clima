import axios from 'axios';

const API_KEY = 'e46cef26597f9d89839a58e6b81193de';
const translations: { [key: string]: string } = {
  // English => Portuguese translations
  'clear sky': 'céu limpo',
  'few clouds': 'poucas nuvens',
  'scattered clouds': 'nuvens dispersas',
  'broken clouds': 'nuvens quebradas',
  'shower rain': 'chuva de banho',
  'rain': 'chuva',
  'thunderstorm': 'trovoada',
  'snow': 'neve',
  'mist': 'névoa',
  'overcast clouds' : 'nuvens nubladas',
  'light intensity shower rain': 'chuva de intensidade leve',
  'light snow':'pouca neve',
  'light rain': 'pouca chuva',
  'moderate rain': 'chuva moderada'
};
// https://firebasestorage.googleapis.com/v0/b/classchat-464e0.appspot.com/o/cloudy.png?alt=media&token=5d559eba-0263-4ef8-bda2-42f538446c41
// https://firebasestorage.googleapis.com/v0/b/classchat-464e0.appspot.com/o/cloud.png?alt=media&token=ce4614ea-ea36-40ae-ab57-3d380e173646
// https://firebasestorage.googleapis.com/v0/b/classchat-464e0.appspot.com/o/snow%20(1).png?alt=media&token=c58f2937-d92d-4c57-b783-4cbd66fd077a
{/* <a href="https://bit.ly/3Lnv7Ua" title="sun icons">Sun icons created by Freepik - Flaticon</a> */}
const images: { [key: string]: string } = {
  // Descriptions => Image URLs
  'céu limpo': 'https://firebasestorage.googleapis.com/v0/b/classchat-464e0.appspot.com/o/sunny.png?alt=media&token=7224b0fc-84ff-4925-805b-aad6a45de21f',
  'poucas nuvens': 'https://bit.ly/3Lnv7Ua',
  'nuvens dispersas': 'https://firebasestorage.googleapis.com/v0/b/classchat-464e0.appspot.com/o/cloud.png?alt=media&token=ce4614ea-ea36-40ae-ab57-3d380e173646',
  'nuvens quebradas': 'https://firebasestorage.googleapis.com/v0/b/classchat-464e0.appspot.com/o/sun.png?alt=media&token=296eaf52-a69b-48b6-9f41-246022bb4cf3',
  'chuva de banho': 'https://firebasestorage.googleapis.com/v0/b/classchat-464e0.appspot.com/o/sun.png?alt=media&token=296eaf52-a69b-48b6-9f41-246022bb4cf3',
  'chuva': 'https://firebasestorage.googleapis.com/v0/b/classchat-464e0.appspot.com/o/rain.png?alt=media&token=550add3e-0ed2-42fb-92e6-bb0e222dfa77',
  'trovoada': 'https://firebasestorage.googleapis.com/v0/b/classchat-464e0.appspot.com/o/thunder.png?alt=media&token=229033e3-fd72-4dcf-b26e-70484f101d43',
  'neve': 'https://firebasestorage.googleapis.com/v0/b/classchat-464e0.appspot.com/o/snow.png?alt=media&token=756a9693-2452-49fa-9fd1-6eb877c52fd1',
  'névoa': 'https://firebasestorage.googleapis.com/v0/b/classchat-464e0.appspot.com/o/snow%20(1).png?alt=media&token=c58f2937-d92d-4c57-b783-4cbd66fd077a',
  'nuvens nubladas' : 'https://firebasestorage.googleapis.com/v0/b/classchat-464e0.appspot.com/o/cloud.png?alt=media&token=ce4614ea-ea36-40ae-ab57-3d380e173646',
  'chuva de intensidade leve': 'https://firebasestorage.googleapis.com/v0/b/classchat-464e0.appspot.com/o/rain.png?alt=media&token=550add3e-0ed2-42fb-92e6-bb0e222dfa77',
  'pouca neve': 'https://firebasestorage.googleapis.com/v0/b/classchat-464e0.appspot.com/o/snow.png?alt=media&token=756a9693-2452-49fa-9fd1-6eb877c52fd1',
  'chuva moderada': 'https://firebasestorage.googleapis.com/v0/b/classchat-464e0.appspot.com/o/rain.png?alt=media&token=550add3e-0ed2-42fb-92e6-bb0e222dfa77',
  'pouca chuva': 'https://firebasestorage.googleapis.com/v0/b/classchat-464e0.appspot.com/o/rain.png?alt=media&token=550add3e-0ed2-42fb-92e6-bb0e222dfa77'
};


export interface Weather {
  temperature: string;
  humidity: string;
  feelsLike: string;
  windSpeed: string;
  pressure: string;
  description: string;
  image: string;
}

export interface Forecast {
  date: string;
  temperatureMin: string;
  temperatureMax: string;
  windSpeed: string;
  description: string
}

export const useWeatherData = async (city: string) => {
  // Get current weather data
  const currentUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
  const currentResponse = await axios.get(currentUrl);
  const currentData = currentResponse.data;
  const translatedDescription = translations[currentData.weather[0].description] || currentData.weather[0].description;
  const image = images[translatedDescription] || '';
  // Get 5 day forecast data
  const forecastUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;
  const forecastResponse = await axios.get(forecastUrl);
  const forecastData = forecastResponse.data;
  // Extract relevant data from response
  const currentWeather: Weather = {
    temperature: currentData.main.temp,
    humidity: currentData.main.humidity,
    feelsLike: currentData.main.feels_like,
    windSpeed: currentData.wind.speed,
    pressure: currentData.main.pressure,
    description: translatedDescription,
    image,
  };

  const forecastWeather: Forecast[] = forecastData.list
    .filter((item: any) => item.dt_txt.includes('12:00:00')) // Only get data for noon each day
    .map((item: any) => ({
      date: item.dt_txt.split(' ')[0],
      temperatureMin: item.main.temp_min,
      temperatureMax: item.main.temp_max,
      windSpeed: item.wind.speed,
      description: images[translations[item.weather[0].description]] || item.weather[0].description
  }));

  return {
    currentWeather,
    forecastWeather,
  };
};


{/* <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
{
  weatherData ? (
    <>
      <Text>Temaperatura: {weatherData?.temperature} °C</Text>
      <Text>Umidade: {weatherData?.humidity}%</Text>
      <Text>Descriçao: {weatherData?.description}</Text>
      <Text>5-day forecast for {city}:</Text>
      {forecastWeather?.map((forecast, i) => (
        <View key={i}>
          <Text>Date: {new Date(Date.now() + i * 24 * 60 * 60 * 1000).toLocaleDateString()}</Text>
          <Text>Temperatura maxima: {forecast.temperatureMax}°C</Text>
          <Text>Temperatura minima: {forecast.temperatureMin}%</Text>
          <Text>Description: {forecast.windSpeed}</Text>
        </View>
      ))}
      <TouchableOpacity onPress={()=>setWeatherData(null)} style={{justifyContent:'center', alignItems:'center', width:'90%', height:45, borderRadius:5, backgroundColor:'#007fff'}}>
        <Text style={{fontWeight:'bold', color:'#fff', fontSize:17}}>Voltar</Text>
      </TouchableOpacity>
    </>
  ):(
    <>
      <TextInput value={city} onChangeText={(e)=>setCity(e)} style={{width:'90%', height:45,padding:10,marginBottom:10,borderWidth:2, borderRadius:5, borderColor:'#000'}}  placeholder='Ensira a sua cidade'/>
      <TouchableOpacity onPress={ViewClima} style={{justifyContent:'center', alignItems:'center', width:'90%', height:45, borderRadius:5, backgroundColor:'#007fff'}}>
        <Text style={{fontWeight:'bold', color:'#fff', fontSize:17}}>Ver clima</Text>
      </TouchableOpacity>
    </>
  )
}
</View> */}