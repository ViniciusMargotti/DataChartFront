import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {HttpClientService} from '../service/httpclient.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatSort} from '@angular/material';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';
import {Chart} from 'chart.js';
import {ModalCadastroComponent} from './modalcadastro/modal-cadastro/modal-cadastro.component';
import {AuthenticationService} from '../service/authentication.service';
import {GraficoService} from './grafico.service';

@Component({
  selector: 'app-employee',
  templateUrl: './cadastroUsuarios.component.html',
  styleUrls: ['./cadastroUsuarios.component.css']
})

export class CadastroUsuariosComponent implements OnInit {

  constructor(private snackBar: MatSnackBar,
              private router: Router,
              public dialog: MatDialog,
              private graficoService: GraficoService) {
  }

  displayedColumns: string[] = ['Título', 'Tipo', 'action'];
  dataSource: MatTableDataSource<Grafico>;
  LineChart = [];
  PieChart = [];
  BarChart = [];

  @ViewChild(MatSort, {}) sort: MatSort;
  @ViewChild(MatPaginator, {}) paginator: MatPaginator;

  logout() {
    this.snackBar.open('Volte logo!', 'Ok', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
    this.router.navigate(['logout']);
  }

  getGraficos() {
    this.graficoService.getGraficos().subscribe(
      response => {
        // tslint:disable-next-line:no-debugger
        debugger;
        this.dataSource = new MatTableDataSource(response);
      },
    );
  }

  ngOnInit() {
    this.getGraficos();
    // Line chart:
    //  this.LineChart = new Chart('lineChart', {
    //   type: 'line',
    //   data: {
    //     labels: ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    //     datasets: [{
    //       label: 'Number of Items Sold in Months',
    //       data: [9, 7, 3, 5, 2, 10, 15, 16, 19, 3, 1, 9],
    //       fill: false,
    //       lineTension: 0.5,
    //       borderColor: 'blue',
    //       borderWidth: 1
    //     }]
    //   },
    //   options: {
    //     title: {
    //       text: 'Line Chart',
    //       display: true
    //     },
    //     scales: {
    //       yAxes: [{
    //         ticks: {
    //           beginAtZero: true
    //         }
    //       }]
    //     }
    //   }
    // });

    // Bar chart:
    // this.BarChart = new Chart('barChart', {
    //   type: 'bar',
    //   data: {
    //     labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    //     datasets: [{
    //       label: '# of Votes',
    //       data: [9, 7, 3, 5, 2, 10],
    //       backgroundColor: ['rgba(255, 99, 132, 0.2)'],
    //       borderWidth: 1
    //     }]
    //   },
    //   options: {
    //     title: {
    //       text: 'Bar Chart',
    //       display: true
    //     },
    //     scales: {
    //       yAxes: [{
    //         ticks: {
    //           beginAtZero: true
    //         }
    //       }]
    //     }
    //   }
    // });

    // pie chart:
//     this.PieChart = new Chart('pieChart', {
//       type: 'pie',
//       data: {
//         labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//         datasets: [{
//           label: '# of Votes',
//           data: [9, 7, 3, 5, 2, 10],
//           backgroundColor: [],
//           borderColor: [],
//           borderWidth: 1
//         }]
//       },
//       options: {
//         title: {
//           text: 'Bar Chart',
//           display: true
//         },
//         scales: {
//           yAxes: [{
//             ticks: {
//               beginAtZero: true
//             }
//           }]
//         }
//       }
//     });
  }

  setBackgroud() {
    // @ts-ignore
    this.PieChart.data.datasets[0].data.forEach(() => {
      // @ts-ignore
      this.PieChart.data.datasets[0].backgroundColor.push(this.getRandomColor());
    });
  }

  getRandomColor() {

    const letters = '0123456789ABCDEF'.split('');
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  openDialog(grafico) {
    this.dialog.open(ModalCadastroComponent, {
      data: grafico
    }).afterClosed().subscribe(() => this.getGraficos());
    ;
  }
}


