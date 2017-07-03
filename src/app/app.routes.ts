import { RouterModule, Routes } from '@angular/router';
import { EditorComponent } from './components/editor/editor.component';
import { HelpComponent } from './components/help/help.component';
import { ErrorComponent } from './components/error/error.component';

const APP_ROUTES: Routes = [
  { path: 'editor/:section', component: EditorComponent },
  { path: 'editor/:section/:subsection', component: EditorComponent },
  { path: 'editor/:section/:subsection/:type', component: EditorComponent },
  { path: 'editor/:section/:subsection/:type/:category', component: EditorComponent },
  { path: 'help', component: HelpComponent },
  { path: 'error', component: ErrorComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'editor/configuration' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
