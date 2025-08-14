import { animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonFab,
  IonFabButton,
  IonIcon,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  add,
  addCircleOutline,
  appsOutline,
  hammerOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-tabmenu',
  templateUrl: './tabmenu.page.html',
  styleUrls: ['./tabmenu.page.scss'],
  standalone: true,
  imports: [
    IonTabs,
    IonTabButton,
    IonFabButton,
    IonFab,
    IonIcon,
    IonTabBar,
    CommonModule,
    FormsModule,
  ],
})
export class TabmenuPage implements OnInit {

  private readonly router = inject(Router);

  constructor() {
    addIcons({ add, addCircleOutline, appsOutline, hammerOutline });
  }

  ngOnInit() {}

  public redirecionarModalCredencialCadastrar() {
    this.router.navigateByUrl("credencial-cadastrar");
  }

}
