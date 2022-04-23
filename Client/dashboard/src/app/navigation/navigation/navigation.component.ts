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
        icon: 'tv'
      }
    )

    this.menuItems.push(
      {
        path: 'ring/status',
        title: 'Ring Doorbell',
        icon: 'devices'
      }
    )

    this.menuItems.push(
      {
        path: 'lights/status',
        title: 'Lights',
        icon: 'lightbulb_outline'
      }
    )

    this.menuItems.push(
      {
        path: 'about',
        title: 'About Application',
        icon: 'question_answer'
      }
    )

    this.menuItems.push(
      {
        path: 'configuration',
        title: 'Configuration',
        icon: 'settings'
      }
    )
    // TODO Add in other devices if there is time:
  }
}
