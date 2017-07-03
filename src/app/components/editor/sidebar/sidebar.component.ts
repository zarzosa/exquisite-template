import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.less']
})
export class SidebarComponent implements OnInit {

  section:String = '';

  constructor( private activatedRoute:ActivatedRoute ) {
  }

  ngOnInit() {

  }

  // Displays the correct component in relation to the selected tab.
  getSection( section:string ){
    this.activatedRoute.params.subscribe( params => {
      this.section = params['section'];
    } );
    if ( this.section == section ) {
      return true;
    }else {
      return false;
    }
  }

}
