import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login/login-page/login-page.component';
import { SongDetailPageComponent } from './song/song-detail-page/song-detail-page.component';
import { SongTableListComponent } from './song/song-table-list/song-table-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path: 'login', component: LoginPageComponent},
  {path: 'song', component: SongTableListComponent},
  {path: 'detail/:id', component: SongDetailPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
