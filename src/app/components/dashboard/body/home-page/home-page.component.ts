import { Component, OnInit } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { StockDetailsModel } from 'src/app/models/stock-details-model';
import { StockDetailsService } from 'src/app/services/stock-details.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  loading = false;
  selectedAllChkBox: any;
  stockDetailsArray: StockDetailsModel[];
  activeStockDetailsArray: StockDetailsModel[];
  config: any;
  html: SafeHtml;
  //Save first document in snapshot of items received
  firstInResponse: any = [];

  //Save last document in snapshot of items received
  lastInResponse: any = [];

  //Keep the array of first document of previous pages
  prev_strt_at: any = [];

  //Maintain the count of clicks on Next Prev button
  pagination_clicked_count = 0;

  //Disable next and prev buttons
  disable_next: boolean = false;
  disable_prev: boolean = false;

  enableStockSection:boolean=false;
  randColor:string="bg-primary";

  constructor(private stockService: StockDetailsService) { }

  ngOnInit(): void {
    this.stockService.getStocks().subscribe(data => {
      this.firstInResponse = data[0].payload.doc;
      this.lastInResponse = data[data.length - 1].payload.doc;
      this.prev_strt_at = [];
      this.pagination_clicked_count = 0;
      this.disable_next = false;
      this.disable_prev = false;
      this.push_prev_startAt(this.firstInResponse);
      this.stockDetailsArray = data.map(e => {
        const data = e.payload.doc.data();
        let id = e.payload.doc.id;
        return { id, ...(data as Object) } as StockDetailsModel;
      });
      console.log("Firedata Homepage ::: ", this.stockDetailsArray);
      if (this.stockDetailsArray.length > 0) {
        this.activeStockDetailsArray = this.stockDetailsArray.filter(stock => {
          if (stock.status === 1) {
            return stock;
          }
        });
        console.log("Firedata Homepage ::: ", this.activeStockDetailsArray);
        if(this.activeStockDetailsArray.length>0){
          this.enableStockSection=true;
        }
      }
    });
  }
  push_prev_startAt(prev_first_doc) {
    this.prev_strt_at.push(prev_first_doc);
  }
  //Remove not required document 
  pop_prev_startAt(prev_first_doc) {
    this.prev_strt_at.forEach(element => {
      if (prev_first_doc.data().id == element.data().id) {
        element = null;
      }
    });
  }

  //Return the Doc rem where previous page will startAt
  get_prev_startAt() {
    if (this.prev_strt_at.length > (this.pagination_clicked_count + 1))
      this.prev_strt_at.splice(this.prev_strt_at.length - 2, this.prev_strt_at.length - 1);
    return this.prev_strt_at[this.pagination_clicked_count - 1];
  }

  chooseBackgroundColor(){
    var colors = ["bg-primary","bg-danger","bg-dark","bg-sky-blue","bg-red","bg-yellow","bg-pink","bg-dark-pink"];
    this.randColor = colors[Math.floor(Math.random() * colors.length)];
    return this.randColor;
  }

}
