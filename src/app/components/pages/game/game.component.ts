import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { map, switchMap } from "rxjs/operators";
import { ObservableInput } from "rxjs";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  round:string;

  cards = [
    {'id':"1","image":"dog.png"},
    {'id':'2',"image":"cat.png"},
    {'id':'3',"image":"horse.png"},    
    {'id':"4","image":"chicken.png"},
    {'id':'5',"image":"salmon.png"},
    {'id':'6',"image":"eagle.png"},
    {'id':"7","image":"crow.png"},
    {'id':'8',"image":"seagull.png"},
    {'id':'9',"image":"goat.png"},
    {'id':"10","image":"pig.png"},
    {'id':'11',"image":"moose.png"},
    {'id':'12',"image":"deer.png"},
    {'id':"1","image":"dog.png"},
    {'id':'2',"image":"cat.png"},
    {'id':'3',"image":"horse.png"},    
    {'id':"4","image":"chicken.png"},
    {'id':'5',"image":"salmon.png"},
    {'id':'6',"image":"eagle.png"},
    {'id':"7","image":"crow.png"},
    {'id':'8',"image":"seagull.png"},
    {'id':'9',"image":"goat.png"},
    {'id':"10","image":"pig.png"},
    {'id':'11',"image":"moose.png"},
    {'id':'12',"image":"deer.png"}
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

  onCardClick(cardID: string): void{
    console.log(`You clicked card ${cardID}`);
  }

}
