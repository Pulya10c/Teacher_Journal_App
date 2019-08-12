import { Component, NgModule } from "@angular/core";
import { TreeviewItem } from "ngx-treeview/src/treeview-item";
import { TreeviewConfig } from "ngx-treeview/src/treeview-config";
import { selectSubjects, selectDropdown } from "src/app/redux/selectors/combine.selectors";
import { takeUntil } from "rxjs/operators";
import { select, Store } from "@ngrx/store";
import { IState } from "src/app/common/entities/state";
import { ISubject } from "src/app/common/entities/subject";
import { Subject, Observable } from "rxjs";
import { TreeviewModule } from "ngx-treeview";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { DropdownService } from "src/app/common/services/dropdown.service";
import { setDropdownListDate } from 'src/app/redux/actions/dropdown.action';

@Component({
  selector: "statistics-subjects",
  templateUrl: "./statistics-subjects.component.html",
  styleUrls: ["./statistics-subjects.component.scss"]
})
@NgModule({
  imports: [TreeviewModule, BrowserModule, FormsModule]
})
export class StatisticsSubjectsComponent {
  private subjects: ISubject[];
  private store: Store<IState>;
  private componentDestroyed$: Subject<any> = new Subject();
  private dateListOld: string[] = [];
  public values: string[];
  public config: TreeviewConfig = TreeviewConfig.create({
    hasAllCheckBox: true,
    hasFilter: true,
    hasCollapseExpand: true,
    decoupleChildFromParent: false,
    maxHeight: 390
  });

  public buttonClass: string = "btn-outline-secondary";
  public items: TreeviewItem[] = [];
  public dropdownService: DropdownService;

  constructor(store: Store<IState>, dropdownService: DropdownService) {
    this.dropdownService = dropdownService;
    this.store = store;
    this.store
      .pipe(
        select(selectDropdown),
        takeUntil(this.componentDestroyed$)
      )
      .subscribe(data => {
        this.dateListOld = this.dropdownService.getDataList(data);
      });
  }

  public onSelectedChange(event: string[]): void {
    this.values = [...event];
  }

  public ngOnInit(): void {
    this.store
      .pipe(
        select(selectSubjects),
        takeUntil(this.componentDestroyed$)
      )
      .subscribe(data => {
        if (data.length) {
          this.subjects = data;
          this.items = this.subjects
            .filter(item => item.marks.length)
            .map(item => {
              if (item.marks.length === 0) {
                return;
              } else {
                return new TreeviewItem({
                  text: item.nameSubject,
                  value: item.nameSubject,
                  children: item.marks.map(el => {
                    return new TreeviewItem({
                      text: new Date(el.date).getDate() + "/" + new Date(el.date).getMonth() + "/" + new Date(el.date).getFullYear(),
                      value: `${item.nameSubject}-&&&-${el.date.toString()}`,
                      checked: this.dateListOld.includes(`${item.nameSubject}--${el.date.toString()}`) ? true : false
                    });
                  })
                });
              }
            });
        }
      });
  }

  public ngOnDestroy(): void {
    this.store.dispatch(setDropdownListDate({
      dropdownList: this.dropdownService.setSourceCheckList(this.values)
    }));
    console.log(this.dropdownService.setSourceCheckList(this.values));
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }
}
