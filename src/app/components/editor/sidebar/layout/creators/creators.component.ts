import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {Http, Response} from '@angular/http';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/map';
import { ModelService, ElementIndex } from '../../../../../services/model.service';

@Component({
  selector: 'app-creators',
  templateUrl: './creators.component.html',
  styleUrls: ['./creators.component.less']
})
export class CreatorsComponent implements OnInit {

  private type:string;
  private category:string;
  private alias:string;

  private elementsIndex:any;
  private elementsCategoryIndex:any;
  private elementsCustomIndex:any;
  private jsonData:any;

  constructor(
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private http:Http,
    private modelService:ModelService
  ) {
    this.elementsIndex = {schemaIndex:[]};
    http.get('/assets/schemas/default/schemaIndex.json').map((res: Response) => res.json()).subscribe(res => this.elementsIndex = res);

    this.elementsCategoryIndex = {schemaIndex:[]};
    http.get('/assets/schemas/custom/schemaIndex.json').map((res: Response) => res.json()).subscribe(res => this.elementsCategoryIndex = res);

    activatedRoute.params.subscribe( params => {
      this.category = params['category'];
    } );
    if( this.category ) {
      this.elementsCustomIndex = {schemaIndex:[]};
      http.get('/assets/schemas/custom/'+this.category+'/schemaIndex.json').map((res: Response) => res.json()).subscribe(res => this.elementsCustomIndex = res);
    }
  }

  ngOnInit() { }

  // Returns true if the type is custom.
  isCustomType() {
    this.activatedRoute.params.subscribe( params => {
      this.type = params['type'];
    } );
    if ( this.type == 'custom' ) {
      return true;
    }else {
      return false;
    }
  }

  // Returns the custom category.
  getCustomCategory() {
    return this.category;
  }

  // It executes the function createElementModel() obtaining the alias of an element through the array in the index.
  sendElementModel( index:number ) {
    let schema = this.elementsIndex.schemaIndex[index];
    this.jsonData = {schema:[]};
    this.http.get('/assets/schemas/default/'+schema.alias+'/schema.json').map((res: Response) => res.json()).subscribe(res => this.createElementModel(res));
  }

  // It executes the function createElementModel() obtaining the alias of an element through the array in the index.
  sendCustomElementModel( index:number ) {
    let schema = this.elementsCustomIndex.schemaIndex[index];
    this.jsonData = {schema:[]};
    this.http.get('/assets/schemas/custom/'+this.category+'/'+schema.alias+'/schema.json').map((res: Response) => res.json()).subscribe(res => this.createElementModel(res));
  }

  // Adds an element to the model based on an alias.
  createElementModel( res:any ) {
    this.jsonData = res.schema;
    this.modelService.addElementModel(this.jsonData);
    this.router.navigate( ['editor', 'layout'] );
  }

}
