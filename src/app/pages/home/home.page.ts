import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { PopoverController, ToastController } from "@ionic/angular";
import { PopoverComponent } from "src/app/components/popover/popover.component";

import { Chart } from "chart.js";
import { DataLocalService } from "../../services/data-local.service";
import { NotificationService } from "../../services/notification.service";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage implements OnInit {
  @ViewChild("doughnutCanvas", { static: true }) doughnutCanvas: ElementRef;
  // variavel dos charts
  doughnutChart: Chart;
  // saldo da conta
  saldo: number;
  // dizimo
  dizimo: number;
  monthExpense: Date;
  blurMonth: boolean = false;

  constructor(
    private popoverCtl: PopoverController,
    public dataLocal: DataLocalService,
    private toastController: ToastController,
    private localNotifi: NotificationService
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.monthExpense = new Date();
    // lista categoria por grupo
    this.listCategoryGroup();
    //cria gráfico de grupos
    this.graficPizza();
    // calcula primeiro o dízimo para adicionar no saldo
    this.getDizimo();
    // subtrai o dízimo do saldo
    this.getSaldo();
    // últimas despesas
    this.listExpensesLast();
  }

  async getSaldo() {
    await this.dataLocal.calcSaldoExpenses();
    this.saldo = this.dizimo
      ? this.dataLocal.saldo - this.dizimo
      : this.dataLocal.saldo;
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
  async graficPizza(month?: number) {
    let backgroundColor = [];
    let data = [];
    // carrega novamente os dados
    await this.dataLocal.getCategoryByGroupSumValue(month);

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
    // cria o gráfico com os dados
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
    // se não existir item emite mensagem
    if (this.dataLocal.groupCategoryValue.length <= 0) {
      this.showNotification("Não existe dados no mês selecionado!", false);
      return;
    }
  }

  // Ao clicar na no mês
  clickMonth() {
    this.blurMonth = true;
  }

  // evento ao selecionar o mês dos gastos
  selectMonthExpense(event) {
    if (this.blurMonth) {
      const date: Date = new Date(event.detail.value);
      const month: number = date.getMonth() + 1;
      this.graficPizza(month);
    }
  }

  // lista categoria agrupadas
  async listCategoryGroup() {
    await this.dataLocal.getCategoryByGroupSumValue();
  }

  // lista três últimos lançamento
  async listExpensesLast() {
    await this.dataLocal.getExpensesOrderDate();
  }

  // notificações
  private async showNotification(message: string, type: boolean) {
    const toast = await this.toastController.create({
      message,
      position: "top",
      duration: 2000,
      color: type ? "success" : "danger",
      buttons: [
        {
          text: "X",
          role: "cancel",
          handler: () => {
            console.log("Cancel clicked");
          }
        }
      ]
    });
    toast.present();
  }
}
