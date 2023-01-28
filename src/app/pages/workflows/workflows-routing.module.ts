import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WorkflowListComponent} from "./workflow-list/workflow-list.component";
import {WorkflowDetailComponent} from "./workflow-detail/workflow-detail.component";

const routes: Routes = [
  {path: '', component: WorkflowListComponent},
  {
    path: ':id',
    component: WorkflowDetailComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkflowsRoutingModule {
}
