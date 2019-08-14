import { Component } from "@angular/core";
import { NotificationModel } from "../../../common/services/notification.service";
import { NotificationService } from "../../../common/services/notification.service";

@Component({
  selector: "notification",
  templateUrl: "./notification.component.html",
  styleUrls: ["./notification.component.scss"]
})
export class NotificationComponent {
  private _notificationService: NotificationService;
  public notifications: Set<NotificationModel> = new Set<NotificationModel>();

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
