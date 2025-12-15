import { Injectable } from '@angular/core';
import { IcecreamRepository } from './icecream-repository';
import { Flavour } from '../data/flavour';
import { StockItem } from '../data/stock-item';

@Injectable()
export class IcecreamRepositoryDummyImpl extends IcecreamRepository {

  flavours: Flavour[] = [
    { name: 'Chocolate', img: '/assets/chocolate.jpg', quantity: 300, scoops: 0 },
    { name: 'Vanilla', img: '/assets/vanilla.jpg', quantity: 100, scoops: 0 },
    { name: 'Pistachio', img: '/assets/pistachio.jpg', quantity: 0, scoops: 0 }
  ];

  extras: StockItem[] = [
    { name: 'Cones', quantity: 2, unit: '' },
    { name: 'Cups', quantity: 7, unit: '' },
    { name: 'Whipped cream', quantity: 150, unit: 'ml' },
    { name: 'Hazelnuts', quantity: 100, unit: 'g' }
  ];

  decreaseStock(flavour: Flavour, scoops: number): void {
    flavour.quantity = Math.max(0, flavour.quantity - scoops * 50);
  }

  consumeWhipped(): void {
    const whipped = this.extras.find(e => e.name === 'Whipped cream');
    if (whipped && whipped.quantity >= 75) {
      whipped.quantity -= 75;
    }
  }

  consumeNuts(): void {
    const nuts = this.extras.find(e => e.name === 'Hazelnuts');
    if (nuts && nuts.quantity >= 5) {
      nuts.quantity -= 5;
    }
  }

  consumeContainer(type: 'cup' | 'cone'): void {
    const name = type === 'cone' ? 'Cones' : 'Cups';
    const item = this.extras.find(e => e.name === name);
    if (item && item.quantity > 0) {
      item.quantity -= 1;
    }
  }
}
