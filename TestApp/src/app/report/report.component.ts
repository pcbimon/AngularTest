import { Component, OnInit } from '@angular/core';
import printJS from 'print-js'
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  typeChart: any;
  dataChart: any;
  optionsChart: any;
  constructor() { }

  ngOnInit() {
    this.linechart();
  }

  testprint(){
    //
    // document.getElementById("btn").style.visibility = "hidden";
    // window.print();
    // const getPrint = window.open(document.URL, '_blank');
    // const hidebtn = document.getElementsByClassName("btn");

    let doc = new jsPDF("p", "mm", "a4");

    const source = document.getElementById("printinput");
    var margins = {
      top: 25,
      bottom: 60,
      left: 20,
      width: 522
    };

    doc.text('Hello world!', 10, 10);
    doc.addPage('a4','l');
    doc.text('Hello world!', 10, 10);
    doc.addHTML(document.body, margins.top, margins.left, {}, function() {
      doc.save('test.pdf');
    });
    // doc.save('a4.pdf');
  }
  printWithCss() {
    //Works with Chome, Firefox, IE, Safari
    //Get the HTML of div
    var title = document.title;
    var divElements = document.getElementById('printinput').innerHTML;
    var printWindow = window.open("", "_blank", "");
    //open the window
    printWindow.document.open();
    //write the html to the new window, link to css file
    printWindow.document.write('<html><head><title>' + title + '</title><style> button{display: none;}</style><body>');
    printWindow.document.write(divElements);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.focus();
    //The Timeout is ONLY to make Safari work, but it still works with FF, IE & Chrome.
    setTimeout(function() {
      printWindow.print();
      printWindow.close();
    }, 100);
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
      // maintainAspectRatio: false,
      // bezierCurve : false,
      // onAnimationComplete: done

    };
  }

}
