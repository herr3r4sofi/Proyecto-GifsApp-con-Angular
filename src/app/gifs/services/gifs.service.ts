import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import type { GiphyResponse } from '../interfaces/giphy.interfaces';

@Injectable({providedIn: 'root'})
export class GifsService {

  private http = inject(HttpClient)
  trendingGifs = signal<Gif[]>([]);

  constructor(){

this.loadTrendingGifs();  

    
  }

  loadTrendingGifs(){
    this.http.get<GiphyResponse>(`${ environment.giphyUrl}/gifs/trending`, {
      params: {
        api_key: environment.giphyapiKey,
        limit: 20,

      },
    })
    .subscribe(( resp ) => {
      const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
      this.trendingGifs.set(gifs);

      console.log({ gifs });

    })


  }
}
