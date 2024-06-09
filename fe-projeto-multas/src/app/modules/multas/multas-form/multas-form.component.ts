import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MultasService } from 'src/app/services/multas.service';
import Swal from 'sweetalert2';
import { MultasDetailsComponent } from '../multas-details/multas-details.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-multas-form',
  templateUrl: './multas-form.component.html',
  styleUrl: './multas-form.component.scss'
})
export class MultasFormComponent {
  multaForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private multasService: MultasService,
    private dialog: MatDialog
  ) {
    this.multaForm = this.fb.group({
      numeroAit: ['', Validators.required],
      dataHoraInfracao: ['', Validators.required],
      codigoInfracao: ['', Validators.required],
      placaVeiculo: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.multaForm.valid) {
      this.postMulta();
    } else {
      console.log('Formulário inválido');
    }
  }

  async postMulta() {
    await this.multasService.postMulta(this.multaForm.value).subscribe({
      next: (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Sucesso',
          text: 'Registro inserido com sucesso',
          showConfirmButton: true
        });
      },
      error: (error) => {
        if (error.status === 409) {
          Swal.fire({
            icon: 'warning',
            title: 'Multa já cadastrada',
            showConfirmButton: true
          }).then(() => {
            this.openMultaDetails(this.multaForm.value.numeroAit);
          });
        }
      }
    });
  }

  listMultas() {
    window.location.href = '/multas/listar';
  }

  openMultaDetails(numeroAit: string): void {
    this.dialog.open(MultasDetailsComponent, {
      width: '400px',
      data: numeroAit
    });
  }
}
