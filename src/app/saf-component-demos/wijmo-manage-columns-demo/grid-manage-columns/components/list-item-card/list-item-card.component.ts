import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';

import { SafButtonInstance, SafMenuInstance } from '@saffron/core-components';
import { ComboboxWrapperComponent } from '../combobox-wrapper/combobox-wrapper.component';
import { Subject, takeUntil, tap } from 'rxjs';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { StateManagerService } from '../../services/state-manager.service';

@Component({
  selector: 'saf-wijmo-list-item-card',
  imports: [DragDropModule, ComboboxWrapperComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './list-item-card.component.html',
  styleUrls: ['./list-item-card.component.scss'],
})
export class ListItemCard implements OnInit, OnDestroy {
  @Input() id = '';
  @Input() cIndex = -1;
  @Input() overlayOpen = -1;
  @Input() inactiveColumns: string[] = [];
  @Input() isTooltipVisible = true;
  @Output() setOverlay = new EventEmitter<number>();
  @Output() moveButton = new EventEmitter<number>();
  @Output() removeColumn = new EventEmitter();
  @Output() moveUp = new EventEmitter();
  @Output() moveDown = new EventEmitter();
  @Output() insertAbove = new EventEmitter();
  @Output() insertBelow = new EventEmitter();
  @Output() closeOverlay = new EventEmitter();
  @Output() dragItem = new EventEmitter<{ isVisible: boolean; id: string }>();
  @ViewChild('comboboxWrapper') comboboxWrapperComponent?: ComboboxWrapperComponent;
  @ViewChild('overlayMenu') overlayMenus?: ElementRef<any>;
  currentItem = '';
  totalItems = 0;
  private readonly destroy$ = new Subject();
  public allColumns: any[] = [];
  openMenu = false;

  constructor(private sms: StateManagerService) {}

  ngOnInit(): void {
    this.currentItem =
      this.sms.getColumns().find((item) => item.id === this.id)?.value ?? '';
    this.allColumns = this.sms.allColumns;
    this.sms.columns
      .pipe(
        tap((columns) => {
          this.totalItems = columns.length;
        }),
        takeUntil(this.destroy$),
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  handleMoveButton() {
    this.moveButton.emit(this.cIndex);
  }

  handleRemoveColumn() {
    this.removeColumn.emit();
  }

  handleCloseOverlay() {
    this.closeOverlay.emit();
  }

  openOverlay() {
    this.setOverlay.emit(this.cIndex);
  }

  handleMenuItemKeydown(e: KeyboardEvent) {
    if (['Tab', 'Escape'].includes(e.key) || (e.shiftKey && e.key === 'Tab')) {
      e.preventDefault();
      this.handleCloseOverlay();
      window.requestAnimationFrame(() => {
        const el = document.getElementById(`button-menu-trigger${this.id}`);
        if (el) {
          (el as SafButtonInstance).focus();
        }
      });
    }
  }

  handleMoveDown() {
    this.moveDown.emit();
  }

  moveDownKeydown(e: KeyboardEvent) {
    if (['Enter', ' '].includes(e.key)) {
      e.preventDefault();
      this.handleMoveDown();
      window.requestAnimationFrame(() => {
        const el = document.getElementById(`button-menu-trigger${this.id}`);
        if (el) {
          (el as SafButtonInstance).focus();
        }
      });
    } else {
      this.handleMenuItemKeydown(e);
    }
  }

  handleMoveUp() {
    this.moveUp.emit();
  }

  moveUpKeydown(e: KeyboardEvent) {
    if (['Enter', ' '].includes(e.key)) {
      e.preventDefault();
      this.handleMoveUp();
    } else {
      this.handleMenuItemKeydown(e);
    }
  }

  handleInsertAbove() {
    this.insertAbove.emit();
  }

  insertAboveKeydown(e: KeyboardEvent) {
    if (['Enter', ' '].includes(e.key)) {
      e.preventDefault();
      this.handleInsertAbove();
    } else {
      this.handleMenuItemKeydown(e);
    }
  }

  handleInsertBelow() {
    this.insertBelow.emit();
  }

  insertBelowKeydown(e: KeyboardEvent) {
    if (['Enter', ' '].includes(e.key)) {
      e.preventDefault();
      this.handleInsertBelow();
    } else {
      this.handleMenuItemKeydown(e);
    }
  }

  handleTriggerKeydown(e: KeyboardEvent) {
    if (e.key !== 'Tab') {
      e.preventDefault();
      if (['Enter', ' '].includes(e.key)) {
        this.setOverlay.emit(this.cIndex);
        window.requestAnimationFrame(() => {
          const el = document.getElementById(`button-menu-trigger-a${this.id}`);
          const oel = el?.querySelector('saf-menu');
          if (oel) {
            (oel as SafMenuInstance).focus();
          }
        });
      }
    }
  }

  public triggerFocus() {
    (this.comboboxWrapperComponent as any)?.moveFocusToItself();
  }

  handleDragStarted() {
    this.toggleTooltips(false);
  }

  onCdkDragDropped() {
    this.toggleTooltips(true);
  }

  toggleTooltips(isVisible: boolean) {
    this.dragItem.emit({ isVisible, id: this.id });
  }
}
