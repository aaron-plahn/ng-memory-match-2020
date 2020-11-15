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

}
