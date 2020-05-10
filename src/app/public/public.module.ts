import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { firebase, firebaseui, FirebaseUIModule } from "firebaseui-angular";
import { MaterialDesignModule } from "../material-design.module";
import { SharedModule } from "../shared/shared.module";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { SnackBarComponent } from "./snack-bar/snack-bar.component";
import { UpdateUserDetailsBottomSheetComponent } from "./update-user-details-bottom-sheet/update-user-details-bottom-sheet.component";

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
    SharedModule,
    ReactiveFormsModule
  ]
})
export class PublicModule {}
