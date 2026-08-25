import { AfterViewInit, Component, ElementRef, inject, viewChild } from '@angular/core';
import { GifsService } from "../../services/gifs.service";
import { ScrollStateService } from 'src/app/services/scroll-state.service';



@Component({
  selector: 'trending-page',
  //imports: [GifList],
  templateUrl: './trending-page.html',
})
export default class TrendingPageComponent implements AfterViewInit {
  gifService = inject(GifsService);
  scrollStateService = inject(ScrollStateService);


  scrollDivRef = viewChild<ElementRef>('groupDiv');

  ngAfterViewInit(): void {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if (!scrollDiv) return;

    scrollDiv.scrollTop = this.scrollStateService.trendingScrollState();
  }

  onScroll(event: Event) {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if (!scrollDiv) return;

    const scrollTop = scrollDiv.scrollTop;
    const clientHeight = scrollDiv.clientHeight;
    const scrollHeight = scrollDiv.scrollHeight;
    

    // console.log({ scrollTotal: scrollTop + clientHeight, scrollHeight });
    const isAtBottom = scrollTop + clientHeight + 300 >= scrollHeight;
    this.scrollStateService.trendingScrollState.set(scrollTop);

    if (isAtBottom) {
      this.gifService.loadTrendingGifs();
    }
  }
}
