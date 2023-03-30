import { createContext, useState } from 'react';
import './App.css';
import Home from './components/Home/Home';

export const urlContext = createContext();
export const submitContext= createContext();

function App() {

  const [contextUrl, setContextUrl] = useState(''); 
  const [contextSubmit, setContextSubmit] = useState('');

  return (
    <submitContext.Provider value={[contextSubmit, setContextSubmit]}>
    <urlContext.Provider value={[contextUrl, setContextUrl]}>
    <div className="App">
     <Home/>
    </div>
    </urlContext.Provider>
    </submitContext.Provider>
  );
}

export default App;
