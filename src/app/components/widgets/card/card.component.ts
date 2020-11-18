import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { CardState } from '@src/app/custom-types/enums/card-state';
import { CardID } from '@src/app/custom-types/types/card-id';

let testCardFront: string = "diamonds.png";
let testCardBack: string = "dog.png";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  public image: string = "";
  public visible: boolean = true;
  public active: boolean = true;

  // _cardID is shared among 2 matching card elements
  private _cardID: string;
  @Input() set cardID(value: string){
    this._cardID = value;
    this.image = this._cardID;
  };

  // _uniqueElementID is unique among all card elements
  private _uniqueElementID: string;
  @Input() set uniqueElementID(value: string){
    this._uniqueElementID = value;
  }

  private _state: CardState = CardState.FaceDown;
  @Input() set state(value: CardState){
    this._state = value;
    this.handleStateChange(this._state);
  }

  @Output() public cardClicked = new EventEmitter<CardID>();
  public sendIDsOnClick() {
    if(!this.active || !(this._state==CardState.FaceDown)) return;
      this.cardClicked.emit({
        cardID: this._cardID,
        uniqueElementID: this._uniqueElementID});
      // console.log(`You clicked on tile: ${this._cardID}`);
  }

  constructor() { 
   }

  ngOnInit(): void {
    this.handleStateChange(CardState.FaceDown);
  }

  handleStateChange(s: CardState){
    if(s===CardState.Hidden){
      this.active = false;
      this.visible = false;
      return
    } 

    if(s===CardState.FaceUp) this.image=testCardFront;
    if(s===CardState.FaceDown) this.image=testCardBack;
  }

}
