import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DefaultComponent} from "./components/layouts/default/default.component";
import {NzLayoutModule} from "ng-zorro-antd/layout";
import {NzMenuModule} from "ng-zorro-antd/menu";
import {IconsProviderModule} from "../icons-provider.module";
import {RouterModule} from "@angular/router";
import { ToastComponent } from './components/toast/toast.component';
import {NzAlertModule} from "ng-zorro-antd/alert";
import {NzAvatarModule} from "ng-zorro-antd/avatar";
import {NzDropDownModule} from "ng-zorro-antd/dropdown";



@NgModule({
  declarations: [DefaultComponent, ToastComponent],
  imports: [
    CommonModule,
    NzLayoutModule,
    NzMenuModule,
    IconsProviderModule,
    RouterModule,
    NzAlertModule,
    NzAvatarModule,
    NzDropDownModule,
  ],
  exports: [DefaultComponent, ToastComponent]
})
export class LibModule { }
