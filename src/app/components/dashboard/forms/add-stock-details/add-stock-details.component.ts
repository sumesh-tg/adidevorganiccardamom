import { Component, OnInit } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { StockDetailsModel } from 'src/app/models/stock-details-model';
import { StockDetailsService } from 'src/app/services/stock-details.service';
import { UploadFileToFireStorageService } from 'src/app/services/upload-file-to-fire-storage.service';
import { VendorUtils } from 'src/app/shared/util/VendorUtils';

@Component({
  selector: 'app-add-stock-details',
  templateUrl: './add-stock-details.component.html',
  styleUrls: ['./add-stock-details.component.scss']
})
export class AddStockDetailsComponent implements OnInit {

  loading = false;
  selectedAllChkBox: any;
  stockDetailsArray: StockDetailsModel[];
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

  public stockModel: StockDetailsModel = {
    id: VendorUtils.makeRandom(8),
    size: "",
    grade: "",
    price: "",
    stock: "",
    sold: "",
    created_date: new Date(),
    updated_date: null,
    created_by: "Admin",
    updated_by: "",
    status: 1
  }
  constructor(private stockService: StockDetailsService, private toastr: ToastrService, private uploadFileToFireStorageService: UploadFileToFireStorageService,
    private modalService: NgbModal, private router: Router) { }

  ngOnInit(): void {
    this.stockService.getStocks().subscribe(data => {
      console.log("Test data :: ", data);
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
      console.log("Firedata ::: ", this.stockDetailsArray);
    });
  }
  submitAddStockForm() {
    this.loading = true;
    if (this.stockModel.action === "edit") {
      this.stockService.updateStock(this.stockModel);
      this.toastr.success('Stock updated successfully!', 'Success');
      this.clearForm();
      this.loading = false;
      this.stockModel.action="";
    } else {
      this.stockService.createStock(this.stockModel).then(data => {
        this.toastr.success('Stock created successfully!', 'Success');
        this.clearForm();
        this.loading = false;
      });
    }
  }
  clearForm() {
    this.stockModel = {
      id: VendorUtils.makeRandom(8),
      size: "",
      grade: "",
      price: "",
      stock: "",
      sold: "",
      created_date: new Date(),
      updated_date: null,
      created_by: "Admin",
      updated_by: "",
      status: 1
    }
  }
  selectAllStocks() {

  }
  findStatus(stockId) {
    return stockId === "1" ? "Active" : "Deactivated";
  }
  deactivateStock(stockModel) {

  }
  deleteStock(stockModel) {

  }
  editStock(stockModel) {
    this.stockModel.action = "edit";
    this.stockModel = stockModel;
  }
  //Add document
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
}
