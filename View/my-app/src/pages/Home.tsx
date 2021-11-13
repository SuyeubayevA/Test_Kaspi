import React,{useState, useEffect} from 'react';
import {Good} from '../components/Good';
import {Basket} from '../components/Basket';
import {variables} from '../Variables';
import './Home.css';
import {Modal} from '../components/Modal';
import {GoodItem, AddedGood, SendData} from '../interfaces/interfaces';

export const Home:React.FC =()=>{
    // constructor(props){
    //     super(props);
    //     this.state={
    //         goods:[],
    //         addedGoods:[],
    //         totalSum: 0,
    //         show:false,
    //         ClientAddress:"",
    //         CientCardNumber:"",
    //         LogMessage:""
    //     }
    // }
    const [goods, setGoods] = useState<GoodItem[]>([])
    const [addedGoods, setAddedGoods] = useState<AddedGood[]>([])
    const [totalSum, setTotalSum] = useState<number>(0)
    const [show, setShow] = useState<boolean>(false)
    const [clientAddress, setClientAddress] = useState<string>("")
    const [clientCardNumber, setClientCardNumber] = useState<string>("")
    const [LogMessage, setLogMessage] = useState<string>("")


    const refreshList =()=>{
        fetch(variables.API_URL+'goods')
        .then(response=>response.json())
        .then(data=>{
            setGoods(data);
        });
    }

    useEffect(()=>{
        refreshList();
    })

    const updateAddedGoods = (value: AddedGood) => { 
        if(addedGoods.filter(e => e.Id === value.Id).length > 0){
            const index = addedGoods.map(x => x.Id).indexOf(value.Id);
            let addedGoodsNew = [...addedGoods];
            let item = {...addedGoodsNew[index]};
            item.qty = item.qty+1;
            addedGoodsNew[index] = item;

            let totalSumNew = 0;
            addedGoodsNew.forEach(x => totalSumNew += x.qty*x.Price);

            setAddedGoods(addedGoodsNew)
            setTotalSum(totalSumNew)
            setLogMessage(LogMessage + "Добавил еще один " + value.Name + `стало (${item.qty}) общая сумма ${totalSumNew} \n <br>;`)
        }else{
            let totalSumNew = totalSum;
            setAddedGoods(prev=>[...prev, value]);
            setTotalSum(totalSumNew+value.Price);
            setLogMessage(LogMessage + "Добавил первый " + value.Name + ` общая сумма ${totalSumNew+value.Price} \n <br>;`)
        }
    }

    const deleteAddedGoods = (value:AddedGood) => { 
        if(addedGoods.filter(e => e.Id === value.Id).length > 0){ 
            const index = addedGoods.map(x => x.Id).indexOf(value.Id);
            let addedGoodsNew = [...addedGoods];
            let item = {...addedGoodsNew[index]}; 
            let totalSumNew = totalSum;
            if(item.qty-1 <= 0){ 
                addedGoodsNew = addedGoodsNew.filter(function( obj ) {
                    return obj.Id !== value.Id;
                });
                setAddedGoods(addedGoodsNew);
                setTotalSum(totalSumNew-value.Price);
                setLogMessage(LogMessage + "Удалил единственный " + value.Name + ` общая сумма ${totalSumNew-value.Price} \n <br>;`)
            }else{
                item.qty = item.qty-1;
                addedGoodsNew[index] = item; 
                setAddedGoods(addedGoodsNew);
                setTotalSum(totalSumNew-value.Price);
                setLogMessage(LogMessage + "Удалил " + value.Name + ` осталось(${item.qty}) общая сумма ${totalSumNew-value.Price} \n <br>;`)
            }
        }
    }

    const countSum = () => {
        let totalSum = 0;
        addedGoods.forEach(x => totalSum += x.qty*x.Price);
        setTotalSum(totalSum);
        setLogMessage(LogMessage + " Заказ сформировали. Заполнение личных данных <br>;")
    }

    const showModal = () => {
        setShow(true);
        setLogMessage(LogMessage + "Заполняет данные о клиенте <br>;")
      };
    
    const hideModal = () => {
        setShow(false);
        makeOrder();
    };

    const changeClientAddress =(e:any)=>{
        setClientAddress(e.target.value);
    }

    const changeClientCardNumber =(e:any)=>{
        setClientCardNumber(e.target.value);
    }

    const makeOrder=()=>{
        var sendDataArray:SendData[] = [];
        var sendData = {orders: sendDataArray, message:""}
        addedGoods.forEach(good => 
            sendDataArray.push({
                BusketId:0, 
                goodId:good.Id, 
                status: 'PROCEED', 
                address: clientAddress, 
                CartNumber: clientCardNumber, 
                Quantity: good.qty
                })
            )
        sendData = {
            orders: sendDataArray,
            message: LogMessage + "отправлен на обработку к менеджеру"
        }
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
            setAddedGoods([])
            setTotalSum(0)
            setShow(false)
            setLogMessage("")
            alert('Заказ на обработке у менеджера')
        })
    }
    
    return(
        <div>
            <div className="wrapper d-flex justify-content-between m-3">
                <div className="leftside d-flex justify-content-around row eighty">
                    {goods.map(good=>
                            <Good key = {good.Id} goodItem={good} updateData={updateAddedGoods} deleteData = {deleteAddedGoods} count={countSum} />
                        )}
                </div>
                <div className="rightside row twenty">
                    { <Basket addedItems = {addedGoods} total = {totalSum} showModal = {showModal}/> }
                </div>
            </div>

            <Modal 
                show={show} 
                handleClose={hideModal} 
                address = {clientAddress}
                cardNumber = {clientCardNumber}
                changeClientAddress = {changeClientAddress}
                changeClientCardNumber = {changeClientCardNumber}
            />

        </div>
    )
}


