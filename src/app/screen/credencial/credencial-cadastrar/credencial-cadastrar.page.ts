import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonButton, IonContent, IonIcon, IonLabel, ToastController, LoadingController, ModalController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { lockClosedOutline, mailOutline, personOutline, cloudDoneOutline } from 'ionicons/icons';
import { PlataformaPage } from 'src/app/component/modal/plataforma/plataforma.page';
import { CredencialCadastrarModel } from 'src/app/model/credencial-cadastrar.model';
import { CredencialService } from 'src/app/service/credencial.service';

@Component({
  selector: 'app-credencial-cadastrar',
  templateUrl: './credencial-cadastrar.page.html',
  styleUrls: ['./credencial-cadastrar.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonContent, IonLabel, IonIcon, IonButton]
})
export class CredencialCadastrarPage implements OnInit {

  public formGroupCredencial!: FormGroup;

  private formBuilder = inject(FormBuilder);

  private toastController = inject(ToastController);

  private loadingController = inject(LoadingController);

  private modalController = inject(ModalController);

  private credencialCadastrarModel!: CredencialCadastrarModel;

  private credencialService = inject(CredencialService);

  constructor() {
    addIcons({ cloudDoneOutline, personOutline, lockClosedOutline, mailOutline });
  }

  ngOnInit() {
    this.configurarFormularioCredencial();
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

  public createCredencial() {
    if (this.formGroupCredencial.invalid) {
      this.formGroupCredencial.markAllAsTouched();
      return;
    }
    if (this.formGroupCredencial.valid) {
      this.credencialCadastrarModel = this.formGroupCredencial.value as CredencialCadastrarModel;

      this.credencialService.cadastrarCredencial(this.credencialCadastrarModel).subscribe({
        next: (response: any) => {
          this.formGroupCredencial.reset();
          this.apresentarCarregamento();
          setTimeout(() => {
            this.loadingController.dismiss();
            this.apresentarToastSucesso("Credencial Cadastrada com Sucesso!");
            return;
          }, 1500);
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

}
