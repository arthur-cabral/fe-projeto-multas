import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Multa } from '../../../models/multas/multaModel';
import { MultasService } from 'src/app/services/multas.service';

@Component({
  selector: 'app-multas-list',
  templateUrl: './multas-list.component.html',
  styleUrls: ['./multas-list.component.scss']
})
export class MultasListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'numeroAit', 'codigoInfracao', 'dataHoraInfracao', 'placaVeiculo', 'acoes'];
  dataSource = new MatTableDataSource<Multa>();

  constructor(
    private multasService: MultasService
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

  onEdit(id: number) {
    console.log(`Editar multa com ID: ${id}`);
  }

  onDelete(id: number) {
    console.log(`Excluir multa com ID: ${id}`);
    this.dataSource.data = this.dataSource.data.filter(multa => multa.multaId !== id);
  }
}