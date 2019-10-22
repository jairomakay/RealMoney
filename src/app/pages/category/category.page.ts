import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category.model';
import { ToastController, NavController } from '@ionic/angular';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {

  category: Category = new Category();

  constructor(private toastController: ToastController, private dataLocal: DataLocalService, private navCtrl: NavController) { }

  ngOnInit() {
    this.category = new Category();
  }

  selectBalance(event) {
    this.category.type = (event.detail.value === 'entrada' && event.detail.checked ? 'entrada' : 'saida');
  }

  onClickSave() {
    console.log(this.category);

    if (!this.category.name) {
      this.showNotification('O nome é obrigatório', false);
      return;
    }
    if (this.category.type === 'entrada' && !this.category.percentage) {
      this.showNotification('Adicione a porcentagem referente ao desconto de entrada!', false);
      return;
    }

    this.dataLocal.saveCategory(this.category);
    this.showNotification('Categoria salva com sucesso!', true);
    this.navCtrl.navigateForward('/home');
  }

  private async showNotification(message: string, type: boolean) {
    const toast = await this.toastController.create({
      message,
      position: 'top',
      duration: 2000,
      color: type ? 'success' : 'danger',
      buttons: [
        {
          text: 'X',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }

}
