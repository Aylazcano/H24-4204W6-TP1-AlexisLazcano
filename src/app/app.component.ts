import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Album } from 'src/models/Album';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'H24-4204W6-TP1-AlexisLazcano';

  // VARIABLES
  result: boolean = false;
  selectedAlbumResult: boolean = false;
  artist: string = "";
  albumImg: string = "";
  albumList: Album[] = [];
  selectedAlbum?: Album | null = null;
  tracks: string[] = [];
  apiKey: string = "9a8a3facebbccaf363bb9fd68fa37abf";

  // CONSTRUCTEURS
  constructor(public http: HttpClient) { }


  async searchArtistAlbums(): Promise<void> {
    try {
      // REQUÊTE HTTP
      let x = await lastValueFrom(this.http.get<any>("http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=" + this.artist + "&api_key=" + this.apiKey + "&format=json"));
      console.log(x);
      for (let a of x.topalbums.album) {
        this.albumList.push(new Album(a.name, a.image[2]["#text"], this.artist))
      }
      this.result = true;
    }
    catch (error) {
      console.error("Erreur lors de la recherche des albums de l'artiste:", error);
    }
  }

  async searchAlbumTracks(pAlbum: string, pArtist: string): Promise<void> {
    try {
      // REQUÊTE HTTP
      this.selectedAlbumResult = true;
      let x = await lastValueFrom(this.http.get<any>("http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=" + this.apiKey + "&artist=" + pArtist + "&album=" + pAlbum + "&format=json"));
      console.log(x);
      this.selectedAlbum = new Album(x.album.name, x.album.image[2]["#text"], x.album.artist);
      for(let a of x.album){
        this.tracks.push(a.tracks); 
      }
    } 
    catch (error) {
      console.error("Erreur lors de la recherche des chansons de l'album :", error);
    }
  }
  
  newSearch(): void {
    this.clearResults();
  }

  clearResults(): void {
    this.result = false;
    this.selectedAlbumResult = false;
    this.artist = "";
    this.albumImg = "";
    this.albumList = [];
    this.tracks = [];
  }

}
