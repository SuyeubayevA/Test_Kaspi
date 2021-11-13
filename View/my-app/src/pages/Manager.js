import React,{Component} from 'react';
import {variables} from '../Variables.js';
import Order from '../components/Order.js';

export class Manager extends Component{

    constructor(props){
        super(props);

        this.state={
            orders:[],
            modalTitle:"",
            oneOrder:[]
        }
    }

    refreshList(){
        fetch(variables.API_URL+'orders')
        .then(response=>response.json())
        .then(data=>{
            this.setState({
                orders:data,
            });
        });
    }
    
    componentDidMount(){
        this.refreshList();
    }

    getOrderById(id){
        fetch(variables.API_URL+'orders/GetById',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({"Id": id})
        })
        .then(res=>res.json())
        .then((result)=>{
            this.setState({
                oneOrder:result,
            });
        },(error)=>{
            alert('Failed');
        })
    }



    updateClick(orderId){
        fetch(variables.API_URL+'orders/'+orderId,{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
    }

    deleteClick(id){
        if(window.confirm('Вы уверены?')){ 
        fetch(variables.API_URL+'orders/'+id,{
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
        }
    }

    render(){
        const {
            orders
        }=this.state;

        return(
            <div className='wrapper d-flex justify-content-between m-3'>
                
                <table className="table table-striped  row eighty">
                    <tbody>
                        <tr>
                            <th>ID заказа</th>
                            <th>Статус заказа</th>
                            <th>Адрес</th>
                            <th>Номер карты</th>
                            <th>Общее кол-во</th>
                            <th>Дата</th>
                            <th>Детали/Удаление/Финализация</th>
                        </tr>
                        {orders.map(ord=>
                            <tr key={ord.OrderId}>
                                <td>{ord.OrderId}</td>
                                <td>{ord.status}</td>
                                <td>{ord.address}</td>
                                <td>{ord.CartNumber}</td>
                                <td>{ord.Quantity}</td>
                                <td>{ord.orderDate}</td>
                                <td>
                                    <button type="button"
                                        className="btn btn-light mr-1"
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                        onClick={()=>this.getOrderById(ord.OrderId)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                        </svg>
                                    </button>

                                    <button type="button"
                                        className="btn btn-light mr-1"
                                        onClick={()=>this.deleteClick(ord.OrderId)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                        </svg>
                                    </button>

                                    <button type="button"
                                        className="btn btn-primary m-2 float-end"
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                        onClick={()=>this.updateClick(ord.OrderId)}>
                                            Выполнить
                                    </button>
                                </td>
                            </tr>
                            )}
                    </tbody>
                </table>

                <Order order={this.state.oneOrder}/>


            </div>
        )
    }
}