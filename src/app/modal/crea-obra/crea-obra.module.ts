import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreaObraPageRoutingModule } from './crea-obra-routing.module';

import { CreaObraPage } from './crea-obra.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreaObraPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CreaObraPage]
})
export class CreaObraPageModule {}
