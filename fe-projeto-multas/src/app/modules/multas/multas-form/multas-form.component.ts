import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MultasService } from 'src/app/services/multas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-multas-form',
  templateUrl: './multas-form.component.html',
  styleUrl: './multas-form.component.scss'
})
export class MultasFormComponent {
  multaForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private multasService: MultasService
  ) {
    this.multaForm = this.fb.group({
      numeroAit: ['', Validators.required],
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
        console.log(error)
        Swal.fire({
          icon: 'error',
          title: 'Erro ao cadastrar multa',
          text: error.error,
          showConfirmButton: true
        });
      }
    });
  }

  listMultas() {
    window.location.href = '/multas/listar';
  }
}
