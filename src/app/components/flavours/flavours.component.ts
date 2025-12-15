import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Flavour } from '../../data/flavour';

import {
  IonRow,
  IonCol,
  IonButton,
  IonImg,
  IonLabel
} from '@ionic/angular/standalone';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-flavours',
  templateUrl: './flavours.component.html',
  styleUrls: ['./flavours.component.scss'],
  standalone: true,
  imports: [
    IonRow,
    IonCol,
    IonImg,
    IonLabel,
    IonButton,
    CommonModule
  ]
})
export class FlavoursComponent {

  @Input() flavour!: Flavour;

  constructor(private router: Router) {}

  add(): void {
    if (this.flavour.scoops < this.getMaxScoops()) {
      this.flavour.scoops++;
    }
  }

  sub(): void {
    if (this.flavour.scoops > 0) {
      this.flavour.scoops--;
    }
  }

  getMaxScoops(): number {
    return Math.floor(this.flavour.quantity / 50);
  }

  goEmpty(): void {
    this.router.navigate(['/empty', this.flavour.name]);
  }
}
