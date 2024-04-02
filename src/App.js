import React, { useState } from 'react';
import './App.css';
import PontoEletronico from './pontoEletronico';
import Footer from './Footer';
import Login from './Login';

function App() {
  const [nome, setNome] = useState('');

  const handleLogin = (nome) => {
    setNome(nome);
  };

  const handleVoltarParaLogin = () => {
    setNome('');
  };

  return (
    <div className="App">
      {nome ? (
        <PontoEletronico nome={nome} onVoltarParaLogin={handleVoltarParaLogin}/>
      ) : (
        <Login onLogin={handleLogin}/>
      )}
      <Footer />
    </div>
  );
}

export default App;