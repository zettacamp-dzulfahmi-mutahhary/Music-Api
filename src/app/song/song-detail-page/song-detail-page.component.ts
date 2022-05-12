import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Song, SongService } from '../song.service';

@Component({
  selector: 'app-song-detail-page',
  templateUrl: './song-detail-page.component.html',
  styleUrls: ['./song-detail-page.component.scss'],
})
export class SongDetailPageComponent implements OnInit {
  constructor(
    private songService: SongService,
    private route: ActivatedRoute
  ) {}
  song;
  idSong: string;

  // Ditanya Soal ini

  ngOnInit(): void {
    this.idSong = this.route.snapshot.params['id'];
    this.songService
      .getSong(this.idSong)
      .pipe(map((res) => res.data))
      .subscribe((res) => {
        this.song = res;
      });
  }
}
