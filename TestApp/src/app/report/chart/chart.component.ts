import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import * as html2canvas from 'html2canvas';

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
    // $('canvas').height(300);
    // var ctx = $('canvas');
    // ctx.attr('height',500);
    // ctx.height = 500;
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
      responsive: false,
      maintainAspectRatio: false
    };
  }
  chart2img(){
    const chart = document.getElementById("chart");
    const dest = document.getElementById("imgoutput");
    // this.takeHighResScreenshot(chart,dest,20);
    html2canvas(document.getElementById('chart')).then(function(canvas) {
      var img = canvas.toDataURL("image/png");
      $('#imgoutput').attr("src",img);
      // console.log(img);
    });
  }
  takeHighResScreenshot(srcEl, destIMG, scaleFactor) {
    // Save original size of element
    const originalWidth = srcEl.offsetWidth;
    const originalHeight = srcEl.offsetHeight;
    // Force px size (no %, EMs, etc)
    srcEl.style.width = originalWidth + "px";
    srcEl.style.height = originalHeight + "px";

    // Position the element at the top left of the document because of bugs in html2canvas. The bug exists when supplying a custom canvas, and offsets the rendering on the custom canvas based on the offset of the source element on the page; thus the source element MUST be at 0, 0.
    // See html2canvas issues #790, #820, #893, #922
    // srcEl.style.position = "absolute";
    // srcEl.style.top = "0";
    // srcEl.style.left = "0";

    // Create scaled canvas
    const scaledCanvas = document.createElement("canvas");
    scaledCanvas.width = originalWidth * scaleFactor;
    scaledCanvas.height = originalHeight * scaleFactor;
    scaledCanvas.style.width = originalWidth + "px";
    scaledCanvas.style.height = originalHeight + "px";
    const scaledContext = scaledCanvas.getContext("2d");
    scaledContext.scale(scaleFactor, scaleFactor);

    html2canvas(srcEl, { canvas: scaledCanvas })
      .then(function(canvas) {
        destIMG.src = canvas.toDataURL("image/png");
        // srcEl.style.display = "none";
      });
  };
}
