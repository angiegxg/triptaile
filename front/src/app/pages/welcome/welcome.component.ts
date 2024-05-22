import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../../features/place/home/home.component';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [HomeComponent],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

}
