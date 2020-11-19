import { Component, OnInit, ViewChildren } from '@angular/core';
import { ElementRef, QueryList} from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { map, switchMap, delay } from "rxjs/operators";
import { ObservableInput, Observable, of } from "rxjs";

import { CardState } from '@src/app/custom-types/enums/card-state';
import { CardID } from '@src/app/custom-types/types/card-id';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  @ViewChildren('gameCards', {read: ElementRef}) cardElements: QueryList<ElementRef>;

  round:string;
  errorMessage:string;

  selectedCards: CardID[] = [];
  loadingTime: number = 2000;

  cards = [
    {'id':"1","image":"dog.png","state":CardState.FaceDown},
    {'id':'2',"image":"cat.png","state":CardState.FaceDown},
    {'id':'3',"image":"horse.png","state":CardState.FaceDown},    
    {'id':"4","image":"chicken.png","state":CardState.FaceDown},
    {'id':'5',"image":"salmon.png","state":CardState.FaceDown},
    {'id':'6',"image":"eagle.png","state":CardState.FaceDown},
    {'id':"7","image":"crow.png","state":CardState.FaceDown},
    {'id':'8',"image":"seagull.png","state":CardState.FaceDown},
    {'id':'9',"image":"goat.png","state":CardState.FaceDown},
    {'id':"10","image":"pig.png","state":CardState.FaceDown},
    {'id':'11',"image":"moose.png","state":CardState.FaceDown},
    {'id':'12',"image":"deer.png","state":CardState.FaceDown},
    {'id':"1","image":"dog.png","state":CardState.FaceDown},
    {'id':'2',"image":"cat.png","state":CardState.FaceDown},
    {'id':'3',"image":"horse.png","state":CardState.FaceDown},    
    {'id':"4","image":"chicken.png","state":CardState.FaceDown},
    {'id':'5',"image":"salmon.png","state":CardState.FaceDown},
    {'id':'6',"image":"eagle.png","state":CardState.FaceDown},
    {'id':"7","image":"crow.png","state":CardState.FaceDown},
    {'id':'8',"image":"seagull.png","state":CardState.FaceDown},
    {'id':'9',"image":"goat.png","state":CardState.FaceDown},
    {'id':"10","image":"pig.png","state":CardState.FaceDown},
    {'id':'11',"image":"moose.png","state":CardState.FaceDown},
    {'id':'12',"image":"deer.png","state":CardState.FaceDown}
  ]

  constructor(private route: ActivatedRoute) { 
    this.route.params
    .pipe(map(params=>params['id']))
    .pipe(switchMap((id:string):ObservableInput<any>=>{
      return id;
    }))
    .subscribe((data:string)=>{
      this.round = data;
    });
   }

  ngOnInit(): void {
  }

  onCardClick(cardIDs: CardID): void{
    let uid: string = cardIDs['uniqueElementID'];
    let cid: string = cardIDs['cardID'];
    this.cards[uid].state=CardState.FaceUp;
    console.log(`You clicked card ${uid} which is of type ${cid}.`);

    let l = this.selectedCards.length;
    if(l > 1) return;
    this.selectedCards.push(cardIDs);
    if(l === 0) return;
    
    // l === 1 (length now === 2)
    try {
      this.checkForMatch()
    } catch (error) {
      this.errorMessage = error;
    }
  }

  checkForMatch(){
    if(!(this.selectedCards.length === 2)) throw new Error("Invalid number of cards to compare. checkForMatch requires an array of length 2.");
    let cardOneIDs = this.selectedCards.pop();
    let cardTwoIDs = this.selectedCards.pop();
    if(cardOneIDs['cardID'] === cardTwoIDs['cardID']) return this.handleMatch(cardOneIDs['uniqueElementID'],cardTwoIDs['uniqueElementID']);
    return this.resetCards(cardOneIDs['uniqueElementID'],cardTwoIDs['uniqueElementID']);
  }

  handleMatch(c1:string,c2:string){
    console.log("MATCH!");
    console.log(this.cardElements);
    this.updateCardState(c1,CardState.Hidden);
    this.updateCardState(c2,CardState.Hidden);
  }

  resetCards(c1: string,c2:string){
    console.log(`RESETTING CARDS: ${c1} and ${c2}`);
    this.updateCardState(c1,CardState.FaceDown);
    this.updateCardState(c2,CardState.FaceDown);
  }

  cardStateDelay(newState:CardState): Observable<CardState>{
    return of(newState).pipe(delay(this.loadingTime));
  }

  updateCardState(uid:string,newState:CardState){
    this.cardStateDelay(newState).subscribe((s:CardState)=>{
      this.cards[uid].state = s;
    })
  }

}
