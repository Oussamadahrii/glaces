import { Flavour } from '../data/flavour';
import { StockItem } from '../data/stock-item';

export abstract class IcecreamRepository {

  abstract flavours: Flavour[];
  abstract extras: StockItem[];

  abstract decreaseStock(flavour: Flavour, scoops: number): void;
  abstract consumeWhipped(): void;
  abstract consumeNuts(): void;
  abstract consumeContainer(type: 'cone' | 'cup'): void;
}
