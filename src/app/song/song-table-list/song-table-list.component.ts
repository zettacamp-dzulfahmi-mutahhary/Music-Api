import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { debounceTime, startWith, tap } from 'rxjs';
import Swal from 'sweetalert2';
import { openAddSongDialog } from '../add-song-dialog/add-song-dialog.component';
import { Song, SongService } from '../song.service';

@Component({
  selector: 'app-song-table-list',
  templateUrl: './song-table-list.component.html',
  styleUrls: ['./song-table-list.component.scss'],
})
export class SongTableListComponent implements OnInit, AfterViewInit {
  constructor(
    private songService: SongService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  isLoading = false;
  dataCount = 0;
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  dataSource = new MatTableDataSource<Song>();
  columnsDisplayed = ['name', 'genre', 'duration', 'created_by', 'actions'];
  columnsFilter = [
    'nameFilter',
    'genreFilter',
    'durationFilter',
    'created_byFilter',
    'blank',
  ];

  onFetchData() {
    
    const pagination = {
      limit: this.paginator.pageSize ? this.paginator.pageSize : 5,
      page: this.paginator.pageIndex ? this.paginator.pageIndex : 0,
    };
    this.isLoading = true;
    this.songService.getAllSongs(pagination)
    .pipe(debounceTime(1000))
    .subscribe((data) => {
      this.dataSource.data = data.data.getAllSongs.songs;
      this.isLoading = false;
      this.paginator.length = data.data.getAllSongs.count;
      this.dataCount = data.data.getAllSongs.count;
    });
  }

  addSong() {
    openAddSongDialog(this.dialog);
  }

  editSong(data: Song) {
    openAddSongDialog(this.dialog, data);
  }

  onDetails(id: string) {
    // alert('clicked')
    this.router.navigate(['detail/', id]);
  }

  onDelete(id: string) {
    console.log(id);

    Swal.fire({
      title: 'Are You Sure Want To Delete This Song?',
      showDenyButton: true,
      confirmButtonText: 'DELETE',
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.songService.deleteSong(id).subscribe((res) => {
          console.log(`Deleted ${res}`);
          Swal.fire('Deleted!', '', 'success').then((res) => {
            this.onFetchData();
          });
        });
      } else if (result.isDenied) {
        Swal.fire('Deletion is Canceled', '', 'info');
      }
    });
  }
  ngOnInit(): void {
    this.onFetchData();
  }

  ngAfterViewInit(): void {
    this.paginator.page
      .pipe(
        startWith(null),
        tap(() => {
          this.onFetchData();
        })
      )
      .subscribe((res) => {});
    // this.dataSource.paginator = this.paginator;
  }
}
