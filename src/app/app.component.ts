import { Component, ViewChild, AfterViewInit, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { Comp } from './outer/outer.model';
import { NgForm, NgModelGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements AfterViewChecked {
  comp =  new Comp(null, null);
  required = false;
  val3 = 'val3Init';

  @ViewChild('mainForm') public mainForm: NgForm;
  @ViewChild('nameCtrl') public nameCtrl: NgModelGroup;

  constructor(public cd: ChangeDetectorRef) {}

  ngAfterViewChecked() {
    this.cd.detectChanges();
  }

  requireChange() {
    this.required = !this.required;
  }

  doSubmit() {
    alert(`inputsValid: ${this.mainForm.valid}`);
    console.log(this.comp);
  }
}
