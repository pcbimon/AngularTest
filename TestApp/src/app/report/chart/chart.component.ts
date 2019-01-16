import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  typeChart: any;
  dataChart: any;
  optionsChart: any;
  constructor() { }

  ngOnInit() {
    this.linechart();
  }
  public  linechart(){
    this.typeChart = 'line';   ////// สามารถกำหนดเป็น 'line','bar','radar','pie','doughnut','polarArea','bubble','scatter'
    this.dataChart = {
      labels: ["January", "February", "March", "April", "May"],
      datasets: [
        {
          label: "My Stats Chart",
          data: [10, 30, 50, 30, 40],
          borderColor: ['rgba(54, 162, 235, 1)'],
          backgroundColor: ['rgba(0, 0, 0, 0)']
        }
      ]
    };
    this.optionsChart = {
      responsive: true,
      maintainAspectRatio: false
    };
  }
}
