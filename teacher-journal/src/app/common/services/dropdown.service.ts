import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class DropdownService {
  protected dataList: {subject: string; datesCheckedSource: number[]}[] = [];
  protected sourceCheckList: Subject<{subject: string; datesCheckedSource: number[]}[]> =
  new Subject<{subject: string; datesCheckedSource: number[]}[]>();

  public setSourceCheckList(source: string[]): void {
    const dataList: {subject: string; datesCheckedSource: number[]}[] = source.reduce(
      (acc: {subject: string; datesCheckedSource: number[]}[] , item: string):
      {subject: string; datesCheckedSource: number[]}[] => {

      const result: string[] = item.split("-&&&-");
      if (acc.find(name => name.subject === result[0])) {
        acc.forEach(
          (subject, idx) => subject.subject === result[0] ? acc[idx].datesCheckedSource.push(+result[1]) : undefined);
      } else {
        acc.push({
          subject: result[0],
          datesCheckedSource: [+result[1]],
        });
      }
      return acc;
    },[]);
    this.dataList = dataList;
    this.sourceCheckList.next(dataList);
  }
  public getSourceCheckList(): Subject<{subject: string; datesCheckedSource: number[]}[]> {
    return this.sourceCheckList;
  }

  public getDataList(): {subject: string; datesCheckedSource: number[]}[] {
    return this.dataList;
  }
}
