import { Component, Input } from "@angular/core";
import { ABOUT_AS } from "../../../common/constants/about-as";

@Component({
  selector: "app-message",
  templateUrl: "./message.component.html",
  styleUrls: ["./message.component.scss"]
})
export class MessageComponent {
  @Input() public modalClose: Function;
  @Input() public message: string;
  public text: string = ABOUT_AS;

  public close(): void {
    this.modalClose();
  }
}
