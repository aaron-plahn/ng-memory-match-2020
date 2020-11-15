import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

enum CardState {
  FaceUp,
  FaceDown,
  Hidden
}

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

  private _cardID: string;
  @Input() set cardID(value: string){
    this._cardID = value;
    this.image = this._cardID;
  };

  private _active: boolean = true;
  @Input() set active(value: boolean){
    this._active = value;
  }

  private _state: CardState = CardState.FaceDown;
  @Input() set setCardState(value: CardState){
    this._state = value;
    this.handleStateChange(this._state);
  }

  @Output() public cardClicked = new EventEmitter<string>();
  public sendIDOnClick() {
    if(!this._active || !(this._state==CardState.FaceDown)) return;
      this.cardClicked.emit(this._cardID);
      // console.log(`You clicked on tile: ${this._cardID}`);
  }

  constructor() { 
   }

  ngOnInit(): void {
    this.handleStateChange(CardState.FaceDown);
  }

  handleStateChange(s: CardState){
    if(s===CardState.Hidden){
      this._active = false;
      this.visible = false;
      return
    } 

    s===CardState.FaceUp ? this.image=testCardFront: this.image=testCardBack;
  }

}
