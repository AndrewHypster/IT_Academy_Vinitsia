import Modal from "./modal";

function ModalFalse(errors) {
  return (
    <div className="modal-false">
      <Modal text="Оголошення провалило провірку" bg="#EBBEBE" type="false" errors={errors} />
    </div>
  );
}

export default ModalFalse;