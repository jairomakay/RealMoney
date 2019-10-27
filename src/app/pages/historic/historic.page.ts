import { Component, OnInit } from "@angular/core";
import { DataLocalService } from "src/app/services/data-local.service";
import { Expense } from "src/app/models/expense.model";
import { ToastController } from "@ionic/angular";

@Component({
  selector: "app-historic",
  templateUrl: "./historic.page.html",
  styleUrls: ["./historic.page.scss"]
})
export class HistoricPage {
  date: Date;
  listHistoric: Expense[] = [];

  constructor(
    public dataLocal: DataLocalService,
    private toastController: ToastController
  ) {}

  ionViewWillEnter() {
    this.actionGetHistoric(new Date());
  }

  async selectDate(event) {
    if (event.detail.value) {
      console.log(event.detail.value);
      const date = new Date(event.detail.value);
      this.actionGetHistoric(date);
    }
  }

  async onClickDelete(expense) {
    console.log("despesa", expense);
    await this.dataLocal.deleteExpense(expense);
    this.actionGetHistoric(new Date());
    this.date = new Date();
    this.showNotification("Despesa deletada!", true);
  }

  async actionGetHistoric(date: Date) {
    await this.dataLocal.getHistoricExpenses(date);
    this.listHistoric = this.dataLocal.listHistoricExpenses;
  }

  // lista três últimos lançamento
  async listExpensesLast() {
    await this.dataLocal.getExpensesOrderDate();
  }

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
