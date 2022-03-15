import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivationEnd, NavigationEnd, Router } from '@angular/router';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})

export class BreadcrumbsComponent implements OnInit {

  datos: string = '';

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {

    // this.router.events.pipe(
    // map( ( evento:ActivationEnd)=>{
    //   if (evento instanceof ActivationEnd) {
    //     if (evento.snapshot.firstChild === null) {
    //       console.log(evento);
    //       this.datos = evento.snapshot.data.titulo;
    //     }
    //   }
    // return evento.snapshot.data;
    // })
    // .subscribe((event) => {
    //     console.log(event);
    //   // filter((evento: ActivationEnd) => evento.snapshot.firstChild === null)
    // })
    // )


  }

  ngOnInit(): void {

  }

}
