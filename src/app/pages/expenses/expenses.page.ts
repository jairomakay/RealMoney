import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { DataLocalService } from '../../services/data-local.service';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.page.html',
  styleUrls: ['./expenses.page.scss']
})
export class ExpensesPage implements OnInit {

  // valor inical da categoria
  categorySelected = 'Categoria';
  componentCategory;


  constructor(private actionSheetCtl: ActionSheetController, private dataLocal: DataLocalService) {

  }

  ngOnInit() {
    this.dataLocal.saveCategory('Casa');
    this.dataLocal.saveCategory('Mercado');
    this.dataLocal.saveCategory('Carro');

    this.componentCategory = this.initializateCategorys();
  }

  async onClickCategory() {
    const actionSheet = await this.actionSheetCtl.create({
      header: 'Categorias',
      buttons: this.componentCategory
    });
    await actionSheet.present();
  }

  initializateCategorys() {
    const categorys: Category[] = this.dataLocal.categorys;

    const componentCategory = categorys.map(cat => {
      return {
        text: cat.name,
        handler: () => {
          this.categorySelected = cat.name;
        }
      }
    });

    return componentCategory;
  }
}
