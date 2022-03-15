import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../sidebar/sidebar.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: [
  ]
})
export class MenuComponent implements OnInit {



  constructor(public _sidebar: SidebarService,
  ) { }

  ngOnInit(): void {
    //console.log(this._sidebar.menuItems);
  }


}
