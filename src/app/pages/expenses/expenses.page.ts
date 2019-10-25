import { Component, OnInit } from "@angular/core";
import {
  ActionSheetController,
  ToastController,
  NavController
} from "@ionic/angular";
import { DataLocalService } from "../../services/data-local.service";
import { Category } from "../../models/category.model";
import { Expense } from "../../models/expense.model";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";

@Component({
  selector: "app-expenses",
  templateUrl: "./expenses.page.html",
  styleUrls: ["./expenses.page.scss"]
})
export class ExpensesPage {
  // valor inical da categoria
  categorySelected: Category = new Category("Categoria");
  // instancia de documento
  componentCategory;
  expense: Expense = new Expense();
  value: string;
  saldo: Number;

  // opções da camera
  cameraOptions: CameraOptions = {
    quality: 20,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  };

  constructor(
    private actionSheetCtl: ActionSheetController,
    // tslint:disable-next-line:align
    private dataLocal: DataLocalService,
    // tslint:disable-next-line:align
    private toastController: ToastController,
    // tslint:disable-next-line:align
    private navCtl: NavController,
    // tslint:disable-next-line:align
    private camera: Camera
  ) {}

  ionViewWillEnter() {
    this.createComponentSheet();
    this.expense = new Expense();
    this.getSaldo();
  }

  async getSaldo() {
    await this.dataLocal.calcSaldoExpenses();
    this.saldo = this.dataLocal.saldo;
  }

  async onClickCategory() {
    const actionSheet = await this.actionSheetCtl.create({
      header: "Categorias",
      buttons: this.componentCategory
    });
    await actionSheet.present();
  }

  private async createComponentSheet() {
    await this.dataLocal.initCategory();
    this.componentCategory = this.initializateCategorys();
  }

  private initializateCategorys() {
    const categorys: Category[] = this.dataLocal.categorys;

    const componentCategory = categorys.map(cat => {
      return {
        text: cat.name,
        handler: () => {
          this.categorySelected = cat;
        }
      };
    });

    return componentCategory;
  }

  onClickSave() {
    if (!this.value) {
      this.showNotification("Digite o valor da despesa!", false);
      return;
    }
    if (this.categorySelected.name === "Categoria") {
      this.showNotification("Selecione a categoria!", false);
      return;
    }
    if (!this.expense.date) {
      this.showNotification("A data da despesa é obrigatória!", false);
      return;
    }

    // adicona os valores
    this.expense.value = parseFloat(
      this.value.replace(".", "").replace(",", ".")
    );
    this.expense.category = this.categorySelected;
    this.dataLocal.saveExpense(this.expense);
    this.navCtl.navigateForward("/home");
    this.showNotification("Despesa salva com sucesso!", true);
  }

  onClickImage() {
    this.camera.getPicture(this.cameraOptions).then(
      imageData => {
        const base64Image = "data:image/jpeg;base64," + imageData;
        this.expense.image = base64Image;
      },
      err => {
        console.log("error ao executa a camera", err);
      }
    );
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
