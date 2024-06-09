import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Multa } from '../../../models/multas/multaModel';
import { MultasService } from 'src/app/services/multas.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-multas-list',
  templateUrl: './multas-list.component.html',
  styleUrls: ['./multas-list.component.scss']
})
export class MultasListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'numeroAit', 'codigoInfracao', 'dataHoraInfracao', 'placaVeiculo', 'acoes'];
  dataSource = new MatTableDataSource<Multa>();

  constructor(
    private multasService: MultasService,
    private router: Router
  ) {
    this.dataSource = new MatTableDataSource<Multa>();
  }

  async ngOnInit() {
    await this.getAllMultas();
  }

  async getAllMultas() {
    await this.multasService.getAllMultas().subscribe(multas => {
      this.dataSource.data = multas;
    });
  }

  onEdit(multaId: number): void {
    this.router.navigate(['/multas/editar', multaId]);
  }

  async onDelete(id: number) {
    await this.multasService.getMultaById(id).subscribe({
      next: (multa) => {
        Swal.fire({
          title: 'Excluir multa',
          text: `Deseja realmente excluir a multa de placa ${multa.placaVeiculo}?`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sim',
          cancelButtonText: 'Não'
        }).then((result) => {
          if (result.isConfirmed) {
            this.deleteMulta(id);
          }
        });
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Erro ao excluir multa',
          text: error.error,
          showConfirmButton: true
        });
      }
    });
  }

  async deleteMulta(id: number) {
    await this.multasService.deleteMulta(id).subscribe({
      next: () => {
        this.getAllMultas();
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Erro ao excluir multa',
          text: 'Você não tem permissão para excluir multas',
          showConfirmButton: true
        });
      }
    });
  }
}