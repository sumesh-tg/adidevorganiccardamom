export class StockDetailsModel {
    id:string;
    size:string;
    grade:string;
    price:string;
    stock:string;
    sold:string;
    created_date:Date;
    updated_date:Date;
    created_by:string;
    updated_by:string;
    selected?:boolean;
    status:number;
    action?:string;
}
