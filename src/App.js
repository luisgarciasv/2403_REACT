import { createContext, useState } from 'react';
import './App.css';
import Home from './components/Home/Home';

export const urlContext = createContext();
export const submitContext = createContext();
export const bgContext = createContext();

function App() {

  const [contextUrl, setContextUrl] = useState(''); 
  const [contextSubmit, setContextSubmit] = useState('');
  const [contextBg, setContextBg] = useState('')

  document.body.style = `background: ${contextBg};` 

  return (
    <bgContext.Provider value={[contextBg, setContextBg]}>
    <submitContext.Provider value={[contextSubmit, setContextSubmit]}>
    <urlContext.Provider value={[contextUrl, setContextUrl]}>
    <div className="App">
     <Home/>
    </div>
    </urlContext.Provider>
    </submitContext.Provider>
    </bgContext.Provider>
  );
}

export default App;
