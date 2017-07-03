import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html'
})
export class LayoutComponent implements OnInit {

  private subsection:string = '';

  constructor( private activatedRoute:ActivatedRoute ) { }

  ngOnInit() {

  }

  getSubSection( subsection:string ){
    this.activatedRoute.params.subscribe( params => {
      this.subsection = params['subsection'];
    } );
    if ( this.subsection == subsection ) {
      return true;
    }else {
      return false;
    }
  }

}
