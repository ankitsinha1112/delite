// import React from 'react';
import React, { useEffect } from 'react';
import AllRoute from '../router'
import { SnackbarProvider } from 'notistack';

const App = () => { 
  return (
    <div className="App" id='scrool'>
      <SnackbarProvider>
          <AllRoute/>
      </SnackbarProvider>
    </div>
  );
}

export default App;
