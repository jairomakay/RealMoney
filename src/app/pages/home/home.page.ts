import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { PopoverController } from "@ionic/angular";
import { PopoverComponent } from "src/app/components/popover/popover.component";

import { Chart } from "chart.js";
import { DataLocalService } from "../../services/data-local.service";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  @ViewChild("doughnutCanvas", { static: true }) doughnutCanvas: ElementRef;
  // variavel dos charts
  doughnutChart: Chart;
  // saldo da conta
  saldo: Number;
  // dizimo
  dizimo: Number;

  constructor(
    private popoverCtl: PopoverController,
    public dataLocal: DataLocalService
  ) {}

  ionViewWillEnter() {
    this.listCategoryGroup();
    this.graficPizza();
    this.getSaldo();
    this.getDizimo();
    this.listExpensesLast();
  }

  async getSaldo() {
    await this.dataLocal.calcSaldoExpenses();
    this.saldo = this.dataLocal.saldo;
  }

  async getDizimo() {
    await this.dataLocal.calcDizimo();
    this.dizimo = this.dataLocal.dizimo;
  }

  async presentPopover(event) {
    const popover = await this.popoverCtl.create({
      component: PopoverComponent,
      event,
      mode: "ios",
      animated: true
    });
    return await popover.present();
  }

  // cria o grafico de pizza de gastos por categoria
  async graficPizza() {
    let backgroundColor = [];
    let data = [];
    // carrega novamente os dados
    await this.dataLocal.getCategoryByGroupSumValue();

    backgroundColor = this.dataLocal.groupCategoryValue.map(gc => {
      if (gc.category.type === "entrada") {
        return;
      }
      return gc.category.color;
    });

    data = this.dataLocal.groupCategoryValue.map(gc => {
      if (gc.category.type === "entrada") {
        return;
      }
      return gc.value;
    });

    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: "doughnut",
      data: {
        datasets: [
          {
            backgroundColor,
            data
          }
        ]
      },
      options: {
        responsive: true
      }
    });
  }

  // lista categoria agrupadas
  async listCategoryGroup() {
    await this.dataLocal.getCategoryByGroupSumValue();
  }

  async listExpensesLast() {
    await this.dataLocal.getExpensesOrderDate();

    console.log(this.dataLocal.lastExpenses);
  }
}
