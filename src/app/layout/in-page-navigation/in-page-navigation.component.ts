import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  Input,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';

export interface InPageNavigationLink {
  id: string;
  label: string;
}

@Component({
  selector: 'app-in-page-navigation',
  templateUrl: './in-page-navigation.component.html',
  styleUrls: ['./in-page-navigation.component.css'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class InPageNavigationComponent implements OnInit, OnDestroy {
  @Input() links: InPageNavigationLink[] = [];
  @Input() title = 'On this page:';
  @Input() headerHeight = 80;

  private routerSub?: Subscription;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Scroll to top on every route change
    this.routerSub = this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => {
        window.scrollTo({ top: 0, behavior: 'auto' });
      });
  }

  ngOnDestroy(): void {
    this.routerSub?.unsubscribe();
  }

  handleAnchorClick(event: Event, id: string): void {
    event.preventDefault();

    const element = document.getElementById(id);
    if (!element) return;

    const elementTop = element.getBoundingClientRect().top + window.scrollY;
    const scrollTop = elementTop - this.headerHeight;

    window.scrollTo({ top: scrollTop, behavior: 'smooth' });
    window.history.pushState(null, '', `#${id}`);
  }
}
