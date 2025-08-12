import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonIcon, IonLabel } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chevronForwardOutline } from 'ionicons/icons';
import { CredencialService } from 'src/app/service/credencial.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonContent, IonLabel, IonIcon]
})
export class PrincipalPage implements OnInit {

  private credencialService = inject(CredencialService);

  public credencialList: any[] = [];

  private router = inject(Router);

  constructor() {
    addIcons({
      chevronForwardOutline
    });
    this.recuperarCredencialList();
  }

  ngOnInit() {
    this.recuperarCredencialList();
  }

  public recuperarCredencialList() {
    this.credencialService.recuperarCredencialList().subscribe({
      next: (response: any) => {
        this.credencialList = response;
        console.log(response);
      }
    });
  }

  public redirecionarTelaCredencialEditar(credencial: any) {
    this.router.navigate(['/credencial-editar'], {
      queryParams: { credencialID: credencial.codigo }
    });
  }

}
