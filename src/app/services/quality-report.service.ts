import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { QualityReportModel } from '../models/quality-report-model';

@Injectable({
  providedIn: 'root'
})
export class QualityReportService {

  POST_COLLECTION_NAME = environment.stockCollectionName;
  constructor(private firestore: AngularFirestore) { }
  getReports() {
    return this.firestore.collection(this.POST_COLLECTION_NAME, ref => ref
      .limit(5)
      .orderBy('createdDate', 'desc')).snapshotChanges();
  }
  nextPage(lastInResponse) {
    return this.firestore.collection(this.POST_COLLECTION_NAME, ref => ref
      .limit(5)
      .orderBy('createdDate', 'desc')
      .startAfter(lastInResponse)).snapshotChanges();
  }
  prevPage(firstInResponse, startAt) {
    return this.firestore.collection(this.POST_COLLECTION_NAME, ref => ref
      .limit(5)
      .orderBy('createdDate', 'desc')
      .startAt(startAt)
      .endBefore(firstInResponse)).snapshotChanges();
  }
  createReport(reportModel: QualityReportModel) {
    return this.firestore.collection(this.POST_COLLECTION_NAME).add(reportModel);
  }
  updateReport(reportModel: QualityReportModel) {
    delete reportModel.report_id;
    this.firestore.doc(this.POST_COLLECTION_NAME + '/' + reportModel.report_id).update(reportModel);
  }
  deleteReport(reportModel: QualityReportModel) {
    let deleteDoc = this.firestore.collection(this.POST_COLLECTION_NAME, ref => ref.where('id', '==', reportModel.report_id)).snapshotChanges().subscribe(data => {
      data.map(e => {
        this.firestore.collection(this.POST_COLLECTION_NAME).doc(e.payload.doc.id).delete().then(function () {
          console.log("deletedd");
        }).catch(function (err) {
          console.log("Error while deleting document", err);
        });
      });
    });
  }
  getReportById(id) {
    return this.firestore.collection(this.POST_COLLECTION_NAME, ref => ref.where('id', '==', id)).snapshotChanges();
  }
}
