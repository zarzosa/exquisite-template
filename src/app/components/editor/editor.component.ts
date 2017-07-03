import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.less']
})
export class EditorComponent implements OnInit {

  private fullView:boolean = false;
  private previewSize:string = 'full';

  constructor() { }

  ngOnInit() {
  }

  // Set the preview size.
  setPreviewSize( size:string ) {
    this.previewSize = size;
  }

  // Returns true if the preview size matches.
  isPreviewSize( size:string ) {
    if( size == this.previewSize ) {
      return true;
    }else {
      return false;
    }
  }

}
