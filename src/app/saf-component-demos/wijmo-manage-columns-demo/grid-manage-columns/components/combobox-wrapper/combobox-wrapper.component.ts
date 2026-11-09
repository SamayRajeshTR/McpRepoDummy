import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { StateManagerService } from '../../services/state-manager.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

interface SafComboboxElement extends HTMLElement {
  value: string;
  invalid: boolean;
  open?: boolean;
  focus: () => void;
}

@Component({
  selector: 'app-combobox-wrapper',
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './combobox-wrapper.component.html',
  styleUrls: ['./combobox-wrapper.component.scss'],
})
export class ComboboxWrapperComponent
  implements OnInit, OnDestroy
{
  @Input() inactiveColumns: string[] = [];
  @Input() id: any;
  @Input() amountOfItems: number = 0;

  @ViewChild('comboboxRef') comboboxRef?: ElementRef<SafComboboxElement>;

  isInvalid = false;
  currentItem = '';

  private destroy$ = new Subject<void>();

  constructor(private sms: StateManagerService) {}

  ngOnInit(): void {
    const initialColumn = this.sms
      .getColumns()
      .find((item) => item.id === this.id);
    this.currentItem = initialColumn?.value || '';

    this.sms.columns.pipe(takeUntil(this.destroy$)).subscribe((columns) => {
      const columnData = columns.find((column) => column.id === this.id);
      const valueToValidate = columnData?.value;
      this.isColumnValid(valueToValidate, columnData?.alreadyInitialized);
      const newValue = valueToValidate || '';
      if (this.currentItem !== newValue) {
        this.currentItem = newValue;
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public isColumnValid(name?: string, alreadyInitialized?: boolean) {
    if (name !== undefined && name !== null) {
      this.isInvalid =
        !this.sms.allColumns.some(
          (column) => column.header.toLowerCase() === name.toLowerCase(),
        ) && !!alreadyInitialized;
    } else {
      this.isInvalid = !!alreadyInitialized;
    }
  }

  handleChange(event: Event) {
    const target = event.target as SafComboboxElement;
    this.changeValue(target.value);
  }

  handleClickOrFocus() {
    const column = this.sms
      .getColumns()
      .find((col) => col.id.toLowerCase() === this.id.toLowerCase());
    if (column && !column.alreadyInitialized) {
      this.sms.initializeColumnById(this.id);
      this.isColumnValid(column.value, true);
    }
  }

  moveFocusToItself() {
    this.comboboxRef?.nativeElement?.focus();
  }

  moveFocusToRemoveButton() {
    document.getElementById(`remove-button-${this.id}`)?.focus();
  }

  moveFocusToMoveButton() {
    document.getElementById(`anchor-show-bottom${this.id}`)?.focus();
  }

  changeValue(newValue: string) {
    this.sms.updateColumnById(this.id, newValue);
    const column = this.sms.getColumns().find((col) => col.id === this.id);
    this.isColumnValid(newValue, column?.alreadyInitialized);
  }

  handleKeydown(event: KeyboardEvent) {
    const comboboxElement = this.comboboxRef?.nativeElement;
    if (!comboboxElement) return;

    if (event.key === 'Escape') {
      event.stopPropagation();
      return;
    }

    if (event.key === 'Tab') {
      this.changeValue(comboboxElement.value);
      event.preventDefault();
      if (event.shiftKey) {
        this.moveFocusToMoveButton();
      } else {
        this.moveFocusToRemoveButton();
      }
    }
  }

  handleFocusIn() {
    this.handleClickOrFocus();
  }

  handleFocusOut(event: FocusEvent) {
    const comboboxElement = this.comboboxRef?.nativeElement;
    if (!comboboxElement) return;
    const relatedTarget = event.relatedTarget as Node | null;
    if (!comboboxElement.contains(relatedTarget)) {
      this.changeValue(comboboxElement.value);

      if (!comboboxElement.value) {
        const column = this.sms.getColumns().find((c) => c.id === this.id);
        if (column?.alreadyInitialized) {
          this.isInvalid = true;
        }
      }
    }
  }
}
