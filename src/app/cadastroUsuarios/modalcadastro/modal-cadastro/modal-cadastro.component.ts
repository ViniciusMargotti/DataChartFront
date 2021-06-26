import {Component, Inject, OnInit} from '@angular/core';
import {Chart} from 'chart.js';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent, MatSnackBar} from '@angular/material';
import {AbstractControl, FormControl} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {GraficoService} from '../../grafico.service';
import canvasToImage from 'canvas-to-image';
import {Color} from '@angular-material-components/color-picker';

@Component({
  selector: 'app-modal-cadastro',
  templateUrl: './modal-cadastro.component.html',
  styleUrls: ['./modal-cadastro.component.css']
})
export class ModalCadastroComponent implements OnInit {


  constructor( @Inject(MAT_DIALOG_DATA) public data,
               private snackBar: MatSnackBar,
               private graficoService: GraficoService,
               public dialogRef: MatDialogRef<ModalCadastroComponent>,
              ) {
  }

  readonly separatorKeysCodesCampo: number[] = [ENTER, COMMA];
  readonly separatorKeysCodesValor: number[] = [ENTER, COMMA];

  typesGrafico = [
    {value: 1, viewValue: 'Linha'},
    {value: 2, viewValue: 'Barra'},
    {value: 4, viewValue: 'Pizza'}
  ];

  selectableCampo = true;
  removableCampo = true;
  addOnBlurCampo = true;

  selectableValor = true;
  removableValor = true;
  addOnBlurValor = true;

  LineChart = [];
  PieChart = [];
  BarChart = [];
  label = this.data.titulo ? this.data.titulo : '';
  color = this.data.cor ? this.data.cor : '';
  labels = this.data.campos ? this.data.campos.split(',') : ['Janeiro', 'Fevereiro'];
  valores = this.data.valores ? this.data.valores.split(',') : ['1', '5'];
  touchUi: false;
  type = this.data.tipoGrafico ? this.data.tipoGrafico : 1;

  colorCtr = new FormControl(this.data.id ? this.getCor() : null);
  border = this.data.borda ? this.data.borda : 5;

  ngOnInit() {
      this.generateGrafico();
  }

  generateGrafico() {
    setTimeout(() => {
      if (this.type === 1) {
        this.generateLine();
      }
      if (this.type === 2) {
        this.generateBar();
      }
      if (this.type === 4) {
        this.generatePie();
      }

    }, 100);
  }
  getCor() {
    if (this.data && this.data.cor !== '') {
      const temp = this.hexToRgb(this.data && this.data.cor !== '' ? this.data.cor : '');
      return  new Color(temp.r, temp.g, temp.b);
    } else {
      return null;
    }
  }

  hexToRgb(hex) {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => {
      return r + r + g + g + b + b;
    });
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  generateLine() {
    this.LineChart = new Chart('lineChartCadastro', {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: [{
          label: this.label,
          data: this.valores,
          fill: false,
          lineTension: 0.5,
          borderColor: this.colorCtr.value,
          borderWidth: this.border
        }]
      },
      options: {
        title: {
          text: 'Line Chart',
          display: true
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  generateBar() {
    this.BarChart = new Chart('barChartCadastro', {
      type: 'bar',
      data: {
        labels: this.labels,
        datasets: [{
          label: this.label,
          data: this.valores,
          backgroundColor: [],
          borderColor: [],
          borderWidth: 1
        }]
      },
      options: {
        title: {
          text: this.label,
          display: true
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
    this.setBackgroud(this.type);
    // @ts-ignore
    this.BarChart.update();

  }

  generatePie() {
    this.PieChart = new Chart('pieChartCadastro', {
      type: 'pie',
      data: {
        labels: this.labels,
        datasets: [{
          label: this.label,
          data: this.valores,
          backgroundColor: [],
          borderColor: [],
          borderWidth: 1
        }]
      },
      options: {
        title: {
          text: this.label,
          display: true
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
    this.setBackgroud(this.type);
    // @ts-ignore
    this.PieChart.update();
  }

  saveGrafico() {

    const idUsuario =  sessionStorage.getItem('UserId');

    // tslint:disable-next-line:no-debugger
    debugger;
    let color = '';
    if ( this.type === 1 ) {
      color = this.colorCtr.value.hex;
    }

    const grafico: Grafico = {
      id: this.data.id,
      cor: color,
      borda: this.border,
      valores: this.valores.toString(),
      campos: this.labels.toString(),
      idUsuario: Number(idUsuario),
      titulo: this.label,
      tipoGrafico: this.type
    };

    this.graficoService.saveGrafico(grafico).subscribe(
      data => {
        this.snackBar.open('Gráfico cadastrado com sucesso!', 'Ok', {
          duration: 5000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });

        this.dialogRef.close();
      },
      response => {
        this.snackBar.open(response.error.errors[0].message, 'Ok', {
          duration: 5000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      }
    );
  }

  removeCampo(label: string): void {
    const index = this.labels.indexOf(label);

    if (index >= 0) {
       this.labels.splice(index, 1);
    }

    this.generateGrafico();
  }

  addCampo(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;


    if ((value || '').trim()) {
      this.labels.push(value.trim());
    }

    this.generateGrafico();

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeValor(label: string): void {
    const index = this.valores.indexOf(label);

    if (index >= 0) {
      this.valores.splice(index, 1);
    }

    this.generateGrafico();
  }

  addValor(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.valores.push(value.trim().replace(',', '.'));
    }

    this.generateGrafico();

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }


  setBackgroud(type) {

    if (type === 2) {
      // @ts-ignore
      this.BarChart.data.datasets[0].backgroundColor = [];
      // @ts-ignore
      this.BarChart.data.datasets[0].data.forEach(() => {
        const color = this.getRandomColor();
        // @ts-ignore
        this.BarChart.data.datasets[0].backgroundColor.push(color);
        // @ts-ignore
        this.BarChart.data.datasets[0].borderColor.push(color);
      });
    }

    if (type === 4) {
      // @ts-ignore
      this.PieChart.data.datasets[0].backgroundColor = [];
      // @ts-ignore
      this.PieChart.data.datasets[0].data.forEach(() => {
        const color = this.getRandomColor();
        // @ts-ignore
        this.PieChart.data.datasets[0].backgroundColor.push(color);
        // @ts-ignore
        this.PieChart.data.datasets[0].borderColor.push(color);
      });
    }
  }

  getRandomColor() {

    const letters = '0123456789ABCDEF'.split('');
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  downloadAsImage(e, imageName = 'null') {

    e.preventDefault();

    const canvasEl = document.querySelector("[id*='Chart']");

    canvasToImage(canvasEl, {
      name: imageName,
      type: 'png',
      quality: 1
    });

  }

}
