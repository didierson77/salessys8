import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})

// @ViewChild('myDiv') private myDiv:ElementRef;

export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    //  $(".sidebar").load(location.href + ".sidebar");
  }


  // ngAfterViewInit () {
  //     this.renderer.setElementClass(this.myDiv.nativeElement, 'shake', true); }



}
