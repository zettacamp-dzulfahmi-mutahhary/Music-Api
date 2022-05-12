import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

export interface Song {
  id?: string;
  name: string;
  genre: string;
  duration: number;
  created_by: {};
}

@Injectable({
  providedIn: 'root',
})
export class SongService {
  songList: Song[] = [
    {
      id: '1',
      name: 'Test1',
      genre: 'Rock',
      duration: 3.25,
      created_by: { name: 'corn' },
    },

    {
      id: '2',
      name: 'Test2',
      genre: 'Pop',
      duration: 3.25,
      created_by: { name: 'corn' },
    },

    {
      id: '3',
      name: 'Test3',
      genre: 'Dangdut',
      duration: 3.25,
      created_by: { name: 'corn' },
    },

    {
      id: '4',
      name: 'Test4',
      genre: 'Rock',
      duration: 3.25,
      created_by: { name: 'corn' },
    },

    {
      id: '5',
      name: 'Test5',
      genre: 'Pop',
      duration: 3.25,
      created_by: { name: 'corn' },
    },

    {
      id: '6',
      name: 'Test6',
      genre: 'Dangdut',
      duration: 3.25,
      created_by: { name: 'corn' },
    },

    {
      id: '7',
      name: 'Test7',
      genre: 'Rock',
      duration: 3.25,
      created_by: { name: 'corn' },
    },

    {
      id: '8',
      name: 'Test8',
      genre: 'Pop',
      duration: 3.25,
      created_by: { name: 'corn' },
    },

    {
      id: '9',
      name: 'Test9',
      genre: 'Dangdut',
      duration: 3.25,
      created_by: { name: 'corn' },
    },
  ];

  constructor(private apollo: Apollo) {}

  songs$ = new BehaviorSubject<Song[]>(this.songList);
  songsObs$ = this.songs$.asObservable();

  // getAllSongs(): Observable<Song[]>{
  //   return this.songsObs$;
  // }

  getAllSongsNoPage(): Observable<any> {
    return this.apollo.query({
      query: gql`
        query {
          getAllSongs {
            _id
            name
            genre
            duration
            created_by {
              name
            }
          }
        }
      `,
    });
  }

  getAllSongs(songlistInput: { limit: number; skip: number }): Observable<any> {
    return this.apollo.query({
      query: gql`
        query GetSongById($songlistInput: Pagination) {
          getAllSongs(songlist_input: $songlistInput) {
            _id
            name
            genre
            duration
            created_by {
              name
            }
          }
        }
      `,
      fetchPolicy: 'network-only',
      variables: {
        songlistInput,
      },
    });
  }

  getSong(id: string) {
    return this.apollo.query({
      query: gql`
        query GetSongById($id: ID!) {
          getSongById(songlist_input: { song_id: $id }) {
            _id
            name
            genre
            duration
            created_by {
              name
            }
          }
        }
      `,
      variables: {
        id,
      },
    });
  }

  addSong(songlistInput: Song) {
    return this.apollo.mutate({
      mutation: gql`
        mutation InsertSongList($songlistInput: SongListInput) {
          insertSongList(songlist_input: $songlistInput) {
            name
            genre
            duration
          }
        }
      `,
      variables: {
        songlistInput,
      },
    });
  }

  editSong(songlistInput: { song_id: string; name: string }) {
    return this.apollo.mutate({
      mutation: gql`
        mutation UpdateSong($songlistInput: SongListEditInput) {
          updateSong(songlist_input: $songlistInput) {
            _id
            name
            genre
            duration
            created_by {
              name
            }
          }
        }
      `,
      variables: {
        songlistInput,
      },
    });
  }

  deleteSong(id: string) {
    return this.apollo.mutate({
      mutation: gql`
        mutation DeleteSong($id: ID!) {
          deleteSong(songlist_input: { song_id: $id }) {
            _id
            name
          }
        }
      `,variables:{
        id
      }
    });
  }
}
