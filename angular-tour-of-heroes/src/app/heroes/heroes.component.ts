import { Component, OnInit, ViewChild } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import {MatTable} from '@angular/material';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})

export class HeroesComponent implements OnInit {
  
  displayedColumns: string[] = ['id', 'name'];
   dataSource = this.heroService.getHeroes();
  /*dataSource = this.heroService.getHeroes();*/
 /*new MatTableDataSource<Hero>(this.heroService.getHeroes());*/

  heroes: Hero[];

  constructor(private heroService: HeroService) { }


/*@ViewChild(MatTable, {static: true}) table: MatTable<Hero>;*/
  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
   
    this.dataSource = this.heroService.getHeroes();
    /*this.dataSource.splice(this.dataSource.indexOf(hero), 1);*/

/*
     const index = this.dataSource.indexOf(hero, 0);
    if (index > -1) {
      this.dataSource.splice(index, 1);
    }
    this.table.renderRows();
*/
   /*this.dataSource.data.splice(this.heroService.getHeroes().indexOf(hero),1);
    this.dataSource = new MatTableDataSource<Hero>(this.dataSource.data);*/

  }




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
        this.dataSource = this.heroService.getHeroes();
      });

  }

 
  
  
  
}


