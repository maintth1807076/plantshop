import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css']
})
export class SellerComponent implements OnInit {
id: any;
  constructor() { }

  ngOnInit(): void {
    console.log(this.id);
  }

  async ngAfterViewInit() {
    await this.loadScript('/assets/plugins/popper/popper.min.js');
    await this.loadScript('/assets/js/jquery.js');
    await this.loadScript('/assets/js/plugins.js');
    await this.loadScript('/assets/js/functions.js');
    await this.loadScript('https://cdn.jsdelivr.net/npm/select2@4.1.0-beta.1/dist/js/select2.min.js');
    await this.loadScript('/assets/plugins/moment/moment.min.js');
    await this.loadScript('/assets/js/scripts.js');
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
