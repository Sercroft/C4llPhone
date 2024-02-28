import React from 'react';
import { StatusBar } from 'react-native';
import NavBar from './src/navigation';


function App(): React.JSX.Element {
  return (
    <>
      <StatusBar />
      <NavBar />
    </>
  );
}

export default App;