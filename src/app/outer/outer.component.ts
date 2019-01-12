import { Component, OnInit, forwardRef, Input, Attribute } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgModelGroup } from '@angular/forms';
import { Comp } from './outer.model';

@Component({
  selector: 'app-outer',
  templateUrl: './outer.component.html',
  styleUrls: ['./outer.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OuterComponent),
      multi: true
    }
  ]
})
export class OuterComponent implements OnInit, ControlValueAccessor {

  _value: Comp = new Comp(null, null);
  _required = false;

  bothRequired = false;

  @Input() modelGroup: NgModelGroup;

  @Input()
  set required(required: boolean) {
    this._required = required;
    this.bothRequired = this.required || !!this._value.innerOne || !!this._value.innerTwo;
  }

  get required() {
    return this._required;
  }

  constructor() {
  }

  ngOnInit() {
    this.bothRequired = this.required || !!this._value.innerOne || !!this._value.innerTwo;
  }

  onChange = (value: string) => {};

  writeValue(obj: any): void {
    this._value = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
  }

  doChange() {
    this.bothRequired = this.required || !!this._value.innerOne || !!this._value.innerTwo;
  }

  setDisabledState?(isDisabled: boolean): void {
  }

}
