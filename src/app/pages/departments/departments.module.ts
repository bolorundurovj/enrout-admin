import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DepartmentsRoutingModule} from './departments-routing.module';
import {DepartmentListComponent} from './department-list/department-list.component';
import {NzFormModule} from "ng-zorro-antd/form";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzModalModule} from "ng-zorro-antd/modal";
import {ReactiveFormsModule} from "@angular/forms";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzDividerModule} from "ng-zorro-antd/divider";
import {NzInputModule} from "ng-zorro-antd/input";
import {IconsProviderModule} from "../../icons-provider.module";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzPageHeaderModule} from "ng-zorro-antd/page-header";


@NgModule({
  declarations: [
    DepartmentListComponent
  ],
  imports: [
    CommonModule,
    DepartmentsRoutingModule,
    NzFormModule,
    NzTableModule,
    NzModalModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzDividerModule,
    NzInputModule,
    IconsProviderModule,
    NzSelectModule,
    NzPageHeaderModule
  ]
})
export class DepartmentsModule {
}
