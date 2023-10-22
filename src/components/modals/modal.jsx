import '../../styles/modal.sass'

function Modal(...props) {
  return (
    <div className="modal-bg">
      <div className={`Modal`} style={{background: props[0].bg}}>
        {
          props[0].type === 'true'?
          <h2>{props[0].text}</h2> :
          <>
            <h2>{props[0].text}</h2>
            <h3>Данні, які ви заповнили та ввели в описі неспівпадають, а саме:</h3>
            <div className="text">
              {props[0].errors.errors.join(', ')}
            </div>
          </>
        }
      </div>
    </div>
    
  );
}

export default Modal;