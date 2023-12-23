/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import MainComponent from './src/presentation/pages/main/MainComponent';
import mainViewmodel from './src/presentation/pages/main/mainViewmodel';

function App(): React.JSX.Element {
  const viewmodel = mainViewmodel()
  return <MainComponent viewmodel={viewmodel} />
}


export default App;
