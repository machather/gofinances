import React, { useEffect, useCallback } from 'react';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import * as SplashScreen from "expo-splash-screen";
import { ThemeProvider } from 'styled-components';
import { SafeAreaView, StatusBar } from 'react-native';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
} from '@expo-google-fonts/poppins';

import theme from './src/global/styles/theme'

import { AuthProvider, useAuth } from './src/hooks/auth';
import { Routes } from './src/routes';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  });

  const { userStorageLoading } = useAuth();

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
      } catch (e) {
        console.warn(e);
      }
    }
    prepare();
  }, []);


  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || userStorageLoading) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, userStorageLoading]);

  if (!fontsLoaded) return null;

  return (
    <SafeAreaView style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <ThemeProvider theme={theme}>
        <StatusBar barStyle="light-content" />
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </ThemeProvider>
    </SafeAreaView>
  )
}

