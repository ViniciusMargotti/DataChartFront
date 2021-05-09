import {Component, OnInit} from '@angular/core';
import {Chart} from 'chart.js';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent, MatSnackBar} from '@angular/material';
import {AbstractControl, FormControl} from '@angular/forms';
import {  MatDialog  , MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {GraficoService} from '../../grafico.service';

@Component({
  selector: 'app-modal-cadastro',
  templateUrl: './modal-cadastro.component.html',
  styleUrls: ['./modal-cadastro.component.css']
})
export class ModalCadastroComponent implements OnInit {

  constructor(private snackBar: MatSnackBar,
              private graficoService: GraficoService,
              public dialogRef: MatDialogRef<ModalCadastroComponent>) {
  }

  readonly separatorKeysCodesCampo: number[] = [ENTER, COMMA];
  readonly separatorKeysCodesValor: number[] = [ENTER, COMMA];

  selectableCampo = true;
  removableCampo = true;
  addOnBlurCampo = true;

  selectableValor = true;
  removableValor = true;
  addOnBlurValor = true;

  LineChart = [];
  label = '';
  labels = ['Janeiro', 'Fevereiro'];
  valores = ['9', '7'];
  touchUi: false;
  color: 'red';

  colorCtr: AbstractControl = new FormControl(null);
  border = 5;

  ngOnInit() {
    this.generateGrafico();
  }


  saveGrafico() {

    const idUsuario = sessionStorage.getItem('UserId');

    const grafico: Grafico = {
      id: null,
      cor: this.colorCtr.value.hex,
      borda: this.border,
      valores: this.valores.toString(),
      campos: this.labels.toString(),
      idUsuario: Number(idUsuario),
      titulo: this.label
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

    // Add our fruit
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


  generateGrafico() {
    this.LineChart = new Chart('lineChart2', {
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
}
