import { Injectable } from '@angular/core';

export interface ElementIndex {
  title:string;
  description:string;
  slug:string;
}
export interface Element {
  title:string;
  description:string;
  slug:string;
  inputs:{}[],
  templateCSS:string,
  templateHTML:string
}

@Injectable()
export class ElementsService {

  private elementsIndex:ElementIndex[] = [
    {
      title: "Heading",
      description: "none",
      slug: "heading"
    },
    {
      title: "Paragraph",
      description: "none",
      slug: "paragraph"
    }
  ]
  private elementsData:Element[] = [
    {
      title: "Heading",
      description: "Title: <h1>-<h6>.",
      slug: "heading",
      inputs: [
        {
          label: "Title",
          description: "Text.",
          type: "text-line",
          value: ""
        },
        {
          label: "Type",
          description: "<h1>-<h6>",
          type: "select",
          options: [
            "Heading 1",
            "Heading 2",
            "Heading 3",
            "Heading 4",
            "Heading 5",
            "Heading 6"
          ],
          value: ""
        }
      ],
      templateCSS: "",
      templateHTML: "<h1>Heading</h1>"
    },
    {
      title: "Paragraph",
      description: "Text: <p>.",
      slug: "paragraph",
      inputs: [
        {
          label: "Paragraph",
          description: "Paragraph text.",
          type: "text-area",
          value: ""
        }
      ],
      templateCSS: "",
      templateHTML: "<p>Paragraph</p>"
    }
  ]
  private elementsModel:Element[] = [];


  constructor() { }

  // Returns all elements of the index.
  getElementsIndex(){
    return this.elementsIndex;
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

  // Adds a referenced item in the index to the model (UNDER DEVELOPMENT).
  addElementModelFromIndex( index:number ){
    let element = this.elementsIndex[index];
    for ( var item of this.elementsData ) {
      if ( element.slug == item.slug ) {
        this.elementsModel.push(item);
      }
    }
  }

}
