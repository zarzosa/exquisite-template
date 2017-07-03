import { Injectable } from '@angular/core';

export interface Configuration {
  googleFont:string,
  containerWidth:string,
  portalBackground:string,
  customCSS:string
}

export interface ElementIndex {
  title:string,
  description:string,
  alias:string,
  category?:string
}

export interface Element {
  title:string,
  description:string,
  alias:string,
  inputs:{}[],
  modifiers:{}[],
  templateCSS:string,
  templateHTML:string
}

@Injectable()
export class ModelService {

  private configurationModel:Configuration = {
    googleFont: '@import url("https://fonts.googleapis.com/css?family=Roboto:300,400,500");',
    containerWidth: '1270',
    portalBackground: '#fff',
    customCSS: '.portal__container, .portal__container h1, .portal__container h2, .portal__container h3, .portal__container h4, .portal__container h5, .portal__container, h6, .portal__container p{ font-family: "Roboto", sans-serif; }'
  };
  private elementsModel:Element[] = [];

  constructor() { }

  // Returns all elements of the model.
  getConfigurationModel() {
    return this.configurationModel;
  }

  // Returns all elements of the model.
  getElementsModel() {
    return this.elementsModel;
  }

  // Return the length of the elements model array.
  getElementsModelLenght(){
    return this.elementsModel.length;
  }

  // Return a specific element of the model, according to its position in the array.
  getElementModel( index:string ){
    return this.elementsModel[index];
  }

  // Add an item to the model.
  addElementModel( element:Element ){
    this.elementsModel.push(element);
  }

  // Remove an item to the model.
  removeElementModel( index:number ){
    this.elementsModel.splice(index, 1);
  }

  // Move the position of an item in the model array.
  moveElementModel( oldIndex:number, newIndex:number ) {
    this.elementsModel.splice(newIndex, 0, this.elementsModel.splice(oldIndex, 1)[0]);
  }

  // Add a modifier to the model.
  addElementModifier( index:number, modifier:any ){
    this.elementsModel[index].modifiers.push(modifier);
  }

}
