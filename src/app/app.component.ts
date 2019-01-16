import { Component, ViewChild, AfterViewInit, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { Comp } from './outer/outer.model';
import { NgForm, NgModelGroup } from '@angular/forms';
import { Observable, of, forkJoin  } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements AfterViewChecked {
  comp =  new Comp(null, null);
  required = false;
  val3 = 'val3Init';
  links: any[] = [];
  links2: any[] = [];

  @ViewChild('mainForm') public mainForm: NgForm;
  @ViewChild('nameCtrl') public nameCtrl: NgModelGroup;

  constructor(public cd: ChangeDetectorRef) {}

  ngAfterViewChecked() {
    this.cd.detectChanges();
    this.links = [];
    this.links2 = [];

    // resolves an array of forkjoins
    // *note multiple suscribes
    this.scratch().forEach(rslt =>
      rslt.subscribe(res =>
        this.links.push({first: res[0].name, mapped: res[1]})
        )
      );


    // resolves a forkjoin of forkjoins
    // *note only one suscribe
    this.scratchObs().subscribe(ress =>
        this.links2 = ress.map(res =>
          ({first: res[0].name, mapped: res[1]})
        )
      );

    // 1st results in [{first:"a", mapped:"aa"}, {first:"b", mapped:"bb"}, {first:"c", mapped:"cc"}]
    // 2nd results in [{first: "d", mapped: "dd"}, {first: "e", mapped: "ee"}, {first: "f", mapped: "ff"}]
  }

  // returns array of forkjoins
  scratch(): Observable<[{ id: number; name: string; }, string]>[] {
    const parents = [{id: 1, name: 'a'}, {id: 2, name: 'b'}, {id: 3, name: 'c'}];

    return parents.map(thrt => forkJoin(of(thrt), this.doubleName(thrt)));
  }

  // returns forkjoin of forkjoins
  scratchObs(): Observable<[{ id: number; name: string; }, string][]> {
    const parents = [{id: 4, name: 'd'}, {id: 5, name: 'e'}, {id: 6, name: 'f'}];

    return forkJoin(parents.map(thrt => forkJoin(of(thrt), this.doubleName(thrt))));
  }


  doubleName(parent: any): Observable<string> {
    return of(parent.name + parent.name);
  }

  requireChange() {
    this.required = !this.required;
  }

  doSubmit() {
    alert(`inputsValid: ${this.mainForm.valid}`);
    // console.log(this.comp);
    console.log(this.links);
    console.log(this.links2);
  }
}
