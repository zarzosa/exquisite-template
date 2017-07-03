import { Component, OnInit } from '@angular/core';
import { ModelService, Configuration } from '../../../../services/model.service';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.less']
})
export class ConfigurationComponent implements OnInit {

  private configurationModel:Configuration;

  constructor( private modelService:ModelService ) { }

  ngOnInit() {
    this.configurationModel = this.modelService.getConfigurationModel();
  }

}
