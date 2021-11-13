import React,{Component} from 'react';
import Good from '../components/Good';
import Basket from '../components/Basket';
import {variables} from '../Variables.js';
import './Home.css';
import Modal from '../components/Modal';


export class Home extends Component{
    constructor(props){
        super(props);
        this.state={
            goods:[],
            addedGoods:[],
            totalSum: 0,
            show:false,
            ClientAddress:"",
            CientCardNumber:""
        }
    }

    refreshList(){
        fetch(variables.API_URL+'goods')
        .then(response=>response.json())
        .then(data=>{
            this.setState({goods:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    updateAddedGoods = (value) => { 
        if(this.state.addedGoods.filter(e => e.Id === value.Id).length > 0){
            const index = this.state.addedGoods.map(x => x.Id).indexOf(value.Id);
            let addedGoodsNew = [...this.state.addedGoods];
            let item = {...addedGoodsNew[index]};
            item.qty = item.qty+1;
            addedGoodsNew[index] = item;

            let totalSumNew = 0;
            addedGoodsNew.forEach(x => totalSumNew += x.qty*x.Price);
            
            this.setState({
                    addedGoods: addedGoodsNew,
                    totalSum: totalSumNew
                });
        }else{
            let totalSumNew = this.state.totalSum;
            this.setState(prevState => ({
                addedGoods: [...prevState.addedGoods, value],
                totalSum: totalSumNew+value.Price
              }))
        }
    }

    deleteAddedGoods = (value) => { 
        if(this.state.addedGoods.filter(e => e.Id === value.Id).length > 0){ 
            const index = this.state.addedGoods.map(x => x.Id).indexOf(value.Id);
            let addedGoods = [...this.state.addedGoods];
            let item = {...addedGoods[index]}; 
            let totalSumNew = this.state.totalSum;
            if(item.qty-1 <= 0){ 
                addedGoods = addedGoods.filter(function( obj ) {
                    return obj.Id !== value.Id;
                });
                this.setState({
                    addedGoods: addedGoods,
                    totalSum: totalSumNew-value.Price
                });
            }else{
                item.qty = item.qty-1;
                addedGoods[index] = item; 
                this.setState({
                    addedGoods: addedGoods,
                    totalSum: totalSumNew-value.Price
                });
            }  
        }
    }

    countSum = () => {
        let totalSum = 0;
        this.state.addedGoods.forEach(x => totalSum += x.qty*x.Price);
        this.setState({totalSum});
    }

    showModal = () => {
        this.setState({ show: true });
      };
    
    hideModal = () => {
        this.setState({ show: false });
        this.makeOrder();
    };

    changeClientAddress =(e)=>{
        this.setState({ClientAddress:e.target.value});
    }

    changeClientCardNumber =(e)=>{
        this.setState({CientCardNumber:e.target.value});
    }

    makeOrder=()=>{
        var sendData = [];
        this.state.addedGoods.forEach(good => 
            sendData.push({
                BusketId:0, 
                goodId:good.Id, 
                status: 'PROCEED', 
                address: this.state.ClientAddress, 
                CartNumber: this.state.CientCardNumber, 
                Quantity: good.qty
            })
            )
        fetch(variables.API_URL+'orders',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(sendData)
        })
        .then(res=>res.json())
        .then(data=>{
            this.setState({addedGoods:[]});
        })
    }
    

    render(){
        const {
            goods,
            addedGoods,
            totalSum
        }=this.state;

        return(
            <div>
                <div className="wrapper d-flex justify-content-between m-3">
                    <div className="leftside d-flex justify-content-around row eighty">
                        {goods.map(good=>
                                <Good key = {good.Id} goodItem={good} updateData={this.updateAddedGoods} deleteData = {this.deleteAddedGoods} count={this.countSum} />
                            )}
                    </div>
                    <div className="rightside row twenty">
                        { <Basket addedItems = {addedGoods} total = {totalSum} showModal = {this.showModal}/> }
                    </div>
                </div>

                <Modal 
                    show={this.state.show} 
                    handleClose={this.hideModal} 
                    address = {this.ClientAddress}
                    cardNumber = {this.CientCardNumber}
                    changeClientAddress = {this.changeClientAddress}
                    changeClientCardNumber = {this.changeClientCardNumber}
                />

            </div>
        )
    }
}


