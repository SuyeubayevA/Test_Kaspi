
function Modal({ handleClose, show ,changeClientAddress, changeClientCardNumber, cardNumber, address}){
    const showHideClassName = show ? "modal display-block" : "modal display-none";
  
    return (
      <div className={showHideClassName}>
        <section className="modal-main mb-2 p-10">
            <form>
            <div className="form-row  mb-2 p-10">
                <div className="form-group">
                    <label htmlFor="inputAddress">Адрес</label>
                    <input type="text" 
                            className="form-control" 
                            id="inputAddress" 
                            placeholder="Абая 134"
                            value={address}
                            onChange={changeClientAddress}
                            />
                </div>
                <div className="form-group">
                    <label htmlFor="inputCardnumber">Номер карточки</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="cardnumber" 
                        placeholder="1250 2235 2554 1256"
                        value={cardNumber}
                        onChange={changeClientCardNumber}
                        />
                </div>
                </div>
            </form>
          <button type="button" onClick={handleClose}>
            Оплатить
          </button>
        </section>
      </div>
    );
  };

  export default Modal;