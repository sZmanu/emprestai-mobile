import React from 'react';
import TelaPrincipal from './src/views/TelaPrincipal';
import { SafeAreaView } from 'react-native-safe-area-context';
import TabBar from './src/componentes/TabBar';
import { NavigationContainer } from '@react-navigation/native';

const App = () => {
  return (
    <NavigationContainer>
    <SafeAreaView style={{ flex: 1 }}> {/* ADICIONA flex: 1 aqui */}
      <TabBar />
    </SafeAreaView>
    </NavigationContainer>
  );
}

export default App;
