import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AngularFirestore } from '@angular/fire/firestore';
import { StockDetailsModel } from '../models/stock-details-model';

@Injectable({
  providedIn: 'root'
})
export class StockDetailsService {
  STOCK_COLLECTION_NAME = environment.stockCollectionName;
  constructor(private firestore: AngularFirestore) { }
  getStocks() {
    return this.firestore.collection(this.STOCK_COLLECTION_NAME, ref => ref
      .limit(30)
      .orderBy('created_date', 'desc')).snapshotChanges();
  }
  nextPage(lastInResponse) {
    return this.firestore.collection(this.STOCK_COLLECTION_NAME, ref => ref
      .limit(5)
      .orderBy('created_date', 'desc')
      .startAfter(lastInResponse)).snapshotChanges();
  }
  prevPage(firstInResponse, startAt) {
    return this.firestore.collection(this.STOCK_COLLECTION_NAME, ref => ref
      .limit(5)
      .orderBy('created_date', 'desc')
      .startAt(startAt)
      .endBefore(firstInResponse)).snapshotChanges();
  }
  createStock(stockModel: StockDetailsModel) {
    return this.firestore.collection(this.STOCK_COLLECTION_NAME).add(stockModel);
  }
  updateStock(stockModel: StockDetailsModel) {
    // delete stockModel.id;
    this.firestore.doc(this.STOCK_COLLECTION_NAME + '/' + stockModel.id).update(stockModel);
  }
  deleteStock(stockModel: StockDetailsModel) {
    // return this.firestore.collection('posts').doc(postModel.id).delete().then(function() {
    //   console.log("Document successfully deleted!");
    // })
    // .catch(function(error) {
    //   console.error("Error removing document: ", error);
    // });
    let deleteDoc = this.firestore.collection(this.STOCK_COLLECTION_NAME, ref => ref.where('id', '==', stockModel.id)).snapshotChanges().subscribe(data => {
      data.map(e => {
        this.firestore.collection(this.STOCK_COLLECTION_NAME).doc(e.payload.doc.id).delete().then(function () {
          console.log("deletedd");
        }).catch(function (err) {
          console.log("Error while deleting document", err);
        });
      });
    });
  }
  getStockById(id) {
    return this.firestore.collection(this.STOCK_COLLECTION_NAME, ref => ref.where('id', '==', id)).snapshotChanges();
  }
}
