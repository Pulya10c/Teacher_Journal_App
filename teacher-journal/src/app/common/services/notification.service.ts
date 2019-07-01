import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class NotificationService {
  private notifications: Subject<NotificationModel> = new Subject<
    NotificationModel
  >();

  public getNotifications(): Subject<NotificationModel> {
    return this.notifications;
  }

  public showToast(info: NotificationModel): void {
    this.notifications.next(info);
  }
}

export class NotificationModel {
  public header: string;
  public description: string;
  public success: boolean;

  constructor(header: string, description: string, success: boolean) {
    this.header = header;
    this.description = description;
    this.success = success;
  }
}
