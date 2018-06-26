import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import {Routes, RouterModule} from '@angular/router';
import { AddTaskComponent } from './add-task/add-task.component';
import { ViewTaskComponent } from './view-task/view-task.component';
import { HttpClientModule } from '@angular/common/http';
import { UpdateTaskComponent } from './update-task/update-task.component';
import { SearchPipe } from './filter/search.pipe';

const appRoutes: Routes = [
  { path: 'Add', component: AddTaskComponent },
  { path: 'Edit', component: UpdateTaskComponent },
  { path: '', component: ViewTaskComponent },
  { path: '**', component: ViewTaskComponent },
  // { path: 'Movie', component: MovieComponent },
  // { path: 'Currency', component: CurrencyComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    AddTaskComponent,
    ViewTaskComponent,
    UpdateTaskComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
