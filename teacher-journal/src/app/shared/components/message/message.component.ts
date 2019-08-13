import { Component, Input } from "@angular/core";
import { ABOUT_AS } from "../../../common/constants/about-as";

@Component({
  selector: "app-message",
  templateUrl: "./message.component.html",
  styleUrls: ["./message.component.scss"]
})
export class MessageComponent {
  @Input() public message: string;
  // constructor() {}
}
