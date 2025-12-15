import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IcecreamRepository } from '../repository/icecream-repository';
import { Flavour } from '../data/flavour';
import { StockItem } from '../data/stock-item';

import {
  IonContent, IonHeader, IonToolbar, IonTitle,
  IonButton, IonInput, IonImg,
  IonList, IonItem, IonLabel, IonCheckbox
} from '@ionic/angular/standalone';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-empty-flavour',
  templateUrl: './empty-flavour.html',
  styleUrls: ['./empty-flavour.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonToolbar, IonTitle,
    IonButton, IonInput, IonImg,
    IonList, IonItem, IonLabel, IonCheckbox,
    CommonModule, FormsModule
  ]
})
export class EmptyFlavour {

  flavourName = '';
  signature = '';

  showItems = false;

  flavours: Flavour[] = [];
  extras: StockItem[] = [];

  selectedFlavours: boolean[] = [];
  selectedExtras: boolean[] = [];

  constructor(
    private route: ActivatedRoute,
    private repo: IcecreamRepository
  ) {
    this.flavourName = this.route.snapshot.paramMap.get('name') ?? '';

    this.flavours = this.repo.flavours;
    this.extras = this.repo.extras;

    // le parfum vide est sélectionné par défaut
    this.selectedFlavours = this.flavours.map(
      f => f.name === this.flavourName
    );

    this.selectedExtras = this.extras.map(() => false);
  }

  toggleItems(): void {
    this.showItems = !this.showItems;
  }

  hasSelection(): boolean {
    return (
      this.selectedFlavours.some(v => v) ||
      this.selectedExtras.some(v => v)
    );
  }

  orderSingle(): void {
    const text =
`Hi,
Please order the following:
* ${this.flavourName} icecream
Thanks, ${this.signature}`;

    window.location.href =
      'mailto:order@icecream.com?subject=Order&body=' +
      encodeURIComponent(text);
  }

  orderAll(): void {
    let text = 'Hi,\nPlease order the following:\n';

    this.flavours.forEach((f, i) => {
      if (this.selectedFlavours[i]) {
        text += `* ${f.name} icecream\n`;
      }
    });

    this.extras.forEach((e, i) => {
      if (this.selectedExtras[i]) {
        text += `* ${e.name}\n`;
      }
    });

    text += 'Thanks';

    window.location.href =
      'mailto:order@icecream.com?subject=Order&body=' +
      encodeURIComponent(text);
  }
}
