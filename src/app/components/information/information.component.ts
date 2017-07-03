import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ElementsService, Element } from '../../services/elements.service';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html'
})
export class InformationComponent implements OnInit {

  elementsModel:Element[] = [];
  element:Element;

  constructor(
    private activatedRoute:ActivatedRoute,
    private elementsService:ElementsService
  ) {
    this.activatedRoute.params.subscribe( params => {
      this.element = this.elementsService.getElementModel( params['id'] );
    } );
  }

  ngOnInit() {
    this.elementsModel = this.elementsService.getElementsModel();
  }

}
