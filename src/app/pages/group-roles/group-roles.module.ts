import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {GroupRolesRoutingModule} from './group-roles-routing.module';
import {GroupRoleListComponent} from './group-role-list/group-role-list.component';
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzFormModule} from "ng-zorro-antd/form";
import {ReactiveFormsModule} from "@angular/forms";
import {NzModalModule} from "ng-zorro-antd/modal";
import {IconsProviderModule} from "../../icons-provider.module";
import {NzDividerModule} from "ng-zorro-antd/divider";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzPageHeaderModule} from "ng-zorro-antd/page-header";


@NgModule({
  declarations: [
    GroupRoleListComponent
  ],
  imports: [
    CommonModule,
    GroupRolesRoutingModule,
    NzSelectModule,
    NzTableModule,
    NzButtonModule,
    NzFormModule,
    ReactiveFormsModule,
    NzModalModule,
    IconsProviderModule,
    NzDividerModule,
    NzInputModule,
    NzPageHeaderModule
  ]
})
export class GroupRolesModule {
}
