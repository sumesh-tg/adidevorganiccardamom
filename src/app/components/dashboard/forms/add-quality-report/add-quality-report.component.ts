import { Component, OnInit } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { QualityReportModel } from 'src/app/models/quality-report-model';
import { QualityReportService } from 'src/app/services/quality-report.service';
import { UploadFileToFireStorageService } from 'src/app/services/upload-file-to-fire-storage.service';
import { VendorUtils } from 'src/app/shared/util/VendorUtils';

@Component({
  selector: 'app-add-quality-report',
  templateUrl: './add-quality-report.component.html',
  styleUrls: ['./add-quality-report.component.scss']
})
export class AddQualityReportComponent implements OnInit {

  loading = false;
  selectedAllChkBox: any;
  qualityReportsArray: QualityReportModel[];
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

  reportImage:any=null;

  public qualityReportModel: QualityReportModel = {
    id: VendorUtils.makeRandom(8),
    created_by: "Admin",
    created_date: new Date(),
    report_img_url: "",
    report_txt: "",
    updated_by: "Admin",
    updated_date: "",
    description:"",
    lab_address:"",
    laboratary_name:"",
    status:1
  }

  constructor(private qualityReportService: QualityReportService, private toastr: ToastrService, private uploadFileToFireStorageService: UploadFileToFireStorageService,
    private modalService: NgbModal, private router: Router) { }

  ngOnInit(): void {
    this.qualityReportService.getReports().subscribe(data => {
      console.log("Test data :: ", data);
      this.firstInResponse = data[0].payload.doc;
      this.lastInResponse = data[data.length - 1].payload.doc;
      this.prev_strt_at = [];
      this.pagination_clicked_count = 0;
      this.disable_next = false;
      this.disable_prev = false;
      this.push_prev_startAt(this.firstInResponse);
      this.qualityReportsArray = data.map(e => {
        const data = e.payload.doc.data();
        let id = e.payload.doc.id;
        data['doc_id'] = id;
        return { id, ...(data as Object) } as QualityReportModel;
      });
      console.log("Firedata ::: ", this.qualityReportsArray);
    });
  }
  submitQualityForm() {
    this.loading = true;
    this.qualityReportModel.updated_date=new Date();
    if (this.qualityReportModel.action == "edit") {
      this.uploadFileToFireStorageService.uploadFileToFireStorage(this.reportImage).then(url => {
        this.qualityReportModel.report_img_url = "" + url;
        this.qualityReportService.updateReport(this.qualityReportModel);
        this.toastr.success('Report updated successfully!', 'Success');
        this.clearForm();
        this.loading = false;
        this.qualityReportModel.action="";
      });
    } else {
      this.uploadFileToFireStorageService.uploadFileToFireStorage(this.reportImage).then(url => {
        this.qualityReportModel.report_img_url = "" + url;
        this.qualityReportService.createReport(this.qualityReportModel)
        this.toastr.success('Report created successfully!', 'Success');
        this.clearForm();
        this.loading = false;
      });
    }
  }
  handleFileInput(files: FileList) {
    this.reportImage = files.item(0);
  }
  clearForm() {
    this.qualityReportModel = {
      id: VendorUtils.makeRandom(8),
      created_by: "Admin",
      created_date: new Date(),
      report_img_url: "",
      report_txt: "",
      updated_by: "Admin",
      updated_date: "",
      description:"",
      lab_address:"",
      laboratary_name:"",
      status:1
    }
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
  selectAllReports() {

  }
  deactivateReport(qualityReportModel) {
    let msg = "";
    if (qualityReportModel.status === 0) {
      qualityReportModel.status = 1;
      msg = "Stock activated successfully!";
    } else {
      qualityReportModel.status = 0;
      msg = "Stock deactivated successfully!";
    }
    this.qualityReportService.updateReport(qualityReportModel);
    this.toastr.success(msg, 'Success');
  }
  editReport(reportModel) {
    this.qualityReportModel = reportModel;
    this.qualityReportModel.action = "edit";
  }
  deleteReport(qualityReportModel) {
    this.qualityReportService.deleteReport(qualityReportModel);
    this.toastr.success('Report deleted successfully!', 'Success');
  }
}
