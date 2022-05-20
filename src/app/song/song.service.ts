import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

export interface Song {
  _id: string;
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
      _id: '1',
      name: 'Test1',
      genre: 'Rock',
      duration: 3.25,
      created_by: { name: 'corn' },
    },

    {
      _id: '2',
      name: 'Test2',
      genre: 'Pop',
      duration: 3.25,
      created_by: { name: 'corn' },
    },

    {
      _id: '3',
      name: 'Test3',
      genre: 'Dangdut',
      duration: 3.25,
      created_by: { name: 'corn' },
    },

    {
      _id: '4',
      name: 'Test4',
      genre: 'Rock',
      duration: 3.25,
      created_by: { name: 'corn' },
    },

    {
      _id: '5',
      name: 'Test5',
      genre: 'Pop',
      duration: 3.25,
      created_by: { name: 'corn' },
    },

    {
      _id: '6',
      name: 'Test6',
      genre: 'Dangdut',
      duration: 3.25,
      created_by: { name: 'corn' },
    },

    {
      _id: '7',
      name: 'Test7',
      genre: 'Rock',
      duration: 3.25,
      created_by: { name: 'corn' },
    },

    {
      _id: '8',
      name: 'Test8',
      genre: 'Pop',
      duration: 3.25,
      created_by: { name: 'corn' },
    },

    {
      _id: '9',
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

  getAllSongs(songlistInput: { limit: number; page: number }): Observable<any> {
    return this.apollo.query({
      query: gql`
        query Query($songlistInput: Pagination) {
          getAllSongs(songlist_input: $songlistInput) {
            count
            songs {
              _id
              name
              genre
              duration
              created_by {
                _id
                name
                user_type
              }
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

  getFilteredSongs(songlistInput: {
    name: string;
    genre: string;
    duration: number;
    creator_name: string;
  }) {
    return this.apollo.query({
      query: gql`
        query GetSongFilter($songlistInput: SongListFilterInput) {
          getSongFilter(songlist_input: $songlistInput) {
            _id
            name
            genre
            duration
            created_by {
              _id
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

  getSortSongs(songlistInput: {
    name: string;
    genre: string;
    creator_name: string;
  }) {
    return this.apollo.query({
      query: gql`
        query GetSongSort($songlistInput: SongListSortInput) {
          getSongSort(songlist_input: $songlistInput) {
            _id
            name
            genre
            duration
            created_by {
              _id
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

  editSong(songlistInput: { song_id: string; name: string, genre: string, duration: number }) {
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
      `,
      variables: {
        id,
      },
    });
  }
}
