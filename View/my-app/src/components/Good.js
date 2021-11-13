function Good(props){
    const orderGood = {Id: props.goodItem.Id, Name: props.goodItem.Name, Price: props.goodItem.Price, qty: 1}
    return(
        <div className="card mt-3" style={{width: '18rem'}}>
            <img src={props.goodItem.ImgSrc} className="card-img-top" alt="GoodImg" style={{width: 'auto', height: '300px'}}/>
            <div className="card-body">
                <h5 className="card-title">{props.goodItem.Name}</h5>
                <p className="card-text">Стоимость: {props.goodItem.Price}</p>
            </div>
            <div className="d-flex justify-content-around">
                <button  href="#" className="btn btn-primary m-1 w-25" onClick={() => props.deleteData(orderGood)}>-</button >
                <button  href="#" className="btn btn-primary m-1 w-25" onClick={() => props.updateData(orderGood)}>+</button >
            </div>
        </div>
    )
}

export default Good;