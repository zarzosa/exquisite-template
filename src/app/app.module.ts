import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Routes
import { APP_ROUTING } from './app.routes'

// Services
import { ModelService } from './services/model.service';

// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { EditorComponent } from './components/editor/editor.component';
import { SidebarComponent } from './components/editor/sidebar/sidebar.component';
import { PreviewComponent } from './components/editor/preview/preview.component';
import { ConfigurationComponent } from './components/editor/sidebar/configuration/configuration.component';
import { LayoutComponent } from './components/editor/sidebar/layout/layout.component';
import { ExportComponent } from './components/editor/sidebar/export/export.component';
import { HelpComponent } from './components/help/help.component';
import { ErrorComponent } from './components/error/error.component';
import { WidgetsComponent } from './components/editor/sidebar/layout/widgets/widgets.component';
import { CreatorsComponent } from './components/editor/sidebar/layout/creators/creators.component';

// Pipes
import { SafePipe } from './pipes/safe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    EditorComponent,
    SidebarComponent,
    PreviewComponent,
    ConfigurationComponent,
    LayoutComponent,
    ExportComponent,
    HelpComponent,
    ErrorComponent,
    WidgetsComponent,
    CreatorsComponent,
    SafePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    APP_ROUTING
  ],
  providers: [
    ModelService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
