import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModelService, Configuration, Element } from '../../../services/model.service';
import { SafePipe } from '../../../pipes/safe.pipe';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.less']
})
export class PreviewComponent implements OnInit {

  private section:string;

  private configurationModel:Configuration;
  private elementsModel:Element[] = [];

  constructor(
    private activatedRoute:ActivatedRoute,
    private modelService:ModelService
  ) { }

  ngOnInit() {
    this.configurationModel = this.modelService.getConfigurationModel();
    this.elementsModel = this.modelService.getElementsModel();
  }

  // Returns true if the section is "export".
  isExport() {
    this.activatedRoute.params.subscribe( params => {
      this.section = params['section'];
    } );
    if( this.section == 'export' ) {
      return true;
    }else {
      return false;
    }
  }

  // Replace the template alias with their respective values.
  transformTemplateOutput( schemaAlias:string, template:string, inputs:any[], index:number ) {
    let newTemplate:string = '';
    for( let i in inputs ) {
      newTemplate = template.split('{{'+inputs[i].alias+'}}').join(inputs[i].value);
      newTemplate = newTemplate.split('{{'+schemaAlias+'}}').join(schemaAlias+'--'+index);
      template = newTemplate;
    }
    return newTemplate;
  }

  // Replace the modifier alias with their respective values.
  transformModifierOutput( modifiers:any[], index:number ) {
    let modifierCSS:string = '';
    let newModifierCSS:string = '';
    for ( let i in modifiers ) {
      modifierCSS += modifiers[i].modifierCSS;
      newModifierCSS = modifierCSS.split('{{'+modifiers[i].alias+'}}').join(modifiers[i].value);
      newModifierCSS = newModifierCSS.split('{{ELEMENT}}').join('.element--'+index);
      modifierCSS = newModifierCSS;
    }
    return newModifierCSS;
  }

  // Creates the layout preview.
  createPreview( data?:string ) {
    let cssPreview:string[] = [];
    let htmlPreview:string[] = [];
    let i = 0;
    for ( let element of this.elementsModel ) {
      let cssElement = this.transformTemplateOutput(element.alias, element.templateCSS,element.inputs,i)+this.transformModifierOutput(element.modifiers,i);
      let htmlElement = '<div class="element__container element--'+i+'">'+this.transformTemplateOutput(element.alias, element.templateHTML,element.inputs,i)+'</div>';
      i++;
      cssPreview.push(cssElement);
      htmlPreview.push(htmlElement);
    }

    if( data == 'css' ) {
      return  this.configurationModel.googleFont+
              ' .portal__container{ background: '+this.configurationModel.portalBackground+' }'+
              ' .element__container{ max-width: '+this.configurationModel.containerWidth+'px }'+
              this.configurationModel.customCSS+
              cssPreview.join('');
    }else if( data == 'html' ) {
      return  '<div class="portal__container">'+
              htmlPreview.join('')+
              '</div>';
    }else {
      return  '<style> '+
              this.configurationModel.googleFont+
              ' .portal__container{ background: '+this.configurationModel.portalBackground+' }'+
              ' .element__container{ max-width: '+this.configurationModel.containerWidth+'px }'+
              this.configurationModel.customCSS+
              cssPreview.join('')+
              '</style> '+
              '<div class="portal__container">'+
              htmlPreview.join('')+
              '</div>';
    }

  }

}
