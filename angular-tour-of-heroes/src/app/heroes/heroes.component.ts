import { Component, OnInit, ViewChild, Inject,  Input } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MatTable } from '@angular/material';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA , MatDialogConfig} from '@angular/material/dialog';
import {  FormGroup, FormControl, Validators } from '@angular/forms';
//import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import {Injectable, Optional} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {BehaviorSubject, fromEvent, merge, Observable} from 'rxjs';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})

export class HeroesComponent implements OnInit {
  @Input() hero: Hero;
  name: string;
  level: number;
  age: number;
  cls: string;
  power: number;

  heroes: Hero[];

  //teachDS: any;
  dataSource: any;

  displayedColumns: string[] = ['id', 'name', 'level', 'age', 'cls', 'power', 'actions'];

  constructor(private heroService: HeroService, public dialog: MatDialog) {
    /*this.heroService.getHeroes().subscribe ( heroes => {
      this.dataSource.data = heroes;
    //  this.dataSource.data = this.heroService.getHeroes();
    })*/
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',

      data: {name: this.name, level: this.level, age: this.age, cls: this.cls, power: this.power}

    });

    dialogRef.afterClosed().subscribe(hero => {
      this.name = hero.name;
      this.level = hero.level;
      this.age = hero.age;
      this.cls = hero.cls;
      this.power = hero.power;

      this.add(this.name, this.level, this.age, this.cls, this.power);
      this.heroService.getHeroes().subscribe((heroes: Hero[]) => {
        this.dataSource.data = heroes;
      });
      this.paginator.lastPage();
      console.log(this.name);
      console.log(this.level);
      console.log(this.age);
      console.log(this.cls);
      console.log(this.power);
    });

  }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  /*delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
    this.heroService.getHeroes().subscribe((heroes: Hero[]) => {
      this.dataSource.data = heroes;});
}*/

  ngOnInit() {
    this.heroService.getHeroes().subscribe(results => {
      this.heroes = results;
      this.dataSource = new MatTableDataSource(this.heroes);
      this.dataSource.paginator = this.paginator;
    });
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  add(name: string, level: number, age: number, cls: string, power: number): void {
    //  name = name.trim();
    // cls = cls.trim();
    if (!name && !cls && isNaN(level) && isNaN(age) && isNaN(power)) {
      return;
    }
    this.heroService.addHero({name, level, age, cls, power} as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);});
  }

  exampleDatabase: HeroService | null;
  index: number;
  _id: number;

  startEdit(i: number, hero: Hero, _id: number, name: string, level: number, age: number, cls: string, power: number) {
    const dialogRefUpdate = this.dialog.open(DialogOverviewExampleDialog2, {
      width: '250px',
      data: {_id: _id, name: name, level: level, age: age, cls: cls, power: power}
    });

    dialogRefUpdate.afterClosed().subscribe(heroes => {
      this.heroService.getHeroes().subscribe((heroes: Hero[]) => {
        this.dataSource.data = heroes;});
    });

  }
  openDelete(hero: Hero, _id: number, name: string, level: number, age: number, cls: string, power: number) {
    const dialogRefDelete = this.dialog.open(DialogDelete, {
      width: '250px',
      data: {_id: _id, name: name, level: level, age: age, cls: cls, power: power}
    });

    dialogRefDelete.afterClosed().subscribe(heroes => {

      this.heroService.getHeroes().subscribe((heroes: Hero[]) => {
        this.dataSource.data = heroes;});
    });

  }
}




@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {
  clls;
  dataSource: any;
  clsList = ['Monster', 'Winder', 'Doctor', 'Blocker', 'Water'];
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Hero) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
    console.log('Dialog got', this.data);
  }
  myFormDialog : FormGroup = new FormGroup({
    "heroName": new FormControl("", [Validators.pattern("^([а-яА-ЯёЁa-zA-Z])+([ ]?[а-яА-ЯёЁa-zA-Z0-9]+)+$"),Validators.required]),
    "heroLevel": new FormControl("", [Validators.pattern("^[1-9]([0-9]+)?$"),Validators.required]),
    "heroAge": new FormControl("", [Validators.pattern("^[0-9]+$"),Validators.required]),
    "heroPower": new FormControl("", [Validators.pattern("^[0-9]+$"),Validators.required]),
    "heroCls": new FormControl("", Validators.required)

  });

}



@Component({
  selector: 'dialog-overview-example-dialog2',
  templateUrl: 'dialog-overview-example-dialog2.html',
})
export class DialogOverviewExampleDialog2 implements OnInit{
  @Input() hero: Hero;
  heroes: Hero[];
  dataSource: any;
  clls;
  clsList = ['Monster', 'Winder', 'Doctor', 'Blocker', 'Water'];

  constructor(
    public dialogRefUpdate: MatDialogRef<DialogOverviewExampleDialog2>,
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    @Inject(MAT_DIALOG_DATA) public data: Hero) {}

  myFormDialog2 : FormGroup = new FormGroup({
    "heroName": new FormControl("", [Validators.pattern("^([а-яА-ЯёЁa-zA-Z])+([ ]?[а-яА-ЯёЁa-zA-Z0-9]+)+$"),Validators.required]),
    "heroLevel": new FormControl("", [Validators.pattern("^[1-9]([0-9]+)?$"),Validators.required]),
    "heroAge": new FormControl("", [Validators.pattern("^[0-9]+$"),Validators.required]),
    "heroPower": new FormControl("", [Validators.pattern("^[0-9]+$"),Validators.required]),
    "heroCls": new FormControl("", Validators.required)

  });

  ngOnInit(): void {
    console.log('Dialog got', this.data);
  }

  onNoClick(): void {
    this.dialogRefUpdate.close();
  }

  stopEdit(): void {
    this.heroService.updateHero(this.data).subscribe();

  }
}
@Component({
  selector: 'dialog-delete',
  templateUrl: 'dialog-delete.html',
})
export class DialogDelete implements OnInit{
  @Input() hero: Hero;
  heroes: Hero[];
  dataSource: any;
  clls;
  clsList = ['Monster', 'Winder', 'Doctor', 'Blocker', 'Water'];

  constructor(
    public dialogRefDelete: MatDialogRef<DialogDelete>,
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    @Inject(MAT_DIALOG_DATA) public data: Hero) {}


  ngOnInit(): void {
    console.log('Dialog got', this.data);
  }

  onNoDelete(): void {
    this.dialogRefDelete.close();
  }

  confirmDelete(): void {
    this.heroService.deleteHero(this.data).subscribe();
  }
}
