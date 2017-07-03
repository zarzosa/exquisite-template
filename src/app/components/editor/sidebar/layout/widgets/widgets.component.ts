import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Http, Response} from '@angular/http';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/map';
import { ModelService, Element, ElementIndex } from '../../../../../services/model.service';

@Component({
  selector: 'app-widgets',
  templateUrl: './widgets.component.html',
  styleUrls: ['./widgets.component.less']
})
export class WidgetsComponent implements OnInit {

  private elementsModel:Element[] = [];
  private modifiersIndex:any;
  private jsonData:any;

  private openWidget:number = -1;
  private openModifier:boolean = false;

  constructor(
    private router:Router,
    private http:Http,
    private modelService:ModelService
  ) {
    this.modifiersIndex = {schemaIndex:[]};
    http.get('/assets/schemas/modifiers/schemaIndex.json').map((res: Response) => res.json()).subscribe(res => this.modifiersIndex = res);
  }

  ngOnInit() {
    this.elementsModel = this.modelService.getElementsModel();
  }

  // Link the widget with its corresponding information page.
  viewInformation( index:number ) {
    this.router.navigate( ['editor', 'information', 'element', index] );
  }

  // Displays widget information, using its position within the array.
  setOpenWidget( index:number ) {
    this.openWidget = index;
    this.openModifier=false
  }

  // Change the position of the widget within the model array.
  // Receive the current index and the direction "up" or "down".
  moveWidget( index:number, direction:string ) {
    let newIndex = index;
    if ( direction == 'up' && index > 0) {
      newIndex = index - 1;
    }else if ( direction == 'up' && index == 0 ) {
      newIndex = this.modelService.getElementsModelLenght() - 1;
    }else if ( direction == 'down' && index < (this.modelService.getElementsModelLenght() - 1) ) {
      newIndex = index + 1;
    }else if ( direction == 'down' && index == (this.modelService.getElementsModelLenght() - 1) ) {
      newIndex = 0;
    }
    this.setOpenWidget( newIndex );
    this.modelService.moveElementModel(index, newIndex);
  }

  // Removes the widget from the model.
  removeWidget( index:number ) {
      this.setOpenWidget(-1);
      this.modelService.removeElementModel(index);
  }

  // Returns the fields of a widget.
  getWidgetFields( index:number ) {
    return this.elementsModel[index].inputs;
  }

  // Returns the modifiers of a widget.
  getWidgetModifiers( index:number ):any {
    return this.elementsModel[index].modifiers;
  }

  // Returns true if the modifier already exists.
  checkExistModifierAlias( index:number, alias:string ) {
    let modifiers = this.getWidgetModifiers(index);
    let exist = false;
    for ( let modifier of modifiers ) {
      if ( alias == modifier.alias) {
        exist = true;
      }
    }
    return exist;
  }

  // It executes the function createWidgetModifier() obtaining the alias of a modifier through the array in the index.
  sendWidgetModifier( index:number, indexModifier:number ) {
    let schema = this.modifiersIndex.schemaIndex[indexModifier];
    this.jsonData = {schema:[]};
    this.http.get('/assets/schemas/modifiers/'+schema.alias+'/schema.json').map((res: Response) => res.json()).subscribe(res => this.createWidgetModifier(index, res));
    this.openModifier = false;
  }

  // Add a modifier to the widget.
  createWidgetModifier( index:number, res:any ) {
    this.jsonData = res.schema;
    this.modelService.addElementModifier(index, this.jsonData);
  }

}
