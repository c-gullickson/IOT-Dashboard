import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { LoginDashboardComponent } from './dashboard/login-dashboard/login-dashboard.component';
import { MainDashboardComponent } from './dashboard/main-dashboard/main-dashboard.component';
import { NavigationComponent } from './navigation/navigation/navigation.component';

const routes: Routes = [
  { path: '', redirectTo: 'navigation/home', pathMatch: 'full' },
  {
    path: 'navigation', component: NavigationComponent, children: [
      { path: 'home', component: MainDashboardComponent },
      { path: 'about', component: AboutComponent },
      { path: 'configuration', component: LoginDashboardComponent },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
