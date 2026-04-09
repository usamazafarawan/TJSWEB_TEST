import { Component } from "@angular/core";
import { NbIconLibraries } from "@nebular/theme";

import { getMenuItems, MENU_ITEMS } from "./pages-menu";

@Component({
  selector: "ngx-pages",
  styleUrls: ["pages.component.scss"],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent {
  constructor(private iconLibraries: NbIconLibraries) {
    this.iconLibraries.registerFontPack("fa", {
      packClass: "fa",
      iconClassPrefix: "fa",
    });
    this.iconLibraries.registerFontPack("fas", {
      packClass: "fas",
      iconClassPrefix: "fa",
    });
    this.iconLibraries.registerFontPack("fad", {
      packClass: "fad",
      iconClassPrefix: "fa",
    });
    this.iconLibraries.registerFontPack("fal", {
      packClass: "fal",
      iconClassPrefix: "fa",
    });
    this.iconLibraries.registerFontPack("far", {
      packClass: "far",
      iconClassPrefix: "fa",
    });
  }
  menu = getMenuItems(); //MENU_ITEMS;
}
