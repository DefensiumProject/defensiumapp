import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonItem, IonLabel, IonList, IonSearchbar, IonTitle, IonToolbar, ModalController } from '@ionic/angular/standalone';
import { PlataformaModel } from 'src/app/model/plataforma.model';
import { PlataformaService } from 'src/app/service/plataforma.service';

@Component({
  selector: 'app-plataforma',
  templateUrl: './plataforma.page.html',
  styleUrls: ['./plataforma.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonSearchbar, IonList, IonItem, IonLabel, CommonModule, FormsModule]
})
export class PlataformaPage implements OnInit {

  public plataformList: any[] = [];

  private plataformaService = inject(PlataformaService);

  private modalController = inject(ModalController);

  constructor() { }

  ngOnInit() {
    this.getPlataformaList();
  }

  public getPlataformaList() {
    this.plataformaService.getCredencialList().subscribe({
      next: (response: any) => {
        this.plataformList = response;
      },
      error: (response: any) => {
        console.log("Falha ao tentar recuperar os dados!");
      }
    });
  }

  public recuperarPlataforma(plataforma: PlataformaModel) {
    this.modalController.dismiss(plataforma);
  }

}
