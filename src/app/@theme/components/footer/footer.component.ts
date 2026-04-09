import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">
      Copyright © {{ year }} The Jewel Software. All Rights Reserved.
    </span>
    <div class="socials">
      <a href="https://www.youtube.com/channel/UCDoieZGhDcHztJyaCM5sKBA" target="_blank" class="ion ion-social-youtube"></a>
      <a href="https://www.instagram.com/thejewelsoftware/" target="_blank" class="ion ion-social-instagram"></a>
    </div>
  `,
})
export class FooterComponent {
  year: number = new Date().getFullYear();
}
