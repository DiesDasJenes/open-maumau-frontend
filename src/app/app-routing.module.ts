import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LobbyPageComponent } from './lobby-page/lobby-page.component';

export const BasePath = 'maumau';
export const LobbyPage = `${BasePath}/lobby/:id`;

const routes: Routes = [
  { path: '', redirectTo: BasePath, pathMatch: 'full' },
  { path: BasePath, component: LandingPageComponent },
  { path: LobbyPage, component: LobbyPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
