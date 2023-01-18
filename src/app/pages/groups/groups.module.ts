import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {GroupsRoutingModule} from './groups-routing.module';
import {GroupListComponent} from './group-list/group-list.component';
import {NzTableModule} from "ng-zorro-antd/table";
import {NzButtonModule} from "ng-zorro-antd/button";
import {IconsProviderModule} from "../../icons-provider.module";
import {NzModalModule} from "ng-zorro-antd/modal";
import {NzFormModule} from "ng-zorro-antd/form";
import {ReactiveFormsModule} from "@angular/forms";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzDividerModule} from "ng-zorro-antd/divider";


@NgModule({
  declarations: [
    GroupListComponent
  ],
  imports: [
    CommonModule,
    GroupsRoutingModule,
    NzTableModule,
    NzButtonModule,
    IconsProviderModule,
    NzModalModule,
    NzFormModule,
    ReactiveFormsModule,
    NzInputModule,
    NzDividerModule,
  ]
})
export class GroupsModule {
}
