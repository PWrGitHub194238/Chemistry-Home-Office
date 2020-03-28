import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { firebase, firebaseui, FirebaseUIModule } from "firebaseui-angular";
import { NgxSpinnerModule } from "ngx-spinner";
import { MaterialDesignModule } from "../material-design.module";
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";
import { LoginComponent } from "./login/login.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { RegisterComponent } from "./register/register.component";
import { SnackBarComponent } from "./snack-bar/snack-bar.component";
import { SpinnerComponent } from "./spinner/spinner.component";

const firebaseUiAuthConfig: firebaseui.auth.TenantConfig = {
  signInFlow: "popup",
  signInOptions: [
    {
      provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      scopes: ["public_profile", "email"]
    },
    {
      provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID
    }
  ],
  credentialHelper: firebaseui.auth.CredentialHelper.ACCOUNT_CHOOSER_COM
};

@NgModule({
  declarations: [
    LoginComponent,
    FooterComponent,
    HeaderComponent,
    PageNotFoundComponent,
    SpinnerComponent,
    RegisterComponent,
    SnackBarComponent
  ],
  imports: [
    CommonModule,
    MaterialDesignModule,
    FirebaseUIModule.forRoot(firebaseUiAuthConfig),
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ],
  exports: [
    LoginComponent,
    FooterComponent,
    HeaderComponent,
    PageNotFoundComponent,
    SpinnerComponent
  ]
})
export class PublicModule {}
