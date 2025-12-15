import { Component } from '@angular/core';
import { IcecreamRepository } from '../repository/icecream-repository';

import {
  IonContent, IonHeader, IonToolbar, IonTitle,
  IonGrid, IonRow, IonCol,
  IonCheckbox, IonRadioGroup, IonRadio,
  IonButton
} from '@ionic/angular/standalone';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlavoursComponent } from '../components/flavours/flavours.component';

@Component({
  selector: 'app-icecream',
  templateUrl: './Icecream.html',
  styleUrls: ['./Icecream.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonToolbar, IonTitle,
    IonGrid, IonRow, IonCol,
    IonCheckbox, IonRadioGroup, IonRadio,
    IonButton,
    CommonModule, FormsModule,
    FlavoursComponent
  ]
})
export class Icecream {

  container: 'cup' | 'cone' = 'cup';
  whipped = false;
  nuts = false;

  constructor(private repo: IcecreamRepository) {}

  get flavours() {
    return this.repo.flavours;
  }

  get totalScoops(): number {
    return this.flavours.reduce((sum, f) => sum + f.scoops, 0);
  }

  get hasError(): boolean {
    return this.totalScoops > 5;
  }

  get total(): number {
    let price = 0;

    switch (this.totalScoops) {
      case 1: price = 1.5; break;
      case 2: price = 3; break;
      case 3: price = 4; break;
      case 4: price = 5; break;
      case 5: price = 5.5; break;
    }

    if (this.container === 'cone') price += 1;
    if (this.whipped) price += 0.95;
    if (this.nuts) price += 0.95;

    return price;
  }

  canCreate(): boolean {
    return this.totalScoops > 0 && !this.hasError;
  }

  createIcecream(): void {

    this.flavours.forEach(f => {
      if (f.scoops > 0) {
        this.repo.decreaseStock(f, f.scoops);
        f.scoops = 0;
      }
    });

    if (this.whipped) {
      this.repo.consumeWhipped();
    }

    if (this.nuts) {
      this.repo.consumeNuts();
    }

    this.repo.consumeContainer(this.container);
  }
}
