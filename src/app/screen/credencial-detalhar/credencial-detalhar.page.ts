import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, IonButton, IonContent, IonHeader, IonIcon, IonLabel, IonTitle, IonToolbar, LoadingController, ModalController, ToastController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { closeOutline, cloudDoneOutline, copyOutline, linkOutline, lockClosedOutline, mailOutline, personOutline, star, trashOutline } from 'ionicons/icons';
import { PlataformaPage } from 'src/app/component/modal/plataforma/plataforma.page';
import { CredencialModel } from 'src/app/model/credencial.model';
import { CredencialService } from 'src/app/service/credencial.service';

@Component({
  selector: 'app-credencial-detalhar',
  templateUrl: './credencial-detalhar.page.html',
  styleUrls: ['./credencial-detalhar.page.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonTitle,
    IonToolbar,
    IonHeader,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonContent,
    IonLabel,
    IonIcon,
  ],
})
export class CredencialDetalharPage implements OnInit {
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

  private alertController = inject(AlertController);

  constructor() {
    addIcons({
      closeOutline,
      cloudDoneOutline,
      personOutline,
      copyOutline,
      lockClosedOutline,
      linkOutline,
      trashOutline,
      star,
      mailOutline,
    });
  }

  ngOnInit() {
    this.configurarFormularioCredencial();
    this.activatedRoute.queryParams.subscribe((params) => {
      this.credencialID = params['credencialID'];
      if (this.credencialID) {
        this.carregarCredencial(this.credencialID);
      }
    });
  }

  public configurarFormularioCredencial() {
    this.formGroupCredencial = this.formBuilder.group({
      plataforma: ['', Validators.required],
      descricao: ['', [Validators.required, Validators.minLength(3)]],
      usuario: ['', [Validators.required, Validators.minLength(3)]],
      senha: ['', [Validators.required, Validators.minLength(3)]],
      endereco: [''],
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

      this.credencialService
        .atualizarCredencial(this.credencialModel)
        .subscribe({
          next: (response: any) => {
            this.formGroupCredencial.reset();
            this.apresentarCarregamento();
            setTimeout(() => {
              this.loadingController.dismiss();
              this.apresentarToastSucesso('Credencial Atualizada com Sucesso!');
              return;
            }, 1500);
            this.redirecionarTelaPrincipal();
          },
          error: (response: any) => {
            console.error('Falha ao tentar realizar a requisição!');
            this.apresentarToastErro('Falha ao tentar realizar a requisição!');
          },
        });
    }
  }

  private async apresentarToastSucesso(mensagem: string) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 3000,
      color: 'primary',
      mode: 'ios',
    });
    return toast.present();
  }

  private async apresentarToastErro(mensagem: string) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 3000,
      color: 'danger',
      mode: 'ios',
    });
    return toast.present();
  }

  public validarCampoInvalido(campoInput: string, tipoErro: string) {
    const control = this.formGroupCredencial.get(campoInput);
    return control?.hasError(tipoErro) && (control.touched || control.dirty);
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
      breakpoints: [0, 0.25, 0.5, 0.85, 1],
      initialBreakpoint: 0.8,
    });
    modal.present();

    const { data } = await modal.onDidDismiss();

    if (data) {
      this.formGroupCredencial.patchValue({
        plataforma: data,
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
          endereco: this.credencialModel.url || '',
        });
      },
      error: () => console.error('Erro ao buscar credencial'),
    });
  }

  public redirecionarTelaPrincipal() {
    this.router.navigate(['tabmenu/principal']);
  }

  public redirecionarTelaCredencialEditar() {
    this.router.navigate(['/credencial-editar'], {
      queryParams: { credencialID: this.credencialID },
    });
  }

  public copiarDadosAreaTransferencia(campoInput: string) {
    const campo = this.formGroupCredencial.get(campoInput)?.value;
    if (campo) {
      navigator.clipboard
        .writeText(campo)
        .then(() => {
          this.apresentarToastSucesso(
            'Valor copiado para a área de transferência!'
          );
        })
        .catch((error) => {
          console.error('Erro ao copiar: ', error);
        });
    }
  }

  public excluirCredencial() {
    this.credencialService.inativarCredencial(this.credencialModel.codigo).subscribe({
      next: (response) => {
        this.redirecionarTelaPrincipal();
        this.apresentarToastSucesso("Credencial Inativada com Sucesso!");
      },
      error: (response) => {}
    });
  }

  public async apresentarAlertaExclusao() {
    const alert = await this.alertController.create({
      header: 'Confirmar Ação',
      message: 'Tem certeza que deseja inativar sua Credencial?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.excluirCredencial();
          },
          cssClass: "alert-botao"
        }
      ],
    });
    await alert.present();
  }

}
