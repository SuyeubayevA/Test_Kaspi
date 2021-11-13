function Order(props){
    if(props.order.length !== 0){
        let sum=0;
        props.order.forEach(x=> sum+=x.commonPrice)
        return(
            <div key={0} className="card mt-3" style={{width: '18rem'}}>
                <img src="..." className="card-img-top" alt="basket" />
                <div className="card-body">
                    <h5 className="card-title">Заказ</h5>
                    <p className="card-text">{props.order[0].OrderId}</p>
                    <p className="card-text">Адрес: {props.order[0].address}</p>
                    <p className="card-text">Номер карты {props.order[0].CartNumber}</p>
                </div>
                <ul className="list-group list-group-flush">
                    {props.order.map(good=>
                        <li key = {good.Name} className="list-group-item">{good.Name}  - {good.Quantity}шт ({good.commonPrice})</li>
                    )}
                </ul>
                
                <div className="card-body">
                    Дата заказа {props.order[0].orderDate}
                    <p className="card-text">Статус: {props.order[0].status}</p>
                </div>
                <div className="card-body">
                    Сумма к оплате: {sum} тг
                </div>
            </div>
        )
    }else{
        return(
            <div></div>
        )
    }
}

export default Order;