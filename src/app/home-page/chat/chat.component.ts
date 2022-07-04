import { HomepageService } from './../../services/homepage/homepage.service';
import { AfterViewInit, Component, ElementRef, NgZone, OnInit, ViewChild, AfterViewChecked, Renderer2 } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { message } from 'src/app/shared/interfaces/message';
import { take, last, distinctUntilChanged, finalize, delay, switchMap, catchError } from 'rxjs/operators';
import { from, of } from 'rxjs';
import { WitAi } from 'src/app/shared/utils/witAi';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewInit {
  messages: message[] = [];
  userInput: string = '';
  @ViewChild('chatMessages') chatMessages!: ElementRef;
  constructor(public afAuth: AngularFireAuth, public hService: HomepageService, private witAi: WitAi) {

  }

  ngOnInit() {

    // Fetching from DB and have a small delay in order to give time for rendering and then scroll at the bottom
    from(this.hService.readData().then((response) => {
      this.messages = response;
    })).pipe(last(), delay(100)).subscribe(() => this.scrollTheChatToBottom())
  }
  ngAfterViewInit(): void {

    // Scroll Event Subscribe
    this.chatMessages.nativeElement.addEventListener('scroll', (event: any) => {
      var element = event.target;
      // console.log(element.scrollHeight, element.scrollTop, element.clientHeight);
      //Mocking Fetch
      // When the top of scroll is alsmost reached fetch the rest of the chat.The limit now is 50 messages
      if (element.scrollTop < 20) {
        this.messages.unshift({
          text: 'Mock data fetched',
          timeStamp: new Date().getTime().toString(),
          sender: 'Ai'
        })

      }

    });
  }

  scrollTheChatToBottom() {
    this.chatMessages.nativeElement.scrollTo({ top: this.chatMessages.nativeElement.scrollHeight });
  }
  //Steps
  // -Send message to firebase
  // -On success push it in messages(local)
  // -Send message to WitAi Application
  // -On success response evaluate it at WitAi.ts (local)
  // -On success push the response message in messages(local)
  //At the moment error handling is with interceptor globally
  sendMessageToWit() {
    if (this.userInput === '') {
      return;
    }
    let userInputText = this.userInput;
    this.userInput = '';
    this.hService.createMessage(userInputText, 'User').then(
      () => {
        this.messages.push(this.hService.lastSendedMessage)

        this.hService.sendToWitQuestion(userInputText).subscribe((res) => {
          this.witAi.witAiMessageEvaluation(res).subscribe((message) => {
            this.hService.createMessage(message, 'Ai').then(() => this.messages.push(this.hService.lastSendedMessage));
            of(1).pipe(delay(200)).subscribe(() => this.scrollTheChatToBottom())
          })
        })
      }

    )
  }

  // Another approach using switchMap
  // this.hService.sendToWitQuestion(this.userInput).pipe(switchMap(
  //   (res) =>  {
  //     console.log(res)
  //     return this.witAi.witAiMessageEvaluation(res).pipe(
  //     switchMap(
  //       (res2) => {console.log(res2) ;return res2}
  //     )
  //   )}
  // )
  // ).subscribe((res2) => console.log(res2))

}
