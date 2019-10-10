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
 /* dataSource = this.heroService.getHeroes();*/
  /*dataSource = new MatTableDataSource<Hero>(this.heroService.getHeroes());*/
  heroes: Hero[];

  //teachDS: any;
  dataSource: any;

//  dataSource = new MatTableDataSource<Hero>();
  displayedColumns: string[] = ['id', 'name', 'level', 'age', 'cls', 'power'];

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

     // this.paginator._changePageSize(this.paginator.pageSize);
      this.add(this.name, this.level, this.age, this.cls, this.power);
     // this.heroService.updateHero(hero);
      console.log(this.name);
      console.log(this.level);
      console.log(this.age);
      console.log(this.cls);
      console.log(this.power);
     // this.refreshTable();
    });


  }
/*
  addNew(hero: Hero) {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: {hero: Hero }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        this.add(this.name, this.level, this.age, this.cls, this.power);
        this.heroService.dataChange.value.push(this.heroService.getDialogData());
        this.refreshTable();
      }
    });
  }*/

  /*
  openDialogUpDate(): void {




      this.selectedHero = hero;

    const dialogRefUpdate = this.dialog.open(DialogOverviewExampleDialog2, {
      width: '250px',

      data: {name: this.name, level: this.level, age: this.age, cls: this.cls, power: this.power}

    });

    dialogRefUpdate.afterClosed().subscribe(hero => {
      this.name = hero.name;
      this.level = hero.level;
      this.age = hero.age;
      this.cls = hero.cls;
      this.power = hero.power;

     // this.add(this.name, this.level, this.age, this.cls, this.power);
      // this.heroService.updateHero(hero);
      console.log(this.name);
      console.log(this.level);
      console.log(this.age);
      console.log(this.cls);
      console.log(this.power);
    });


  }*/
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
    this.dataSource = this.heroService.getHeroes();
  }

  ngOnInit() {
      this.heroService.getHeroes().subscribe(results => {
      this.heroes = results;
      this.dataSource = new MatTableDataSource(this.heroes);
      this.dataSource.paginator = this.paginator;
    });
    //console.dir(this.dataSource);
   // this.paginator._changePageSize(this.paginator.pageSize);
   // this.refresh();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes);
  }

  add(name: string, level: number, age: number, cls: string, power: number): void {
  //  name = name.trim();
    // cls = cls.trim();
    if (!name && !cls && isNaN(level) && isNaN(age) && isNaN(power)) { return; }
    this.heroService.addHero({ name, level, age, cls, power} as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
        this.dataSource = this.heroService.getHeroes();
        //this.refresh();
        //this.dataSource.data = data;
      //  this.paginator._changePageSize(this.paginator.pageSize);

      });
  }

  exampleDatabase: HeroService | null;
  index: number;
  id: number;

  startEdit(i: number, id: number, name: string, level: number, age: number, cls: string, power: number) {
    this.id = id;
    // index row is used just for debugging proposes and can be removed
    this.index = i;
    console.log(this.index);
    const dialogRefUpdate = this.dialog.open(DialogOverviewExampleDialog2, {
      width: '250px',

      data: {id: id, name: name, level: level, age: age, cls: cls, power: power}

    });

    dialogRefUpdate.afterClosed().subscribe(hero => {

        // When using an edit things are little different, firstly we find record inside DataService by id
        /*  this.heroService.getHero(id)
            .subscribe(hero => this.hero = hero);*/
       /* const foundIndex = this.heroService.dataChange.value.findIndex(x => x.id === this.id);
        console.log(id);
        console.log(this.id);
        // Then you update that record using data from dialogData (values you enetered)
        this.heroService.dataChange.value[foundIndex] = this.heroService.getDialogData();
        console.log(this.heroService.dataChange.value[foundIndex]);*/
       // this.heroService.getHero(id).subscribe(hero => this.hero = hero);
        // And lastly refresh table
      this.dataSource = this.heroService.getHeroes();

      //this.dataSource.paginator = this.paginator;
     // this.heroService.updateHero2(this.hero);
      //this.dataSource.data = this.heroService.getHeroes();
      this.refreshTable();
    });

  }
  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
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

  myFormDialog : FormGroup = new FormGroup({
    "heroName": new FormControl("", [Validators.pattern("^([а-яА-ЯёЁa-zA-Z])+([а-яА-ЯёЁa-zA-Z0-9]+)?$"),Validators.required]),
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
    "heroName": new FormControl("", [Validators.pattern("^([а-яА-ЯёЁa-zA-Z])+([а-яА-ЯёЁa-zA-Z0-9]+)?$"),Validators.required]),
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
    this.heroService.getHeroes().subscribe((heroes: Hero[]) => {
      this.dataSource = heroes;
    })
  }
}
