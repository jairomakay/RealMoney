import { Injectable } from "@angular/core";

import {
  LocalNotifications,
  ELocalNotificationTriggerUnit
} from "@ionic-native/local-notifications/ngx";
import { Platform } from "@ionic/angular";

@Injectable({
  providedIn: "root"
})
export class NotificationService {
  constructor(
    private plt: Platform,
    private localNotification: LocalNotifications
  ) {
    this.plt.ready().then(() => {
      this.localNotification.on("trigger").subscribe(resp => {});
    });
  }

  scheduleNotification(delay: number) {
    this.localNotification.schedule({
      title: "Aviso de contas que irão vencer :(",
      text: "4:15 - 5:15 PM\nBig Conference Room",
      smallIcon: "res://calendar",
      trigger: { at: new Date(new Date().getTime() + delay) }
    });
  }
}
