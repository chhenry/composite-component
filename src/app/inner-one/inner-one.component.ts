import { Component, OnInit, forwardRef, AfterViewChecked, Input, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgModelGroup, NgModel, NgForm } from '@angular/forms';
import { Comp } from '../outer/outer.model';

@Component({
  selector: 'app-inner-one',
  templateUrl: './inner-one.component.html',
  styleUrls: ['./inner-one.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InnerOneComponent),
      multi: true
    }
  ]
})
export class InnerOneComponent implements OnInit, ControlValueAccessor, AfterViewChecked {

  _value: Comp;
  registered = false;

  @ViewChild('one') one: NgModel;
  @Input() modelGroup: NgModelGroup;
  @Input() isRequired: boolean;

  constructor() {}

  ngOnInit() {

  }

  ngAfterViewChecked() {
    if (!this.registered) {
      if (this.modelGroup && this.modelGroup.control && this.one) {
        this.modelGroup.control.registerControl('one', this.one.control);
        this.registered = true;
      }
    }
  }

  onChange = (value: string) => {};

  writeValue(obj: any): void {
    if (!obj) {
      obj = new Comp(null, null);
    }
    this._value = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
  }
  setDisabledState?(isDisabled: boolean): void {
  }


}
