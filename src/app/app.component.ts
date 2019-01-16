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

  @ViewChild('mainForm') public mainForm: NgForm;
  @ViewChild('nameCtrl') public nameCtrl: NgModelGroup;

  constructor(public cd: ChangeDetectorRef) {}

  ngAfterViewChecked() {
    this.cd.detectChanges();
    this.links = [];
    this.scratch().forEach(rslt =>
      rslt.subscribe(res =>
        this.links.push({first: res[0].name, mapped: res[1]}) ));
    //results in [{first:'a', mapped:'aa'}, {first:'b', mapped:'bb'}, {first:'c', mapped:'cc'}]
  }

  scratch(): Observable<[{ id: number; name: string; }, string]>[] {
    const parents = [{id: 1, name: 'a'}, {id: 2, name: 'b'}, {id: 3, name: 'c'}];

    return parents.map(thrt => forkJoin(of(thrt), this.doubleName(thrt)));
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
  }
}
