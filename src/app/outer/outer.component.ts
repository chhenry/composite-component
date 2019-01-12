import { Component, OnInit, forwardRef, Input, Attribute } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgModelGroup, NG_VALIDATORS, Validator, FormControl } from '@angular/forms';
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
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => OuterComponent),
      multi: true,
    }
  ]
})
export class OuterComponent implements OnInit, ControlValueAccessor, Validator {

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

    /**
     * Returns null if valid else key value object
     *
     * @param c Form Control
     */
    public validate(c: FormControl): {[key: string]: any} | null {

      const inputsValid: boolean =
        !!this._value &&
          (
            // all fields required
            (this.required &&
              (!!this._value.innerOne && !!this._value.innerTwo)
            )
            ||
            // all or none fields required
            (!this.required &&
              !(!!this._value.innerOne !== !!this._value.innerTwo)
            )
          );

      return inputsValid ? null : {outer: {valid: false}};
  }

  ngOnInit() {
    // this isnt really needed with validate method
    this.bothRequired = this.required || !!this._value.innerOne || !!this._value.innerTwo;
  }

  onChange = (value: Comp) => {};
  onValidatorChange = () => {};

  writeValue(obj: any): void {
    this._value = obj;
  }

  registerOnValidatorChange?(fn: () => void): void {
    fn = this.onValidatorChange;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
  }

  doChange() {
    // both required not really needed with validate method
    this.bothRequired = this.required || !!this._value.innerOne || !!this._value.innerTwo;
    this.onChange(this._value);
  }

  setDisabledState?(isDisabled: boolean): void {
  }

}
