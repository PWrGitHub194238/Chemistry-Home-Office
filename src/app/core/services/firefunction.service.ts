import { Injectable } from "@angular/core";
import { AngularFireFunctions } from "@angular/fire/functions";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { SentHomework } from "src/app/models";
import { UserDisplayDict, UserRecord } from "../models";

@Injectable({
  providedIn: "root"
})
export class FirefunctionService {
  private sendHomeworkSentNotificationEmailFunctionRef = this.fireFunctionsService.httpsCallable(
    "sendHomeworkSentNotificationEmail"
  );

  private cleanupCloudFirestoreFunctionRef = this.fireFunctionsService.httpsCallable(
    "cleanupCloudFirestore"
  );

  private getUserDataFunctionRef = this.fireFunctionsService.httpsCallable(
    "getUserData"
  );

  private updateUserDataFunctionRef = this.fireFunctionsService.httpsCallable(
    "updateUserData"
  );

  private removeUserDataFunctionRef = this.fireFunctionsService.httpsCallable(
    "removeUserData"
  );

  private resetUserPasswordFunctionRef = this.fireFunctionsService.httpsCallable(
    "resetUserPassword"
  );

  private verifyUserEmailFunctionRef = this.fireFunctionsService.httpsCallable(
    "verifyUserEmail"
  );

  private getUserAdminDetailsFunctionRef = this.fireFunctionsService.httpsCallable(
    "getUserAdminDetails"
  );

  private sendEmailFunctionRef = this.fireFunctionsService.httpsCallable(
    "sendEmail"
  );

  constructor(private fireFunctionsService: AngularFireFunctions) {}

  sendHomeworkSentNotificationEmail$(
    sentHomework: SentHomework
  ): Observable<SentHomework> {
    return this.sendHomeworkSentNotificationEmailFunctionRef({
      uid: sentHomework.uid
    }).pipe(
      map((resp: any) => {
        if (resp["error"]) {
          throw new Error(resp["error"]);
        } else {
          return resp as SentHomework;
        }
      })
    );
  }

  cleanupCloudFirestore$(adminUserUid: string): Observable<boolean> {
    return this.cleanupCloudFirestoreFunctionRef({ uid: adminUserUid }).pipe(
      map((resp: any) => {
        if (resp["error"]) {
          throw new Error(resp["error"]);
        } else {
          return resp["success"] as boolean;
        }
      })
    );
  }

  getUserData$(userUid: string): Observable<UserRecord> {
    return this.getUserDataFunctionRef({ uid: userUid }).pipe(
      map((resp: any) => {
        if (resp["error"]) {
          throw new Error(resp["error"]);
        } else {
          return resp as UserRecord;
        }
      })
    );
  }

  updateUserData$(
    adminUserUid: string,
    userUid: string,
    isUserDisabled: boolean,
    displayName: string
  ): Observable<UserRecord> {
    return this.updateUserDataFunctionRef({
      uid: adminUserUid,
      update_uid: userUid,
      disabled: isUserDisabled,
      displayName: displayName
    }).pipe(
      map((resp: any) => {
        if (resp["error"]) {
          throw new Error(resp["error"]);
        } else {
          return resp as UserRecord;
        }
      })
    );
  }

  removeUserData$(adminUserUid: string, userUid: string): Observable<boolean> {
    return this.removeUserDataFunctionRef({
      uid: adminUserUid,
      remove_uid: userUid
    }).pipe(
      map((resp: any) => {
        if (resp["error"]) {
          throw new Error(resp["error"]);
        } else {
          return resp["success"] as boolean;
        }
      })
    );
  }

  resetUserPassword$(
    userUid?: string,
    userEmail?: string
  ): Observable<boolean> {
    const body = {};

    if (userUid) {
      body["uid"] = userUid;
    }

    if (userEmail) {
      body["email"] = userEmail;
    }

    return this.resetUserPasswordFunctionRef(body).pipe(
      map((resp: any) => {
        if (resp["error"]) {
          throw new Error(resp.error.errorInfo.code);
        } else {
          return resp["success"] as boolean;
        }
      })
    );
  }

  verifyUserEmail$(userUid: string): Observable<boolean> {
    return this.verifyUserEmailFunctionRef({ uid: userUid }).pipe(
      map((resp: any) => {
        if (resp["error"]) {
          throw new Error(resp["error"]);
        } else {
          return resp["success"] as boolean;
        }
      })
    );
  }

  getUserAdminDetails$(adminUserUid: string): Observable<UserDisplayDict[]> {
    return this.getUserAdminDetailsFunctionRef({
      uid: adminUserUid
    }).pipe(
      map((resp: any) => {
        if (resp["error"]) {
          throw new Error(resp["error"]);
        } else {
          return resp["userDisplayArray"] as UserDisplayDict[];
        }
      })
    );
  }

  sendEmail$(
    adminUserUid: string,
    receiverName: string,
    receiveEmail: string,
    subject: string,
    htmlBody: string
  ): Observable<boolean> {
    return this.sendEmailFunctionRef({
      uid: adminUserUid,
      to_name: receiverName,
      to_address: receiveEmail,
      subject: subject,
      html: htmlBody
    }).pipe(
      map((resp: any) => {
        if (resp["error"]) {
          throw new Error(resp["error"]);
        } else {
          return resp["success"] as boolean;
        }
      })
    );
  }

  sendEmailByUid$(
    adminUserUid: string,
    receiverUid: string,
    subject: string,
    htmlBody: string
  ): Observable<boolean> {
    return this.sendEmailFunctionRef({
      uid: adminUserUid,
      to_uid: receiverUid,
      subject: subject,
      html: htmlBody
    }).pipe(
      map((resp: any) => {
        if (resp["error"]) {
          throw new Error(resp["error"]);
        } else {
          return resp["success"] as boolean;
        }
      })
    );
  }
}
