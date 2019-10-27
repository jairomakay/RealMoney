import { NgModule, LOCALE_ID } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";
import { IonicStorageModule } from "@ionic/storage";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { ComponentsModule } from "./components/components.module";

// mascara dos campos
import { BrMaskerModule } from "br-mask";
// banco local sqlite
import { SQLitePorter } from "@ionic-native/sqlite-porter/ngx";
import { SQLite } from "@ionic-native/sqlite/ngx";
// camera
import { Camera } from "@ionic-native/camera/ngx";
// lotificações locais
import { LocalNotifications } from "@ionic-native/local-notifications/ngx";

import localept from "@angular/common/locales/pt";
import { registerLocaleData } from "@angular/common";
registerLocaleData(localept, "pt");

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    ComponentsModule,
    BrMaskerModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SQLitePorter,
    SQLite,
    Camera,
    LocalNotifications,
    { provide: LOCALE_ID, useValue: "pt" },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
