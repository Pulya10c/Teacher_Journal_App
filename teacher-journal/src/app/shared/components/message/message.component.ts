import { Component, Input } from "@angular/core";

@Component({
  selector: "app-message",
  templateUrl: "./message.component.html",
  styleUrls: ["./message.component.scss"]
})
export class MessageComponent {
  @Input() public modalClose: Function;
  @Input() public message: string;
  @Input() public textMessage: string;

  public close(): void {
    this.modalClose();
  }
}
