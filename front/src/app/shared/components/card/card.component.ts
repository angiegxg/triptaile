import { Component, Input } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { CommonModule } from '@angular/common';
import { DropDownComponent } from '../drop-down/drop-down.component';
import * as types from '../../types'
import { Router } from '@angular/router';



@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    NzCardModule,
    CommonModule,
    DropDownComponent
  ],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() place!: types.Place;
  constructor(private router: Router) { }

 
}
