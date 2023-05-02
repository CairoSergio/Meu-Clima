import React, { useEffect, useState } from 'react';
import Home from './src/Home/Index';
import * as Font from 'expo-font';
export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState<boolean>(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
        'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
        'NotoSerif-Regular': require('./assets/fonts/NotoSerif-Regular.ttf'),
        'NotoSerif-Bold': require('./assets/fonts/NotoSerif-Bold.ttf'),
      });
      setFontsLoaded(true);
    }

    loadFonts();
  }, []);

  if (!fontsLoaded){
    return null;
  }

  return (
    <Home/>
  );
}
