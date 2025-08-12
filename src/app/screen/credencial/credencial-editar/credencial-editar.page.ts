import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonButton, IonContent, IonIcon, IonLabel, LoadingController, ModalController, ToastController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { cloudDoneOutline, lockClosedOutline, mailOutline, personOutline } from 'ionicons/icons';
import { PlataformaPage } from 'src/app/component/modal/plataforma/plataforma.page';
import { CredencialModel } from 'src/app/model/credencial.model';
import { CredencialService } from 'src/app/service/credencial.service';

@Component({
  selector: 'app-credencial-editar',
  templateUrl: './credencial-editar.page.html',
  styleUrls: ['./credencial-editar.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonContent, IonLabel, IonIcon, IonButton]
})
export class CredencialEditarPage implements OnInit {

  private activatedRoute = inject(ActivatedRoute);

  private credencialService = inject(CredencialService);

  public formGroupCredencial!: FormGroup;

  private formBuilder = inject(FormBuilder);

  private toastController = inject(ToastController);

  private loadingController = inject(LoadingController);

  private modalController = inject(ModalController);

  private credencialModel!: CredencialModel;

  private credencialID: number = 0;

  private router = inject(Router);

  constructor() {
    addIcons({ cloudDoneOutline, personOutline, lockClosedOutline, mailOutline });
  }

  ngOnInit() {
    this.configurarFormularioCredencial();
    this.activatedRoute.queryParams.subscribe(params => {
      this.credencialID = params['credencialID'];
      if (this.credencialID) {
        this.carregarCredencial(this.credencialID);
      }
    });
  }

  public configurarFormularioCredencial() {
    this.formGroupCredencial = this.formBuilder.group({
      plataforma: ["", [Validators.required]],
      descricao: ["", [Validators.required, Validators.minLength(3)]],
      usuario: ["", [Validators.required, Validators.minLength(3)]],
      senha: ["", [Validators.required, Validators.minLength(3)]],
      endereco: [""],
    });
  }

  public updateCredencial() {
    if (this.formGroupCredencial.invalid) {
      this.formGroupCredencial.markAllAsTouched();
      return;
    }
    if (this.formGroupCredencial.valid) {
      this.credencialModel = this.formGroupCredencial.value as CredencialModel;
      this.credencialModel.codigo = this.credencialID;

      this.credencialService.atualizarCredencial(this.credencialModel).subscribe({
        next: (response: any) => {
          this.formGroupCredencial.reset();
          this.apresentarCarregamento();
          setTimeout(() => {
            this.loadingController.dismiss();
            this.apresentarToastSucesso("Credencial Atualizada com Sucesso!");
            return;
          }, 1500);
          this.redirecionarTelaPrincipal();
        },
        error: (response: any) => {
          console.error("Falha ao tentar realizar a requisição!");
          this.apresentarToastErro("Falha ao tentar realizar a requisição!");
        }
      });
    }
  }

  private async apresentarToastSucesso(mensagem: string) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 3000,
      color: "primary",
      mode: "ios"
    });
    return toast.present();
  }

  private async apresentarToastErro(mensagem: string) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 3000,
      color: "danger",
      mode: "ios"
    });
    return toast.present();
  }

  public validarCampoInvalido(campoInput: string, tipoErro: string) {
    const control = this.formGroupCredencial.get(campoInput);
    return (control?.hasError(tipoErro) && (control.touched || control.dirty));
  }

  private async apresentarCarregamento() {
    const loading = await this.loadingController.create({
      message: 'Salvando dados...',
    });
    return loading.present();
  }

  public async abrirModalPlataforma() {
    const modal = await this.modalController.create({
      component: PlataformaPage,
      breakpoints: [0, 0.25, 0.50, 0.85, 1],
      initialBreakpoint: 0.8,
    });
    modal.present();

    const { data } = await modal.onDidDismiss();

    if (data) {
      this.formGroupCredencial.patchValue({
        plataforma: data
      });
    }

  }

  private carregarCredencial(codigo: number) {
    this.credencialService.recuperarCredencial(codigo).subscribe({
      next: (response: any) => {
        this.credencialModel = response;
        this.formGroupCredencial.patchValue({
          plataforma: this.credencialModel.plataforma,
          descricao: this.credencialModel.descricao,
          usuario: this.credencialModel.usuario,
          senha: this.credencialModel.senha,
          endereco: this.credencialModel.url || ""
        });
      },
      error: () => console.error('Erro ao buscar credencial')
    });
  }

  public redirecionarTelaPrincipal() {
    this.router.navigate(['/principal']);
  }

}
