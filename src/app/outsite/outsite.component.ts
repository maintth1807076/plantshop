import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-outsite',
  templateUrl: './outsite.component.html',
  styleUrls: ['./outsite.component.css']
})
export class OutsiteComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  async ngAfterViewInit() {
    await this.loadScript('/assets/js/jquery.js');
    await this.loadScript('/assets/js/plugins.js');
    await this.loadScript('/assets/js/functions.js');
    await this.loadScript('/assets/plugins/range-slider/rangeslider.js');
    await this.loadScript('/assets/plugins/gmap3/gmap3.min.js');
    await this.loadScript('/assets/plugins/gmap3/map-styles.js');
    await this.loadScript('/assets/js/custom.js');

  }
  loadScript(scriptUrl: string) {
    return new Promise((resolve, reject) => {
      const scriptElement = document.createElement('script');
      scriptElement.src = scriptUrl;
      scriptElement.onload = resolve;
      document.body.appendChild(scriptElement);
    })
  }

}