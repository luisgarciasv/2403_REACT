import { createContext, useState } from 'react';
import './App.css';
import Home from './components/Home/Home';

export const urlContext = createContext();

function App() {

  const [contexUrl, setContextUrl] = useState(''); 

  return (
    <urlContext.Provider value={[contexUrl, setContextUrl]}>
    <div className="App">
     <Home/>
    </div>
    </urlContext.Provider>
  );
}

export default App;
