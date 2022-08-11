import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { QualityReportModel } from '../models/quality-report-model';

@Injectable({
  providedIn: 'root'
})
export class QualityReportService {

  QUALITY_REPORT_COLLECTION_NAME = environment.qualityReportCollectionName;
  constructor(private firestore: AngularFirestore) { }
  getReports() {
    return this.firestore.collection(this.QUALITY_REPORT_COLLECTION_NAME, ref => ref
      .limit(30)
      .orderBy('created_date', 'desc')).snapshotChanges();
  }
  nextPage(lastInResponse) {
    return this.firestore.collection(this.QUALITY_REPORT_COLLECTION_NAME, ref => ref
      .limit(5)
      .orderBy('created_date', 'desc')
      .startAfter(lastInResponse)).snapshotChanges();
  }
  prevPage(firstInResponse, startAt) {
    return this.firestore.collection(this.QUALITY_REPORT_COLLECTION_NAME, ref => ref
      .limit(5)
      .orderBy('created_date', 'desc')
      .startAt(startAt)
      .endBefore(firstInResponse)).snapshotChanges();
  }
  createReport(reportModel: QualityReportModel) {
    return this.firestore.collection(this.QUALITY_REPORT_COLLECTION_NAME).add(reportModel);
  }
  updateReport(reportModel: QualityReportModel) {
    this.firestore.doc(this.QUALITY_REPORT_COLLECTION_NAME + "/" + reportModel.doc_id).update(reportModel);
  }
  deleteReport(reportModel: QualityReportModel) {
    let deleteDoc = this.firestore.collection(this.QUALITY_REPORT_COLLECTION_NAME, ref => ref.where('id', '==', reportModel.id)).snapshotChanges().subscribe(data => {
      data.map(e => {
        this.firestore.collection(this.QUALITY_REPORT_COLLECTION_NAME).doc(e.payload.doc.id).delete().then(function () {
          console.log("deletedd");
        }).catch(function (err) {
          console.log("Error while deleting document", err);
        });
      });
    });
  }
  getReportById(id) {
    return this.firestore.collection(this.QUALITY_REPORT_COLLECTION_NAME, ref => ref.where('id', '==', id)).snapshotChanges();
  }
}
