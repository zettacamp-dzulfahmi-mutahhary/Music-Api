import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { inject } from '@angular/core/testing';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Song, SongService } from '../song.service';

@Component({
  selector: 'app-add-song-dialog',
  templateUrl: './add-song-dialog.component.html',
  styleUrls: ['./add-song-dialog.component.scss'],
  // encapsulation: ViewEncapsulation.None,
})
export class AddSongDialogComponent implements OnInit, AfterViewInit {
  constructor(
    private songService: SongService,
    private elementRef: ElementRef,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddSongDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public song
  ) {}

  addSongForm: FormGroup;
  isEdit: boolean = this.song._id ? true : false;
  title = this.isEdit ? 'Edit' : 'Add';
  currentSong;

  formInit() {
    this.addSongForm = this.fb.group({
      name: [this.song.name, [Validators.required]],
      genre: [this.song.genre, [Validators.required]],
      duration: [this.song.duration, [Validators.required]],
    });
  }

  ngAfterViewInit(): void {}

  disableForm() {
    if (this.isEdit) {
      this.addSongForm.get('genre').disable();
      this.addSongForm.get('duration').disable();
    }
  }

  ngOnInit(): void {
    this.formInit();
    this.disableForm();
    this.currentSong = this.song;
    // this.isEdit = this.song.name ? true : false;
    console.log(this.song);
  }

  onCloseDialog() {
    this.dialogRef.close();
  }

  onSubmitDialog() {
    Swal.fire({
      title: 'Do you want to Add the Song?',
      showDenyButton: true,
      confirmButtonText: 'Add',
      denyButtonText: `Dont Add`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Saved!', '', 'success');
        this.songService.addSong(this.addSongForm.value).subscribe((res) => {
          console.log(res);
          this.dialogRef.close();
        });
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
        this.dialogRef.close();
      }
    });
  }

  onEditDialog() {
    const updatedSong = {
      song_id: this.song._id,
      name: this.addSongForm.value.name,
    };

    Swal.fire({
      title: 'Are You Sure to Edit this?',
      showDenyButton: true,
      confirmButtonText: 'Edit',
      denyButtonText: `Dont Edit`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Saved!', '', 'success');
        this.songService.editSong(updatedSong).subscribe((res) => {
          console.log(res);
          this.dialogRef.close();
        });
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
        this.dialogRef.close();
      }
    });
  }
}

export function openAddSongDialog(dialog: MatDialog, data?: Song) {
  const config = new MatDialogConfig();

  config.disableClose = true;
  config.autoFocus = true;
  config.panelClass = 'modal-panel';
  config.backdropClass = 'backdrop-modal-panel';
  const currentData = data ? data : '';
  config.data = {
    ...currentData,
  };

  const dialogRef = dialog.open(AddSongDialogComponent, config);

  return dialogRef.afterClosed();
}
