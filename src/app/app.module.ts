import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// Importation du module FormsModule 
import { FormsModule } from '@angular/forms';
// Importation du module HttpClientModule 
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    // Importation du module FormsModule 
    FormsModule,
    // Importation du module HttpClientModule 
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
