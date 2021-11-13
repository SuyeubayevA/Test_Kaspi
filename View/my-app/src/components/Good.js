function Good(props){
    const orderGood = {Id: props.goodItem.Id, Name: props.goodItem.Name, Price: props.goodItem.Price, qty: 1}
    return(
        <div className="card mt-3" style={{width: '18rem'}}>
            <img src={props.goodItem.ImgSrc} className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{props.goodItem.Name}</h5>
                <p className="card-text">Стоимость: {props.goodItem.Price}</p>
                <button  href="#" className="btn btn-primary" onClick={() => props.deleteData(orderGood)}>Удалить</button >
                <button  href="#" className="btn btn-primary" onClick={() => props.updateData(orderGood)}>Добавить</button >
            </div>
        </div>
    )
}

export default Good;