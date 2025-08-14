import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonFab, IonFabButton, IonIcon, IonTabButton, IonTabs, IonTabBar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, addCircleOutline, appsOutline, hammerOutline } from 'ionicons/icons';

@Component({
  selector: 'app-tabmenu',
  templateUrl: './tabmenu.page.html',
  styleUrls: ['./tabmenu.page.scss'],
  standalone: true,
  imports: [IonTabs, IonTabButton, IonFabButton, IonFab, IonIcon, IonTabBar, CommonModule, FormsModule]
})
export class TabmenuPage implements OnInit {

  constructor() {
    addIcons({add,addCircleOutline,appsOutline,hammerOutline});
  }

  ngOnInit() {}

  public redirecionarModalCredencialCadastrar() {}

}
