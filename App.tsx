/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MainPage } from './src/presentation/pages/main';

function App(): React.JSX.Element {
  const client = new QueryClient()
  return <QueryClientProvider client={client}>
    <MainPage/>
  </QueryClientProvider>
  
  
}


export default App;
