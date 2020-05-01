import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { firebase, firebaseui, FirebaseUIModule } from "firebaseui-angular";
import { NgxSpinnerModule } from "ngx-spinner";
import { MaterialDesignModule } from "../material-design.module";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { SnackBarComponent } from "./snack-bar/snack-bar.component";
import { SpinnerComponent } from "./spinner/spinner.component";
import { UpdateUserDetailsBottomSheetComponent } from "./update-user-details-bottom-sheet/update-user-details-bottom-sheet.component";
import { HomeComponent } from "./home/home.component";
import { RouterModule } from "@angular/router";

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
    SpinnerComponent,
    RegisterComponent,
    SnackBarComponent,
    UpdateUserDetailsBottomSheetComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialDesignModule,
    FirebaseUIModule.forRoot(firebaseUiAuthConfig),
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ],
  exports: [LoginComponent, SpinnerComponent]
})
export class PublicModule {}
