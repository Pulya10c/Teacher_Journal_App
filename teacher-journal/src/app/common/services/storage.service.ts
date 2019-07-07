import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class StorageService {
  // constructor() {}

  public setSaveStorage(sortName: string, isRevers: boolean): void {
    localStorage.setItem("Jurnal_App", JSON.stringify({"sortName": sortName, "revers": isRevers}));
  }

  public getValueStorage(): {sortName: string, revers: boolean} {
    return JSON.parse(localStorage.getItem("Jurnal_App"));
  }
}
