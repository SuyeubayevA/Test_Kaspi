function Basket(props){
    return(
        <div key={0} className="card mt-3 " style={{width: '18rem', height: '800px'}}>
            <img src="https://images.dunelm.com/30211531.jpg?$standardplayerdefault$&img404=noimagedefault" className="card-img-top" alt="Корзина" />
            <div className="card-body">
                <h5 className="card-title">Корзина</h5>
                <p className="card-text">После оплаты заказа ждите подтверждения менеджера <br/> {props.total} тг</p>
            
            <ul className="list-group list-group-flush" style={{ height: '300px', overflow: 'auto'}}>
                {props.addedItems.map(good=>
                    <li key = {good.Id} className="list-group-item">{good.Name}  - {good.qty}шт</li>
                )}
            </ul>
            </div>
            {(props.addedItems.length > 0)?
            <div className="card-body">
                <button className="card-link btn btn-light btn-outline-primary" onClick={props.showModal}>Оплатить</button>
            </div>
            :<br/>}

        </div>
    )
}

export default Basket;