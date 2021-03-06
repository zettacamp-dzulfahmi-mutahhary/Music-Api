import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, startWith, tap } from 'rxjs';
import { LoginServiceService } from 'src/app/login/login-service.service';

import { SharedService } from 'src/app/shared/shared.service';
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
    private router: Router,
    private shared: SharedService,
    private fb: FormBuilder,
    public loginService: LoginServiceService
  ) {}
  currentUser: any = this.shared.currentUser;
  isLoggedIn = false;
  isLoading = false;
  errorMessage = '';
  dataCount = 0;
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  filterForm: FormGroup;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource = new MatTableDataSource<Song>();
  columnsDisplayed = ['name', 'genre', 'duration', 'created_by', 'actions'];
  columnsFilter = [
    'nameFilter',
    'genreFilter',
    'durationFilter',
    'created_byFilter',
    'blank',
  ];

  onFormInit() {
    this.filterForm = this.fb.group({
      nameFilter: [''],
      genreFilter: [''],
      durationFilter: [],
      created_byFilter: [''],
    });
  }

  onFetchData() {
    const pagination = {
      limit: this.paginator.pageSize ? this.paginator.pageSize : 5,
      page: this.paginator.pageIndex ? this.paginator.pageIndex : 0,
    };
    this.isLoading = true;
    this.songService
      .getAllSongs(pagination)
      .pipe(debounceTime(1000))
      .subscribe({
        next: (data) => {
          this.dataSource.data = data.data.getAllSongs.songs;
          this.isLoading = false;
          this.paginator.length = data.data.getAllSongs.count;
          this.dataCount = data.data.getAllSongs.count;
        },
        error: (err) => {
          console.log(err);
          this.isLoading = false;
          this.errorMessage = 'Somethings Wrong...I Can Feel It';
          this.router.navigate(['login'])
        },
      });
  }

  addSong() {
    if (!this.currentUser.user_type) {
      console.log(this.currentUser);
      Swal.fire({
        icon: 'error',
        title: 'Cannot Access!',
        text: 'You Must Log In First!',
        footer: '<a href="" routerLink="[/login]" >Login</a>',
      });
      return;
    }

    if (this.currentUser.user_type !== 'Administrator') {
      console.log(this.currentUser);
      Swal.fire({
        icon: 'error',
        title: 'Cannot Access!',
        text: 'You Are Not The Administrator!',
      });
      return;
    }

    openAddSongDialog(this.dialog);
  }

  editSong(data: any) {
    if (this.currentUser.id !== data.created_by._id) {
      Swal.fire({
        icon: 'error',
        title: 'Cannot Edit',
        text: 'You Are Not The Creator of This Song!',
      });
      return;
    }

    openAddSongDialog(this.dialog, data);
  }

  onDetails(id: string) {
    // alert('clicked')
    this.router.navigate(['detail/', id]);
  }

  onDelete(data: any) {
    if (this.currentUser.id !== data.created_by._id) {
      Swal.fire({
        icon: 'error',
        title: 'Cannot Delete',
        text: 'You Are Not The Creator of This Song!',
      });
      return;
    }

    Swal.fire({
      title: 'Are You Sure Want To Delete This Song?',
      showDenyButton: true,
      confirmButtonText: 'DELETE',
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.songService.deleteSong(data._id).subscribe((res) => {
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

  onSearchFilter() {
    this.filterForm.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe(
        ({ nameFilter, genreFilter, durationFilter, created_byFilter }) => {
          this.songService
            .getFilteredSongs({
              name: nameFilter,
              genre: genreFilter,
              duration: durationFilter,
              creator_name: created_byFilter,
            })
            .subscribe({
              next: (res) => {
                console.log(res);
                this.dataSource.data = res.data['getSongFilter'];
                console.log(res.data);
              },
              error: (err) => console.log(err.data),
            });
        }
      );
  }

  onSortSong() {
    console.log(this.sort.active);
    console.log(this.sort.direction);
    const sortValue = {
      name: this.sort.active == 'name' ? this.sort.direction : null,
      genre: this.sort.active == 'genre' ? this.sort.direction : null,
      creator_name:
        this.sort.active == 'created_by' ? this.sort.direction : null,
    };
    this.songService.getSortSongs(sortValue).subscribe({
      next: (res) => {
        console.log(res);
        this.dataSource.data = res.data['getSongSort'];
      },
      error: (err) => console.log(err),
    });
  }

  onReset() {
    this.filterForm.setValue({
      nameFilter: '',
      genreFilter: '',
      durationFilter: null,
      created_byFilter: '',
    });
    this.paginator.pageSize = 5;
    this.paginator.pageIndex = 0;
    this.onFetchData();
  }

  ngOnInit(): void {
    this.loginService.isLoggedInObs.subscribe(
      (login) => (this.isLoggedIn = login)
    );
    this.onFormInit();
    this.onFetchData();
    
  }

  ngAfterViewInit(): void {
    this.sort.sortChange
      .pipe(
        tap(() => {
          this.onSortSong();
        })
      )
      .subscribe();

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
