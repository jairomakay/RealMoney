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

  scheduleNotification(title: string, text: string, delay: number) {
    this.localNotification.schedule({
      id: new Date().getTime(),
      title,
      text,
      smallIcon: "res://calendar",
      trigger: { at: new Date(new Date().getTime() + delay) }
    });
  }
}
