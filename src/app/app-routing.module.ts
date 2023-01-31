import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "./lib/guards/auth.guard";

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/welcome'},
  {path: 'auth', loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)},
  {
    path: 'departments',
    canLoad: [AuthGuard],
    loadChildren: () => import('./pages/departments/departments.module').then(m => m.DepartmentsModule)
  },
  {
    path: 'documents',
    canLoad: [AuthGuard],
    loadChildren: () => import('./pages/documents/documents.module').then(m => m.DocumentsModule)
  },
  {
    path: 'group-roles',
    canLoad: [AuthGuard],
    loadChildren: () => import('./pages/group-roles/group-roles.module').then(m => m.GroupRolesModule)
  },
  {
    path: 'groups',
    canLoad: [AuthGuard],
    loadChildren: () => import('./pages/groups/groups.module').then(m => m.GroupsModule)
  },
  {
    path: 'staff',
    canLoad: [AuthGuard],
    loadChildren: () => import('./pages/staff/staff.module').then(m => m.StaffModule)
  },
  {
    path: 'students', canLoad: [AuthGuard],
    loadChildren: () => import('./pages/students/students.module').then(m => m.StudentsModule)
  },
  {
    path: 'users',
    canLoad: [AuthGuard],
    loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule)
  },
  {
    path: 'welcome',
    canLoad: [AuthGuard],
    loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule)
  },
  {
    path: 'workflows',
    canLoad: [AuthGuard],
    loadChildren: () => import('./pages/workflows/workflows.module').then(m => m.WorkflowsModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
