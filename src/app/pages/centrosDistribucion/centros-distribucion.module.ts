import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CentrosDistribucionRoutingModule } from './centros-distribucion-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListComponent } from './list/list.component';
import { ManageComponent } from './manage/manage.component';


@NgModule({
  declarations: [
    ListComponent,
    ManageComponent
  ],
  imports: [
    CommonModule,
    CentrosDistribucionRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CentrosDistribucionModule { }
