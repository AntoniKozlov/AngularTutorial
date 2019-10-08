import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 11, name: 'Mr. Nice',   level: 5,  age: 20, cls: 'Monster', power: 14},
      { id: 12, name: 'Narco',      level: 9,  age: 25, cls: 'Winder',  power: 12 },
      { id: 13, name: 'Bombasto',   level: 21, age: 30, cls: 'Doctor',  power: 24 },
      { id: 14, name: 'Celeritas',  level: 15, age: 28, cls: 'Blocker', power: 30 },
      { id: 15, name: 'Magneta',    level: 4,  age: 15, cls: 'Water',   power: 28 },
      { id: 16, name: 'RubberMan',  level: 5,  age: 16, cls: 'Blocker', power: 3 },
      { id: 17, name: 'Dynama',     level: 2,  age: 10, cls: 'Water',   power: 22 },
      { id: 18, name: 'Dr IQ',      level: 15, age: 29, cls: 'Doctor',  power: 43 },
      { id: 19, name: 'Magma',      level: 14, age: 28, cls: 'Monster', power: 30 },
      { id: 20, name: 'Tornado',    level: 20, age: 31, cls: 'Winder',  power: 22 }
    ];
    return {heroes};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }
}
