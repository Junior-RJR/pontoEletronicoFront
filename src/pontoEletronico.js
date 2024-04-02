import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import axios from 'axios';

function PontoEletronico({ nome, onVoltarParaLogin }) {
  const [tipoPonto, setTipoPonto] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [exibirModal, setExibirModal] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [horario, setHorario] = useState('');
  const [registroEnviado, setRegistroEnviado] = useState(false);
  const [horaAtual, setHoraAtual] = useState('');

  useEffect(() => {
    const timerID = setInterval(() => {
      const horaAtual = new Date().toLocaleTimeString('pt-BR');
      setHoraAtual(horaAtual);
    }, 1000);

    return () => clearInterval(timerID);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviado(true);
    setHorario(new Date().toLocaleTimeString('pt-BR'));
    setExibirModal(true);
  };

  const handleConfirmarEnvio = async() => {
    await axios.post('http://localhost:3333/registro',{
      data: {
        name: nome,
        typePoint: tipoPonto,
        time: new Date(horario)
      }
    })
    setExibirModal(false);
    setMensagem('Registro enviado com sucesso!');
    setTimeout(() => {
      setMensagem('');
      setTipoPonto('');
      setEnviado(false);
      setRegistroEnviado(true);
    }, 500);

    console.log('Dados enviados:', { nome, tipoPonto, horario });
  };

  const handleCancelarEnvio = () => {
    setExibirModal(false);
    setEnviado(false);
    setMensagem('');
    setHorario('');
  };

  const handleVoltar = () => {
    onVoltarParaLogin();
    setTipoPonto('');
    setMensagem('');
    setExibirModal(false);
    setEnviado(false);
    setRegistroEnviado(false);
  };

  return (
    <div className="ponto-eletronico-form">
      <form onSubmit={handleSubmit}>
        <div className="ponto-eletronico-container">
          <h2>Sistema de Ponto Eletrônico</h2>
          {!enviado && !registroEnviado && (
            <div className="relogio">
              <p>{horaAtual}</p>
            </div>
          )}
          {!enviado && !registroEnviado && (
            <div className="borda">
              <div className="input-group">
                <label htmlFor="nome">Nome:</label>
                <p>{nome}</p>
              </div>
              <div className="input-group">
                <label htmlFor="tipoPonto">Tipo de Ponto:</label>
                <select id="tipoPonto" value={tipoPonto} onChange={(e) => setTipoPonto(e.target.value)} required>
                  <option value="">Selecione...</option>
                  <option value="entrada">Entrada</option>
                  <option value="saidaAlmoco">Saída Almoço</option>
                  <option value="retornoAlmoco">Retorno Almoço</option>
                  <option value="saida">Saída</option>
                </select>
              </div>
              <button type="submit">Salvar Registro</button>
            </div>
          )}
          {enviado && !registroEnviado && (
            <div className="borda enviado">
              <div className="mensagem-enviado">
                <p>Nome: {nome}</p>
                <p>Tipo de Ponto: {tipoPonto}</p>
                <p>Horário: {horario}</p>
              </div>
            </div>
          )}
          {registroEnviado && (
            <div className="borda">
              <p>REGISTRO ENVIADO</p>
              <button onClick={handleVoltar}>Voltar</button>
            </div>
          )}
        </div>
      </form>
      {exibirModal && (
        <div className="modal-overlay">
          <Modal
            titulo="Confirmar envio?"
            onConfirmar={handleConfirmarEnvio}
            onCancelar={handleCancelarEnvio}
          />
        </div>
      )}
    </div>
  );
}

export default PontoEletronico;