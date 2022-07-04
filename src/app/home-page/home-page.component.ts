import { Component, OnInit } from '@angular/core';
import { HomepageService } from '../services/homepage/homepage.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(private hService:HomepageService) { }

  ngOnInit() {
  
  }

}
