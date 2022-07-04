import { Sender } from './../../shared/interfaces/message';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, Observable, Subject } from 'rxjs';
import { message } from 'src/app/shared/interfaces/message';

@Injectable({
  providedIn: 'root'
})
export class HomepageService {
  createMessage$: Subject<any> = new Subject<any>();
  loggedUser: any;
  lastSendedMessage!:message;
  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore, private http: HttpClient) {
    this.loggedUser = this.afAuth.currentUser.then((user) => {
      this.loggedUser = user
    })

  }
  //Create message in Firebase DB
  async createMessage(text: string, sender: 'Ai' | 'User') {
    let message: message = {
      text: text,
      timeStamp: new Date().getTime().toString(),
      sender: sender
    }
    return this.db.collection(`user_communication_stream`).doc(`${this.loggedUser?.uid}`).collection('messages').add(
      message
    ).then(()=>{
      this.lastSendedMessage = message;
    })
  }

//When one of the subroot paths of user_communication_stream does not exist it will be created dynamically.
  readData() {
    return this.db.collection("user_communication_stream").doc(`${this.loggedUser?.uid}`)
      .collection('messages').ref.orderBy('timeStamp', 'asc').get()
      .then((querySnapshot) => {
        let messages: any = [];
        querySnapshot.forEach((doc) => {
          messages.push(doc.data())
        });
        return messages;
      })

  }
//Send the message to WitAi Application
  sendToWitQuestion(message: string) {
    var reqHeader = new HttpHeaders({
      'Authorization': 'Bearer OJX6A22REVFXW6TPEMMXTH5GS3PML5OP'
    });
    let params = new HttpParams().set('q', message);
    params = params.append('v', '20220702')
    // return this.http.get<any>(this.ROOT_URL + 'enquiries', { params: params });
    return this.http.get<any[]>(`https://api.wit.ai/message`, { headers: reqHeader, params: params });
  }
}

