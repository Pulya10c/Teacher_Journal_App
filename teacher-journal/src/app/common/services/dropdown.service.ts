import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { IDropdown } from "../entities/dropdown";

@Injectable({
  providedIn: "root"
})
export class DropdownService {
  // protected dataList: IDropdown[] = [];
  // protected sourceCheckList: Subject<IDropdown[]> = new Subject<
  //   IDropdown[]
  // >();

  public setSourceCheckList(source: string[]): IDropdown[] {
    return source.reduce((acc: IDropdown[], item: string): IDropdown[] => {
      const result: string[] = item.split("-&&&-");
      if (acc.find(name => name.subject === result[0])) {
        acc.forEach((subject, idx) => (subject.subject === result[0] ? acc[idx].datesCheckedSource.push(+result[1]) : undefined));
      } else {
        acc.push({
          subject: result[0],
          datesCheckedSource: [+result[1]]
        });
      }
      return acc;
    }, []);
  }
  // public getSourceCheckList(): Subject<IDropdown[]> {
  //   return this.sourceCheckList;
  // }

  public getDataList(data: IDropdown[]): string[] {
    return (data).reduce((acc, item) => {
      acc = [...acc, ...item.datesCheckedSource.map(el => (el ? `${item.subject}--${el}` : item.subject))];
      return acc;
    }, []);
  }
}
