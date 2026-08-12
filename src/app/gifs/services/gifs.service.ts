import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import type { GiphyResponse } from '../interfaces/giphy.interfaces';
import { GifMapper } from '../mapper/gif.mapper';
import { Gif } from '../interfaces/gif.interface';
import { map, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GifsService {

  private http = inject(HttpClient);

  trendingGifs = signal<Gif[]>([]);
  trendingGifsLoading = signal(true);

  searchHistory = signal<Record<string, Gif[]>>({});
  serchHistoryKeys = computed(() => Object.keys(this.searchHistory()));


  constructor() {
    this.loadTrendingGifs();
    console.log("Servico Creado");

  }

  loadTrendingGifs() {
    this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`, {
      params: {
        api_key: environment.giphyapiKey,
        limit: 20,
      },
    })
      .subscribe((resp) => {
        const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data)
        this.trendingGifs.set(gifs);
        this.trendingGifsLoading.set(false)

        console.log({ gifs });
      });
  }

  searchGifs(query: string) {
    return this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`, {
      params: {
        api_key: environment.giphyapiKey,
        limit: 20,
        q: query,
      },
    }).pipe(map(({ data }) => data),
      map((items) => GifMapper.mapGiphyItemsToGifArray(items)),

      tap((items) => {
        this.searchHistory.update((history) => ({
          ...history,
          [query.toLocaleLowerCase()]: items,
        }));
      })
    );



    //.subscribe(( resp ) => {
    //  const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data)

    //  console.log({ search: gifs });
    //});
  }
}
