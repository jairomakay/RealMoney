import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from 'src/app/components/popover/popover.component';

import { Chart } from 'chart.js';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {

  @ViewChild('doughnutCanvas', { static: true }) doughnutCanvas: ElementRef;

  doughnutChart: Chart;

  constructor(private popoverCtl: PopoverController, private dataLocal: DataLocalService) { }

  ngOnInit() {
    this.graficPizza();
    this.dataLocal.getCategoryByGroupSumValue();
  }

  async presentPopover(event) {
    const popover = await this.popoverCtl.create({
      component: PopoverComponent,
      event,
      mode: 'ios',
      animated: true
    });
    return await popover.present();
  }

  graficPizza() {
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        datasets: [
          {
            label: 'Population (millions)',
            backgroundColor: ['#3e95cd', '#8e5ea2', '#3cba9f', '#e8c3b9', '#c45850'],
            data: [2478, 5267, 734, 784, 433]
          }
        ]
      }
    });
  }


}
