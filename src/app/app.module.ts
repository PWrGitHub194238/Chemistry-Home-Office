import { registerLocaleData } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import localePl from "@angular/common/locales/pl";
import { LOCALE_ID, NgModule } from "@angular/core";
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireFunctionsModule, ORIGIN } from "@angular/fire/functions";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { FlexLayoutModule } from "@angular/flex-layout";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatCarouselModule } from "@ngmodule/material-carousel";
import { environment } from "src/environments/environment";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CoreModule } from "./core/core.module";
import { MaterialDesignModule } from "./material-design.module";
import { PublicModule } from "./public/public.module";
import { SharedModule } from "./shared/shared.module";

registerLocaleData(localePl, "pl");

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    AngularFireFunctionsModule,
    CoreModule,
    PublicModule,
    SharedModule,
    MaterialDesignModule,
    FlexLayoutModule,
    HttpClientModule,
    MatCarouselModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: "pl"
    },
    {
      provide: ORIGIN,
      useValue: "https://chemistry-home-office.firebaseapp.com"
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
