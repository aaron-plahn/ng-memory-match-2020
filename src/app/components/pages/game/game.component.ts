import { Component, OnInit, ViewChildren } from '@angular/core';
import { ElementRef, QueryList} from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { map, switchMap } from "rxjs/operators";
import { ObservableInput } from "rxjs";

import { CardState } from '@src/app/custom-types/enums/card-state';
import { CardID } from '@src/app/custom-types/types/card-id';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

//  @ViewChildren('gameCards') cardElements;
  @ViewChildren('gameCards', {read: ElementRef}) cardElements: QueryList<ElementRef>;

  round:string;
  errorMessage:string;

  selectedCards: CardID[] = [];

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
    {'id':"13","image":"dog.png","state":CardState.FaceDown},
    {'id':'14',"image":"cat.png","state":CardState.FaceDown},
    {'id':'15',"image":"horse.png","state":CardState.FaceDown},    
    {'id':"16","image":"chicken.png","state":CardState.FaceDown},
    {'id':'17',"image":"salmon.png","state":CardState.FaceDown},
    {'id':'18',"image":"eagle.png","state":CardState.FaceDown},
    {'id':"19","image":"crow.png","state":CardState.FaceDown},
    {'id':'20',"image":"seagull.png","state":CardState.FaceDown},
    {'id':'21',"image":"goat.png","state":CardState.FaceDown},
    {'id':"22","image":"pig.png","state":CardState.FaceDown},
    {'id':'23',"image":"moose.png","state":CardState.FaceDown},
    {'id':'24',"image":"deer.png","state":CardState.FaceDown}
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
    let c: string = cardIDs['uniqueElementID'];
    console.log(`You clicked card ${c}`);
    console.log(this.cards[c].state=CardState.FaceUp);

    let l = this.selectedCards.length;
    if(l > 2) return;
    this.selectedCards.push(cardIDs);
    if(l === 0) return;
    
    // l === 1
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
    //this.cardElements.toArray()[c1].nativeElement.setCardState(CardState.Hidden);
    //this.cardElements.toArray()[c2].nativeElement.setCardState(CardState.Hidden);
  }

  resetCards(c1: string,c2:string){
    console.log(`RESETTING CARDS: ${c1} and ${c2}`);
    this.cardElements.toArray()[c1].nativeElement.setCardState(CardState.FaceDown);
    this.cardElements.toArray()[c2].nativeElement.setCardState(CardState.FaceDown);
  }

}
