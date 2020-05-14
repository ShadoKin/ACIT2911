  
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule }      from '@angular/forms';
import { PageDefault }    from './app.pagedefault';
import { IndexComponent } from './app.index';
import { RegisterComponent } from './app.register';
import { LoginComponent } from './app.login';
import { AdminComponent } from './app.admin';
import { ProductsComponent } from './app.products';
import { ManageComponent } from './app.manage';
import { UpdateComponent} from './app.update';
import { routing }        from './app.routing';

import { AppComponent } from './app.component';

@NgModule({
  imports: [BrowserModule, FormsModule, routing, HttpClientModule],
  declarations: [
    AppComponent, PageDefault,
    IndexComponent, RegisterComponent,LoginComponent,AdminComponent,ProductsComponent, ManageComponent, UpdateComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }