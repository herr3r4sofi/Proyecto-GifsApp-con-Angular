import { Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { GifList } from "../../components/gif-list/gif-list";
import { GifListItem } from "../../components/gif-list/gif-list-item/gif-list-item";
import { GifsService } from "../../services/gifs.service";




@Component({
  selector: 'trending-page',
  //imports: [GifList],
  templateUrl: './trending-page.html',
})
export default class TrendingPageComponent {
  
  gifService = inject(GifsService);

  scrollDivRef = viewChild<ElementRef>('groupDiv');


  onScroll(event: Event) {
    const scrollDiv = this.scrollDivRef()?.nativeElement;

    console.log(scrollDiv);
  }
}
