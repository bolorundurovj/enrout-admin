import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupsRoutingModule } from './groups-routing.module';
import { GroupListComponent } from './group-list/group-list.component';
import {NzTableModule} from "ng-zorro-antd/table";
import {NzButtonModule} from "ng-zorro-antd/button";


@NgModule({
  declarations: [
    GroupListComponent
  ],
  imports: [
    CommonModule,
    GroupsRoutingModule,
    NzTableModule,
    NzButtonModule
  ]
})
export class GroupsModule { }
