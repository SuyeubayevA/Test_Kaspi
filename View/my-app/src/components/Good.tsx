import {PropsGood} from '../interfaces/interfaces'

export const Good:React.FC<PropsGood>=({key, goodItem, updateData, deleteData, count})=>{
    const orderGood = {Id: goodItem.Id, Name: goodItem.Name, Price: goodItem.Price, qty: 1}
    return(
        <div className="card mt-3" style={{width: '18rem'}}>
            <img src={goodItem.ImgSrc} className="card-img-top" alt="GoodImg" style={{width: 'auto', height: '300px'}}/>
            <div className="card-body">
                <h5 className="card-title">{goodItem.Name}</h5>
                <p className="card-text">Стоимость: {goodItem.Price}</p>
            </div>
            <div className="d-flex justify-content-around">
                <button  className="btn btn-primary m-1 w-25" onClick={() => deleteData(orderGood)}>-</button >
                <button  className="btn btn-primary m-1 w-25" onClick={() => updateData(orderGood)}>+</button >
            </div>
        </div>
    )
}
