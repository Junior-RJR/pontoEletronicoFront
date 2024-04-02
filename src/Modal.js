function Modal({ titulo, conteudo, onConfirmar, onCancelar }) {
    const handleConfirmar = async() => {
      await onConfirmar();
    };
  
    const handleCancelar = () => {
      onCancelar();
    };
  
    return (
      <div className="modal">
        <div className="modal-content">
          <h3>{titulo}</h3>
          <p>{conteudo}</p>
          <div className="modal-buttons">
            <button onClick={handleConfirmar}>Sim</button>
            <button onClick={handleCancelar}>Não</button>
          </div>
        </div>
      </div>
    );
  }
  
  export default Modal;