/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NbTokenService } from "@nebular/auth";
import { NbMenuService } from "@nebular/theme";
import { AnalyticsService } from "./@core/utils/analytics.service";
import { SeoService } from "./@core/utils/seo.service";

@Component({
  selector: "ngx-app",
  template: "<router-outlet></router-outlet>",
})
export class AppComponent implements OnInit {
  constructor(
    private analytics: AnalyticsService,
    private seoService: SeoService,
    private menuService: NbMenuService,
    private tokenService:NbTokenService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.analytics.trackPageViews();
    this.seoService.trackCanonicalChanges();
    this.menuService.onItemClick()
      .subscribe((event) => {
        this.onContecxtItemSelection(event.item.title);
      });
  }

  onContecxtItemSelection(title) {
    if (title == 'Log out') {
      this.tokenService.clear();
      localStorage.removeItem('token');
      localStorage.removeItem('access-token');
      this.router.navigate(['auth']);
    }
  }
}
