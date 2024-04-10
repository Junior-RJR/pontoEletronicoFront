import React, { useState } from 'react';
import './App.css'; 
import axios from 'axios';

function Login({ onLogin }) {
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      await axios.post('https://pontoeletronicobackend.onrender.com/login',{
        data: {
          name: nome,
          key: senha,
        }
      })
      onLogin(nome);
    } catch (error) {
      setMensagem('Senha Incorreta')
    }
  };

  return (
    <div className="login-title-container">
        <div>
          <h2 className="Titulo-Principal">Sistema de Ponto Eletrônico</h2>
          <h1 className="Titulo-Principal">FernandoCar</h1>
          <div className="borda">
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label htmlFor="nome">Nome:</label>
                <select id="nome" value={nome} onChange={(e) => setNome(e.target.value)} required>
                  <option value="">Selecione...</option>
                  <option value="Fernando">Fernando</option>
                  <option value="Wellington">Wellington</option>
                  <option value="Jonathan">Jonathan</option>
                  <option value="Felipe">Felipe</option>
                  <option value="Rebeca">Rebeca</option>
                  <option value="Junior">Junior</option>     cz
                  <option value="admin">admin</option>
                </select>
              </div>
              <div className="input-group">
                <label htmlFor="senha">Senha:</label>
                <input type="password" id="senha" value={senha} onChange={(e) => setSenha(e.target.value)} required />
              </div>
              {mensagem && (
                <div className="mensagem-erro">
                  <p className="mensagem-erro-texto">{mensagem}</p>
                </div>
              )}
              <button type="submit" className="Login-entrar">Login</button>
            </form>
          </div>
       </div>
          <div class="logo-container">
            <img src="images/logoFernandoCar.jpg" alt="Logo da Empresa"/>
          </div>
    </div>
  );
}

export default Login;