import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "./lib/guards/auth.guard";

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/welcome'},
  {path: 'auth', loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)},
  {
    path: 'departments',
    loadChildren: () => import('./pages/departments/departments.module').then(m => m.DepartmentsModule)
  },
  {path: 'documents', loadChildren: () => import('./pages/documents/documents.module').then(m => m.DocumentsModule)},
  {
    path: 'group-roles',
    loadChildren: () => import('./pages/group-roles/group-roles.module').then(m => m.GroupRolesModule)
  },
  {
    path: 'groups',
    canLoad: [AuthGuard],
    loadChildren: () => import('./pages/groups/groups.module').then(m => m.GroupsModule)
  },
  {path: 'staff', loadChildren: () => import('./pages/staff/staff.module').then(m => m.StaffModule)}, {
    path: 'students',
    loadChildren: () => import('./pages/students/students.module').then(m => m.StudentsModule)
  },
  {path: 'users', loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule)},
  {path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule)},
  {path: 'workflows', loadChildren: () => import('./pages/workflows/workflows.module').then(m => m.WorkflowsModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
