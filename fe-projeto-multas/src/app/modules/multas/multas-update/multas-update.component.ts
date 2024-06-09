import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MultasService } from 'src/app/services/multas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-multas-update',
  templateUrl: './multas-update.component.html',
  styleUrl: './multas-update.component.scss'
})
export class MultasUpdateComponent {
  editForm: FormGroup;
  multaId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private multaService: MultasService
  ) {
    this.editForm = this.fb.group({
      multaId: ['', Validators.required],
      numeroAIT: ['', Validators.required],
      codigoInfracao: ['', Validators.required],
      dataHoraInfracao: ['', Validators.required],
      placaVeiculo: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.multaId = +this.route.snapshot.paramMap.get('id')!;
    this.loadMulta();
  }

  loadMulta(): void {
    this.multaService.getMultaById(this.multaId).subscribe(multa => {
      this.editForm.patchValue(multa);
    });
  }

  onSubmit(): void {
    if (this.editForm.valid) {
      this.multaService.putMulta(this.multaId, this.editForm.value).subscribe({
        next: () => {
          Swal.fire('Sucesso!', 'Multa atualizada com sucesso!', 'success');
          this.router.navigate(['/multas/listar']);
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Erro ao atualizar multa',
            text: error.error,
            showConfirmButton: true
          }).then(() => {
            window.location.reload();
          });
        }
      });
    }
  }
}
