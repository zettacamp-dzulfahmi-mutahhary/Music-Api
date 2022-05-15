import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SongTableListComponent } from './song-table-list/song-table-list.component';
import { AddSongDialogComponent } from './add-song-dialog/add-song-dialog.component';
import { SongDetailPageComponent } from './song-detail-page/song-detail-page.component';
import { SharedModule } from '../shared/shared.module';





@NgModule({
  declarations: [
    SongTableListComponent,
    AddSongDialogComponent,
    SongDetailPageComponent,
    
    
    
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports:[
    SongTableListComponent,
    AddSongDialogComponent,
    SongDetailPageComponent,
    
  ]
})
export class SongModule { }
