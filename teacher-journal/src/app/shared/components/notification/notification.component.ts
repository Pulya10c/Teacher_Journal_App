import { Component } from "@angular/core";
import { NotificationModel } from "../../../common/services/notification.service";
import { NotificationService } from "../../../common/services/notification.service";

@Component({
  selector: "notification",
  templateUrl: "./notification.component.html",
  styleUrls: ["./notification.component.scss"]
})
export class NotificationComponent {
  private notifications: Set<NotificationModel> = new Set<NotificationModel>();
  private _notificationService: NotificationService;

  constructor(_notificationService: NotificationService) {
    this._notificationService = _notificationService;
    this._notificationService
      .getNotifications()
      .subscribe((notification: NotificationModel) => {
        this.notifications.add(notification);
        setTimeout(() => {
          this.closeNotification(notification);
        },         3000);
      });
  }

  public closeNotification(notification: NotificationModel): void {
    this.notifications.delete(notification);
  }
}
