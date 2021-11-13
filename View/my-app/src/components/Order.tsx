import React from 'react';
import {PropsOrder} from '../interfaces/interfaces'

export const Order:React.FC<PropsOrder>=({order, message})=>{ 
    if(order.length !== 0){
        let sum=0;
        order.forEach(x=> sum+=x.commonPrice)
        return(
            <div className="card ml-3" style={{width: '18rem', borderRadius: '10px'}}>
                <div className="card-body" style={{backgroundColor: '#cfccc4', borderTopRightRadius: '10px', borderTopLeftRadius: '10px'}}>
                    <h5 className="card-title">Заказ</h5>
                    <p className="card-text">{order[0].OrderId}</p>
                    <p className="card-text">Адрес: {order[0].address}</p>
                    <p className="card-text">Номер карты {order[0].CartNumber}</p>
                </div>
                <ul className="list-group list-group-flush" style={{height: '300px', overflow: 'auto'}}>
                    {order.map(good=>
                        <li key = {good.Name} className="list-group-item">{good.Name}  - {good.Quantity}шт ({good.commonPrice}тг за всё)</li>
                    )}
                </ul>
                
                <div style={{height: '150px', fontWeight: 'bold'}} >
                    Дата заказа {order[0].orderDate}
                    <p >Статус: {order[0].status}</p><br/>
                    <p >Сумма к оплате:  {sum} тг</p>
                </div>

                <div className="card-body" style={{backgroundColor: '#cfccc4', height: '300px', overflow:'auto'}}>
                    Записи лога: {message}
                </div>
            </div>
        )
    }else{
        return(
            <div></div>
        )
    }
}