import { Component } from "@angular/core";
import { PopoverController } from "@ionic/angular";
import { PopoverComponent } from "src/app/components/popover/popover.component";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  constructor(private popoverCtl: PopoverController) {}

  async presentPopover(event) {
    const popover = await this.popoverCtl.create({
      component: PopoverComponent,
      event: event,
      mode: "ios",
      animated: true
    });
    return await popover.present();
  }
}
