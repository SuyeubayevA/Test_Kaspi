export interface GoodItem {
    Id: number;
    Name: string;
    ImgSrc: string;
    Price: number;
  }
export interface AddedGood {
    Id: number, 
    Name: string, 
    Price: number, 
    qty: number
}
export interface SendData {
    BusketId:number, 
    goodId:number, 
    status: string, 
    address: string, 
    CartNumber: string, 
    Quantity: number
  }

export  interface MyState { 
    goods:GoodItem[],
    addedGoods:AddedGood[],
    totalSum: number,
    show: boolean,
    ClientAddress: string,
    CientCardNumber: string
}

export interface Orders {
    OrderId: string;
    status: boolean;
    address: string;
    CartNumber: string;
    Quantity: number;
    orderDate: string;
  }
export interface OneOrder {
    OrderId: string, 
    status: boolean, 
    address: string, 
    CartNumber: string,
    Name: string,
    Quantity: number,
    commonPrice: number,
    orderDate: string,
    logmessage: string,
}

export interface PropsModal{
    handleClose:()=>void;
    show: boolean;
    changeClientAddress:(e:any)=>void;
    changeClientCardNumber:(e:any)=>void;
    cardNumber:string;
    address: string;
}

export interface PropsGood{
    key:number;
    goodItem: GoodItem;
    updateData:(value: AddedGood)=>void;
    deleteData:(value: AddedGood)=>void;
    count:()=>void;
}

export interface PropsBasket{
    addedItems: AddedGood[];
    total: number;
    showModal: ()=>void;
}

export interface PropsOrder{
    order: OneOrder[];
    message: string;
}