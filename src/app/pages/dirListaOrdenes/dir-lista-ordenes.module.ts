import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DirListaOrdenesRoutingModule } from './dir-lista-ordenes-routing.module';
import { ListComponent } from './list/list.component';
import { ManageComponent } from './manage/manage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { readSync } from 'fs';


@NgModule({
  declarations: [
    ListComponent,
    ManageComponent
  ],
  imports: [
    CommonModule,
    DirListaOrdenesRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DirListaOrdenesModule { }
