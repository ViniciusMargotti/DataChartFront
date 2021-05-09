import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CadastroUsuariosComponent } from './cadastroUsuarios/cadastroUsuarios.component';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule, MatOptionModule, MatRippleModule} from '@angular/material/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule, MatChipsModule, MatGridListModule, MatSliderModule} from '@angular/material';
import {MatDialogModule} from '@angular/material/dialog';
import { MAT_COLOR_FORMATS, NgxMatColorPickerModule, NGX_MAT_COLOR_FORMATS } from '@angular-material-components/color-picker';


import { RegisterComponent } from './register/register.component';

import {TextMaskModule} from 'angular2-text-mask';
import { ModalCadastroComponent } from './cadastroUsuarios/modalcadastro/modal-cadastro/modal-cadastro.component';

// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
    CadastroUsuariosComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    LogoutComponent,
    RegisterComponent,
    ModalCadastroComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        BrowserAnimationsModule,
        MatInputModule,
        ReactiveFormsModule,
        MatToolbarModule,
        MatIconModule,
        MatCardModule,
        MatButtonModule,
        MatButtonModule,
        MatOptionModule,
        MatSelectModule,
        MatSnackBarModule,
        MatTableModule,
        MatPaginatorModule,
        MatTabsModule,
        MatSortModule,
        MatDialogModule,
        TextMaskModule,
        MatGridListModule,
        MatChipsModule,
        NgxMatColorPickerModule,
        MatSliderModule
    ],
  entryComponents: [ModalCadastroComponent],
  providers: [{ provide: MAT_COLOR_FORMATS, useValue: NGX_MAT_COLOR_FORMATS }],
  bootstrap: [AppComponent]
})
export class AppModule { }
