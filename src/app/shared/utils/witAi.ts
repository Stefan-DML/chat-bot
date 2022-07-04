import { from, Observable, of, Subject } from 'rxjs';
import { HomepageService } from './../../services/homepage/homepage.service';
import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class WitAi {

constructor(private afAuth: AngularFireAuth,private homeService:HomepageService){

}

 witAiMessageEvaluation(witAiResponse?: any): Observable<string> {
    let messageToReturn = '';
    if (Object.keys(witAiResponse.traits).length > 0) {
      let traitsSanitized = []
      for (let trait in witAiResponse.traits) {
        traitsSanitized.push({ ...witAiResponse.traits[trait][0], traitName: trait })
      }
      traitsSanitized = traitsSanitized.sort(this.compareConfidence)
      let userFirstName = this.homeService.loggedUser.displayName.slice(0,this.homeService.loggedUser.displayName.indexOf(' '));
      switch (traitsSanitized[0].traitName) {
        case 'wit$bye':
          messageToReturn = 'Fare well ' + userFirstName+' !!';
          break;
        case 'wit$greetings':
          messageToReturn = 'Hello ' + userFirstName +' 🙂'+',how can help you?';
          break;
        case 'wit$thanks':
          messageToReturn = 'Happy to help ' + userFirstName +' 🙂'+'!';
          break;
      }
    }else{
      messageToReturn = 'Some times I dont understand humans...'
    }
    return of(messageToReturn);

  }
 compareConfidence(a: any, b: any) {
    return b.confidence - a.confidence;
  }
}
