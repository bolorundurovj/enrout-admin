import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GroupRoleListComponent} from "./group-role-list/group-role-list.component";

const routes: Routes = [{path: '', component: GroupRoleListComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupRolesRoutingModule {
}
