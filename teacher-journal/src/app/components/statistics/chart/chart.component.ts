import { Component, Input, ChangeDetectionStrategy } from "@angular/core";

import { ChartOptions, ChartType } from "chart.js";
import { Label, SingleDataSet } from "ng2-charts";

@Component({
  selector: "app-chart",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./chart.component.html",
  styleUrls: ["./chart.component.scss"]
})
export class ChartComponent {
  @Input() public marksListView: { nameSubject: string; marksList: number[] }[];

  public pieChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      arc: {
        borderColor: "#000",
        borderWidth: 0
      }
    },
    tooltips: {
      bodyFontSize: 18
    },
    legend: {
      position: "bottom",
      fullWidth: true,
      labels: {
        padding: 16,
        boxWidth: 20,
        fontSize: 16,
        fontStyle: "normal",
        fontColor: "#fff"
      }
    }
  };

  public pieChartLabels: Label[] = [];
  public pieChartData: SingleDataSet = [];
  public pieChartType: ChartType = "pie";
  public pieChartLegend: boolean = true;
  public pieChartBorderColor: string = "#000";

  public onIsViewLegend(): void {
    this.pieChartLegend = !this.pieChartLegend;
  }

  public ngOnChanges(): void {
    const { name, marks } = this.marksListView.reduce(
      (acc: { name: string[]; marks: number[] }, { nameSubject, marksList }: { nameSubject: string; marksList: number[] }) => {
        acc.name = [...acc.name, nameSubject];
        acc.marks = [
          ...acc.marks,
          +marksList
            .reduce(
              (average, num, idx, arr) => {
                return average + num / arr.length;
              },
              // tslint:disable-next-line: align
              0
            )
            .toFixed(0)
        ];
        return acc;
        // tslint:disable-next-line: align
      },
      { name: [], marks: [] }
    );
    this.pieChartLabels = name;
    this.pieChartData = marks;
  }
}
