import { Component, OnInit, ViewChild } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';



@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})

export class HeroesComponent implements OnInit {
  heroes: Hero[];

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }

}
export interface PeriodicElement {
position: number;
  name: string;
  
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20, symbol: 'Ne'},
];


export class TableBasicExample {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
}