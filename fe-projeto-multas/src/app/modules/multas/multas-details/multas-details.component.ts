import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Multa } from 'src/app/models/multas/multaModel';
import { MultasService } from 'src/app/services/multas.service';

@Component({
  selector: 'app-multas-details',
  templateUrl: './multas-details.component.html',
  styleUrl: './multas-details.component.scss'
})
export class MultasDetailsComponent {
  multa: any = {};

  constructor(
    public dialogRef: MatDialogRef<MultasDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private multasService: MultasService
  ) { }

  async ngOnInit() {
    console.log(this.data)
    await this.getMultaByAIT(this.data);
  }

  async getMultaByAIT(numeroAit: string) {
    await this.multasService.getMultaByAIT(numeroAit).subscribe({
      next: (response) => {
        this.multa = response;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
