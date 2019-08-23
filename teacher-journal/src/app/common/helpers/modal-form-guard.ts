import swal from "sweetalert";
import { Observable, from } from "rxjs";

export default function runModalDialog(title: string, text: string): Observable<boolean> {

  const promis: Promise<boolean> = swal({
    title,
    text,
    icon: "warning",
    buttons: ["Cancel", true],
    dangerMode: true
  });

  return from(promis);
}
