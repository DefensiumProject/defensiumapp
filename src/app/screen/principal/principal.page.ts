import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { IonAvatar, IonContent, IonHeader, IonIcon, IonLabel, IonText, IonToolbar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chevronForwardOutline, notificationsOutline } from 'ionicons/icons';
import { filter } from 'rxjs/operators';
import { CredencialModel } from 'src/app/model/credencial.model';
import { CredencialService } from 'src/app/service/credencial.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
  standalone: true,
  imports: [
    IonText,
    IonAvatar,
    IonToolbar,
    IonHeader,
    CommonModule,
    FormsModule,
    IonContent,
    IonLabel,
    IonIcon,
  ],
})
export class PrincipalPage implements OnInit {
  private credencialService = inject(CredencialService);

  public credencialList: any[] = [];

  private router = inject(Router);

  private route = inject(ActivatedRoute);

  constructor() {
    addIcons({ notificationsOutline, chevronForwardOutline });
  }

  ngOnInit() {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
        if (event.url.includes('tabmenu/principal')) {
          this.recuperarCredencialList();
        }
      });
  }

  public recuperarCredencialList() {
    debugger;
    this.credencialService.recuperarCredencialList().subscribe({
      next: (response: any) => {
        this.credencialList = response.sort(
          (a: CredencialModel, b: CredencialModel) => {
            return a.plataforma.nome.localeCompare(b.plataforma.nome);
          }
        );
      },
    });
  }

  public redirecionarTelaCredencialEditar(credencial: any) {
    this.router.navigate(['/credencial-editar'], {
      queryParams: { credencialID: credencial.codigo },
    });
  }

  public redirecionarTelaCredencialDetalhar(credencial: any) {
    this.router.navigate(['/credencial-detalhar'], {
      queryParams: { credencialID: credencial.codigo },
    });
  }
}
