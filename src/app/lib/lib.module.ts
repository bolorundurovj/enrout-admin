import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DefaultComponent} from "./components/layouts/default/default.component";
import {NzLayoutModule} from "ng-zorro-antd/layout";
import {NzMenuModule} from "ng-zorro-antd/menu";
import {IconsProviderModule} from "../icons-provider.module";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [DefaultComponent],
  imports: [
    CommonModule,
    NzLayoutModule,
    NzMenuModule,
    IconsProviderModule,
    RouterModule
  ],
  exports: [DefaultComponent]
})
export class LibModule { }
