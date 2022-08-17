import { Component, OnInit } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { QualityReportModel } from 'src/app/models/quality-report-model';
import { QualityReportService } from 'src/app/services/quality-report.service';

@Component({
  selector: 'app-quality-report',
  templateUrl: './quality-report.component.html',
  styleUrls: ['./quality-report.component.scss']
})
export class QualityReportComponent implements OnInit {

  
  loading = false;
  selectedAllChkBox: any;
  qualityReportsArray: QualityReportModel[];
  qualityReportModel: QualityReportModel;
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
  
  enableQualitySection: boolean = false;
  randColor: string = "bg-primary";

  constructor( private qualityReportService: QualityReportService) { }

  ngOnInit(): void {
    //Load quality report details

    this.qualityReportService.getReports().subscribe(data=>{
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
        return { id, ...(data as Object) } as QualityReportModel;
      });
      console.log("Reports Data Homepage ::: ", this.qualityReportsArray);
      if (this.qualityReportsArray.length > 0) {
        this.qualityReportsArray = this.qualityReportsArray.filter(report => {
          if (report.status === 1) {
            return report;
          }
        });
        console.log("Filtered report Homepage ::: ", this.qualityReportsArray);
        if(this.qualityReportsArray.length>0){
          this.enableQualitySection=true;
          this.qualityReportModel=this.qualityReportsArray[0];
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

}
