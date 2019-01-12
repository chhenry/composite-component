import { Component, OnInit, forwardRef, ViewChild, Input, AfterViewChecked } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgModel, NgModelGroup } from '@angular/forms';
import { Comp } from '../outer/outer.model';

@Component({
  selector: 'app-inner-two',
  templateUrl: './inner-two.component.html',
  styleUrls: ['./inner-two.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InnerTwoComponent),
      multi: true
    }
  ]
})

export class InnerTwoComponent implements OnInit, ControlValueAccessor {

  _value: Comp;
  registered = false;

  constructor() { }

  ngOnInit() {
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
