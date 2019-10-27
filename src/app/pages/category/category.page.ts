import { Component, OnInit } from "@angular/core";
import { Category } from "../../models/category.model";
import { ToastController, NavController } from "@ionic/angular";
import { DataLocalService } from "../../services/data-local.service";

@Component({
  selector: "app-category",
  templateUrl: "./category.page.html",
  styleUrls: ["./category.page.scss"]
})
export class CategoryPage {
  category: Category = new Category();
  viewColor = false;
  // lista de corres
  public colorList: any[] = [
    { key: "flame", value: "#e45a33", friendlyName: "Flame" },
    { key: "orange", value: "#fa761e", friendlyName: "Orange" },
    { key: "infrared", value: "#ef486e", friendlyName: "Infrared" },
    { key: "male", value: "#4488ff", friendlyName: "Male Color" },
    { key: "female", value: "#ff44aa", friendlyName: "Female Color" },
    { key: "paleyellow", value: "#ffd165", friendlyName: "Pale Yellow" },
    { key: "gargoylegas", value: "#fde84e", friendlyName: "Gargoyle Gas" },
    { key: "androidgreen", value: "#9ac53e", friendlyName: "Android Green" },
    {
      key: "carribeangreen",
      value: "#05d59e",
      friendlyName: "Carribean Green"
    },
    { key: "bluejeans", value: "#5bbfea", friendlyName: "Blue Jeans" },
    {
      key: "cyancornflower",
      value: "#1089b1",
      friendlyName: "Cyan Cornflower"
    },
    { key: "warmblack", value: "#06394a", friendlyName: "Warm Black" }
  ];

  listCategory: Category[] = [];

  constructor(
    private toastController: ToastController,
    // tslint:disable-next-line:align
    private dataLocal: DataLocalService,
    // tslint:disable-next-line: align
    private navCtrl: NavController
  ) {}

  ionViewWillEnter() {
    this.category = new Category();
    this.viewColor = false;
    this.listCategorys();
  }

  selectBalance(event) {
    this.category.type =
      event.detail.value === "entrada" && event.detail.checked
        ? "entrada"
        : "saida";
  }

  onClickSave() {
    console.log(this.category);

    if (!this.category.name) {
      this.showNotification("O nome é obrigatório", false, "top");
      return;
    }
    if (!this.category.color) {
      this.showNotification("Adicione uma cor para a categoria!", false, "top");
      return;
    }
    if (this.category.type === "entrada" && !this.category.percentage) {
      this.showNotification(
        "Adicione a porcentagem referente ao desconto de entrada!",
        false,
        "top"
      );
      return;
    }

    this.dataLocal.saveCategory(this.category);
    this.showNotification("Categoria salva com sucesso!", true, "bottom");
    this.navCtrl.navigateForward("/home");
  }

  onClickViewColor() {
    this.viewColor = true;
  }

  selectColor(color) {
    console.log("cor", color);
    this.category.color = color.value;
  }

  async listCategorys() {
    await this.dataLocal.initCategory();
    this.listCategory = this.dataLocal.categorys;
  }

  async onClickDelete(category: Category) {
    console.log("categoria", category);
    await this.dataLocal.deleteCategory(category);
    this.listCategorys();
    this.showNotification("Categoria excluida!", true, "top");
  }

  private async showNotification(message: string, type: boolean, position) {
    const toast = await this.toastController.create({
      message,
      position: position,
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
