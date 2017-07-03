// Allows to send information to the DOM in a secure way through the DomSanitizer.
// value|safe (Options: 'html', 'style', 'script', 'url'. 'resourceUrl')

import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
  name: 'safe'
})
export class SafePipe implements PipeTransform {

  constructor( private domSanitizer:DomSanitizer ){ }

  transform(value: string, target:string): SafeResourceUrl {
    if( target == 'html' ) {
      return this.domSanitizer.bypassSecurityTrustHtml(value);
    }else if( target == 'style' ) {
      return this.domSanitizer.bypassSecurityTrustStyle(value);
    }else if( target == 'script' ) {
      return this.domSanitizer.bypassSecurityTrustScript(value);
    }else if( target == 'url' ) {
      return this.domSanitizer.bypassSecurityTrustUrl(value);
    }else if( target == 'resourceUrl' ) {
      return this.domSanitizer.bypassSecurityTrustResourceUrl(value);
    }else {
      return 'Invalid target (value|safe:target). Available options: html, style, script, url and resourceUrl.'
    }
  }

}
