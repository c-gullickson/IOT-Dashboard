import { Component, OnInit } from '@angular/core';
import { MenuItem } from './menu-item';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  menuItems: MenuItem[] = [];

  constructor() { }

  ngOnInit(): void {
    this.setMenuItems();
  }


  setMenuItems() {
    this.menuItems = [
      {
        path: 'home',
        title: 'Home',
        icon: 'home'
      }
    ]

    this.menuItems.push(
      {
        path: 'roku/status',
        title: 'Roku Television',
        icon: 'devices'
      }
    )

    this.menuItems.push(
      {
        path: 'ring/status',
        title: 'Ring Doorbell',
        icon: 'tv'
      }
    )

    this.menuItems.push(
      {
        path: 'fitbit',
        title: 'Fitbit',
        icon: 'watch'
      }
    )

    this.menuItems.push(
      {
        path: 'about',
        title: 'About Application',
        icon: 'question_answer'
      }
    )
    // TODO Add in other devices if there is time:
  }
}
