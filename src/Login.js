import React, { useState } from 'react';
import './App.css'; 
import axios from 'axios';

function Login({ onLogin }) {
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();
    await axios.post('http://localhost:3333/login',{
      data: {
        name: nome,
        key: senha,
      }
    })
    onLogin(nome);
  };

  return (
    <div className="login-title-container">
        <div>
          <h2>Sistema de Ponto Eletrônico</h2>
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
                  <option value="Junior">Junior</option>
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
              <button type="submit">Login</button>
            </form>
          </div>
       </div>
    </div>
  );
}

export default Login;