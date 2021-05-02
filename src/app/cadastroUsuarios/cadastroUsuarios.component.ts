import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClientService} from '../service/httpclient.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './cadastroUsuarios.component.html',
  styleUrls: ['./cadastroUsuarios.component.css']
})

export class CadastroUsuariosComponent implements OnInit {

  constructor( private httpClientService: HttpClientService,
               private snackBar: MatSnackBar,
               private router: Router) {}

  displayedColumns: string[] = ['nome', 'email', 'endereco', 'numero', 'CEP'];
  dataSource: MatTableDataSource<Usuario>;

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

  ngOnInit() {

    this.httpClientService.getUsuarios().subscribe(
      response => {
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      } ,
    );
  }
}
