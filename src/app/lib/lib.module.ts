import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DefaultComponent} from "./components/layouts/default/default.component";
import {NzLayoutModule} from "ng-zorro-antd/layout";
import {NzMenuModule} from "ng-zorro-antd/menu";
import {IconsProviderModule} from "../icons-provider.module";
import {RouterModule} from "@angular/router";
import { ToastComponent } from './components/toast/toast.component';
import {NzAlertModule} from "ng-zorro-antd/alert";



@NgModule({
  declarations: [DefaultComponent, ToastComponent],
  imports: [
    CommonModule,
    NzLayoutModule,
    NzMenuModule,
    IconsProviderModule,
    RouterModule,
    NzAlertModule,
  ],
  exports: [DefaultComponent, ToastComponent]
})
export class LibModule { }
