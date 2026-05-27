function Modal({ isOpen, isClose, inputValue, setInputValue, onSave }) {
  if (isOpen) return false;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Enter Your Details</h3>

        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type something here..."
          className="modal-input"
        />

        <div className="modal-actions">
          <button onClick={onClose} className="btn-secondary">
            Cancel
          </button>
          <button onClick={onSave} className="btn-primary">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;