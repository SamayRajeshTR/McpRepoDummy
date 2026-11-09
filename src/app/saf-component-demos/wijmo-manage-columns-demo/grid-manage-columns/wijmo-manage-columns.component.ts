import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  ElementRef,
  QueryList,
  HostListener,
  ViewChildren,
  AfterViewChecked,
  OnDestroy,
  ViewChild,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SafButtonInstance } from '@saffron/core-components';
import { ListItemCard } from './components/list-item-card/list-item-card.component';
import { Accessibility } from './components/accessibility/accessibility.component';
import { distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import {
  onDragCancel,
  onDragEnd,
  onDragOver,
  onDragStart,
} from './components/accessibility/accessibility.utils';
import { Column, StateManagerService } from './services/state-manager.service';
import { BodyPortalDirective } from '../../../layout/body-portal/index';

interface ITrackKeyboardMoves {
  active: number;
  over: number;
  action: 'UP' | 'DOWN';
}

@Component({
  selector: 'saf-wijmo-manage-columns',
  imports: [CommonModule, FormsModule, DragDropModule, ListItemCard, Accessibility, BodyPortalDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './wijmo-manage-columns.component.html',
  styleUrls: ['./wijmo-manage-columns.component.scss'],
})
export class GridManageColumnsComponent
  implements OnInit, AfterViewChecked, OnDestroy
{
  @Output() managerDrawerClose = new EventEmitter();
  @Output() applyManagerChanges = new EventEmitter<string[]>();
  @Input() allColumns: any[] = [];
  @Input() activeColumnHeaders: string[] = [];
  @ViewChildren('listItemCard') listItemCardRef?: QueryList<ElementRef<any>>;
  @ViewChildren('overlayMenu') overlayMenus?: QueryList<ElementRef<any>>;
  @ViewChildren('menuItem') menuItems?: QueryList<ElementRef<any>>;
  @ViewChild('drawer') drawer?: ElementRef;

  hideColumnManager: boolean = true;
  keydown$: Subject<KeyboardEvent> = new Subject();
  listDrop$: Subject<CdkDragDrop<string[]>> = new Subject();
  overlayOpen = -1;
  columnAdded: { newColumn: boolean; index: number } = {
    newColumn: false,
    index: -1,
  };
  moveIndex = -1;
  inactiveColumns: string[] = [];
  showRevertDialog = false;
  initIdxMovedWithKeyboard = -1;
  copyOfItems: Column[] = [];
  isTooltipVisible = true;
  dragItemId: string | number = -1;
  currentAnnounce = '';
  // We could improve an remove this array by creating
  // an algorithm that put in previous order the array
  // to avoid mutating the array. This will be more better
  // as this data set can grow if the user goes crazy and makes
  // a million moves before canceling
  trackMoves: ITrackKeyboardMoves[] = [];

  private readonly destroy$ = new Subject();
  items: string[] = [];
  columns$ = this.sms.columns;
  counter = 0;

  constructor(private sms: StateManagerService) {}

  ngOnInit(): void {
    this.keydown$
      .pipe(distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((event) => {
        this.handleDrawerKeydown(event);
      });
    this.listDrop$.pipe(takeUntil(this.destroy$)).subscribe((event) => {
      this.dropEvent(event);
    });
    this.sms.columns.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.items = this.sms.getItems();
      this.setInactiveColumns();
    });
  }

  ngAfterViewChecked() {
    const dragPreview = document.querySelector(
      '.cdk-drag-preview',
    ) as HTMLElement;
    if (dragPreview) {
      dragPreview.style.removeProperty('z-index');
    }
    if (this.columnAdded.newColumn && this.listItemCardRef) {
      this.columnAdded = { newColumn: false, index: -1 };
    }
    this.sms.allColumns = this.allColumns;
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    const triggerButtons = Array.from(
      document.getElementsByClassName('trigger-button'),
    );
    const overlays = Array.from(
      document.getElementsByTagName('saf-anchored-region'),
    );
    for (let i = 0; i < overlays.length; i++) {
      if (
        overlays[i].contains(event.target) ||
        triggerButtons[i]?.contains(event.target)
      ) {
        return;
      }
    }
    this.overlayOpen = -1;
  }

  @HostListener('keydown', ['$event'])
  arrowUpOrDown(event: KeyboardEvent) {
    if (this.moveIndex >= 0) {
      const elements = Array.from(
        document.getElementsByClassName('drag-button'),
      );
      if (
        this.moveIndex >= 0 &&
        (event.code === 'Space' || event.code === 'Enter')
      ) {
        event.preventDefault();
        this.handleEndKeyboardDrag();
        return;
      }
      if (
        event.code === 'ArrowDown' &&
        this.moveIndex < this.items.length - 1
      ) {
        // plus one to all of the as index is 0 but
        // first position is 1
        this.currentAnnounce = onDragOver(
          String(this.initIdxMovedWithKeyboard + 1),
          String(this.moveIndex + 1 + 1),
        );
        this.sms.reOrderColumns(this.moveIndex, this.moveIndex + 1);
        this.trackMoves.push({
          over: this.moveIndex + 1,
          active: this.moveIndex,
          action: 'DOWN',
        });
        this.moveIndex++;
        // The focus is preventing the aria live region from being read
        // this timeout allows voice over to read the aria live
        window.requestAnimationFrame(() => {
          (elements[this.moveIndex - 1] as SafButtonInstance).focus();
        });
        setTimeout(() => {
          (elements[this.moveIndex - 1] as SafButtonInstance).focus();
        }, 120);
      }
      if (event.code === 'ArrowUp' && this.moveIndex > 0) {
        // plus one to all of the as index is 0 but
        // first position is 1
        this.currentAnnounce = onDragOver(
          String(this.initIdxMovedWithKeyboard + 1),
          String(this.moveIndex - 1 + 1),
        );
        this.trackMoves.push({
          over: this.moveIndex - 1,
          active: this.moveIndex,
          action: 'UP',
        });
        this.sms.reOrderColumns(this.moveIndex, this.moveIndex - 1);
        this.moveIndex--;
        // The focus is preventing the aria live region from being read
        // this timeout allows voice over to read the aria live
        window.requestAnimationFrame(() => {
          (elements[this.moveIndex + 1] as SafButtonInstance).focus();
        });
        setTimeout(() => {
          (elements[this.moveIndex + 1] as SafButtonInstance).focus();
        }, 120);
      }
    }
  }

  setCurrentAriaAnnounce(announce: string) {
    this.currentAnnounce = announce;
  }

  handleRestoreDefaults() {
    this.sms.resetColumns(this.allColumns.map((column: any) => column.header));
    this.handleCancelRevertDialogClick();
  }

  handleCancelRevertDialogClick() {
    this.showRevertDialog = false;
    this.switchActiveDrawer(false);
    setTimeout(() => {
      document.getElementById('restore-defaults-button')?.focus();
    });
  }

  switchActiveDrawer(valueChange: boolean) {
    valueChange
      ? this.drawer?.nativeElement.setAttribute('inactive', true)
      : this.drawer?.nativeElement.removeAttribute('inactive');
  }

  handleEndKeyboardDrag() {
    this.currentAnnounce = onDragEnd(
      String(this.initIdxMovedWithKeyboard + 1),
      String(this.moveIndex + 1),
    );
    this.moveIndex = -1;
    const idToFocus = this.copyOfItems[this.initIdxMovedWithKeyboard].id;
    const el = document.getElementById(
      `anchor-show-bottom${idToFocus}`,
    ) as SafButtonInstance;
    el.focus();
  }

  handleCancelKeyboardDrag(skipReFocus?: boolean) {
    for (let x = this.trackMoves.length; x > 0; x--) {
      const currentAction = this.trackMoves[x - 1];
      const overId = this.sms.getColumns()[currentAction.over];
      if (currentAction.action === 'UP') {
        this.sms.moveColumnDown(overId.id);
      } else {
        this.sms.moveColumnUp(overId.id);
      }
    }
    // If we have a moveIndex Value it means that user
    // committing a change if we enter in this fn again
    const currentCol = this.sms.getColumns()[this.initIdxMovedWithKeyboard];
    this.currentAnnounce = onDragCancel(
      String(this.initIdxMovedWithKeyboard + 1),
    );
    if (!skipReFocus) {
      window.requestAnimationFrame(() => {
        const el = document.getElementById(
          `anchor-show-bottom${currentCol.id}`,
        ) as SafButtonInstance;
        el.focus();
      });
    }
    this.moveIndex = -1;
    this.trackMoves = [];
  }

  handleMoveButton(index: number) {
    if (this.moveIndex >= 0) {
      this.handleCancelKeyboardDrag(true);
    } else {
      // Thi means the user start to use the drag with keyboard
      this.currentAnnounce = onDragStart(String(index + 1));
      this.moveIndex = index;
      this.trackMoves = [];
      this.copyOfItems = this.sms.copyColumns();
      this.initIdxMovedWithKeyboard = index;
    }
  }

  dropEvent(event: CdkDragDrop<string[]>): void {
    this.sms.reOrderColumns(event.previousIndex, event.currentIndex);
    setTimeout(() => {
      document
        .getElementById(`anchor-show-bottom${event.currentIndex}`)
        ?.focus();
    });
  }

  onMangeDrawerClose() {
    // clean up aria region announce
    this.currentAnnounce = '';
    if (!this.hideColumnManager) {
      this.managerDrawerClose.emit();
    }
  }

  addColumn() {
    this.columnAdded = { newColumn: true, index: this.items.length };
    this.sms.addColumn('');
    setTimeout(() => {
      const length = this.sms.getColumns().length;
      const id = this.sms.getColumns()[length - 1].id;
      const el = document.getElementById(`combobox-${id}`);
      el?.focus();
    }, 100);
  }

  applyChanges() {
    this.applyManagerChanges.emit(this.items);
    this.managerDrawerClose.emit();
  }

  revertChanges() {
    this.showRevertDialog = true;
    this.switchActiveDrawer(true);
    document.getElementById('dialog-go-back')?.focus();
  }

  removeColumn(id: string, index: number) {
    this.sms.removeColumn(id);
    const getIndex = index < 1 ? index + 1 : index - 1;
    this.moveFocusTo(getIndex);
  }

  openOverlay(index: number) {
    this.overlayOpen = index;
    setTimeout(() => {
      this.overlayMenus?.get(index)?.nativeElement.focus();
    });
  }

  closeOverlay() {
    this.overlayOpen = -1;
  }

  onMoveUp(id: string) {
    this.sms.moveColumnUp(id);
    this.closeOverlay();
    window.requestAnimationFrame(() => {
      const el = document.getElementById(`button-menu-trigger${id}`);
      if (el) {
        (el as SafButtonInstance).focus();
      }
    });
  }

  onMoveDown(id: string) {
    this.sms.moveColumnDown(id);
    this.closeOverlay();
    window.requestAnimationFrame(() => {
      const el = document.getElementById(`button-menu-trigger${id}`);
      if (el) {
        (el as SafButtonInstance).focus();
      }
    });
  }

  onInsertAbove(id: string, index: number) {
    this.sms.insertColumnAbove(id, this.inactiveColumns);
    this.closeOverlay();
    this.columnAdded = { newColumn: true, index: index };
    this.moveFocusTo(index);
  }

  onInsertBelow(id: string, index: number) {
    const newIndex = index + 1;
    this.sms.insertColumnBelow(id, this.inactiveColumns);
    this.closeOverlay();
    this.columnAdded = { newColumn: true, index: newIndex };
    this.moveFocusTo(newIndex);
  }

  handleDrawerKeydown(event: KeyboardEvent) {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
    }
    const targetId = (event.target as HTMLElement).id;
    const targetTag = (event.target as HTMLElement).tagName;

    if (targetTag === 'SAF-MENU-ITEM' && event.code === 'Escape') {
      // Prevents saf menu item to close after clicking ellipsis button
      event.preventDefault();
      return;
    }

    // Prevents drawer to close when on dragging with keyboard
    if (event.key === 'Escape') {
      // Escape bubble up to the drawer
      // This prevents the escape in case it was pressed the
      // space bar to start moving columns
      if (this.moveIndex >= 0) {
        event.preventDefault();
        this.handleCancelKeyboardDrag();
      } else {
        this.onMangeDrawerClose();
      }
      return;
    }

    if (event.key === 'Tab') {
      // this is not the apply button but the cross icon on
      // the drawer
      if (
        targetId === 'apply-button' &&
        this.sms.getColumns().length >= 0 &&
        !event.shiftKey
      ) {
        const focusableId = this.sms.getColumns()[0].id;
        window.requestAnimationFrame(() => {
          document.getElementById(`anchor-show-bottom${focusableId}`);
        });
      } else if (targetId === 'apply-button' && !event.shiftKey) {
        setTimeout(() => this.moveFocusTo(0));
      } else if (targetTag === 'SAF-DRAWER' && event.shiftKey) {
        setTimeout(() => document.getElementById('apply-button')?.focus());
      }
    }
  }

  moveFocusTo(index: number) {
    setTimeout(() => {
      (this.listItemCardRef?.get(index) as any).triggerFocus();
    }, 30);
  }

  showManageColumnsDrawer() {
    this.sms.columns = [...this.activeColumnHeaders].map(
      (value: string, index) => ({
        value,
        id: `${index}-${new Date().getTime()}`,
        alreadyInitialized: true,
      }),
    );
    this.setInactiveColumns();
    this.drawer?.nativeElement.show();
  }

  hideManageColumnsDrawer() {
    this.drawer?.nativeElement.hide();
  }

  private getUniqueFromFirstArray(array1: string[], array2: string[]) {
    return array1.filter((value) => !array2.includes(value));
  }

  private setInactiveColumns() {
    this.inactiveColumns = this.getUniqueFromFirstArray(
      this.allColumns.map((column: any) => column.header),
      this.items,
    );
  }

  onDragItem({ isVisible, id }: { isVisible: boolean; id: string }) {
    this.isTooltipVisible = isVisible;
    this.dragItemId = id;
  }
}
