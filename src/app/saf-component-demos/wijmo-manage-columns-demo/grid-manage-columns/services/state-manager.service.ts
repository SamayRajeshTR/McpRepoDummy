import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Column {
  value: string;
  id: string;
  alreadyInitialized: boolean;
}

@Injectable({ providedIn: 'root' })
export class StateManagerService {
  private _columns = new BehaviorSubject<Column[]>([]);

  public get columns(): Observable<Column[]> {
    return this._columns.asObservable();
  }

  public set columns(columns: Column[]) {
    this._columns.next(columns);
  }

  private _allColumns: any[] = [];

  public get allColumns(): any[] {
    return this._allColumns;
  }

  public set allColumns(value: any[]) {
    this._allColumns = value;
  }

  public updateColumnById(id: string, value: string): void {
    const columns = this._columns.getValue();
    const index = columns.findIndex((item) => item.id === id);
    if (index >= 0) {
      columns[index].value = value;
      columns[index].alreadyInitialized = true;
      this.columns = columns;
    }
  }

  public initializeColumnById(id: string): void {
    const columns = this._columns.getValue();
    const index = columns.findIndex((item) => item.id === id);
    console.log('alex - index', index);
    if (index >= 0) {
      columns[index].alreadyInitialized = true;
      this.columns = columns;
    }
  }

  public addColumn(value: string): void {
    const columns = this._columns.getValue();
    columns.push({
      value,
      id: `${this.getItems().length}-${new Date().getTime()}`,
      alreadyInitialized: false,
    });
    this.columns = columns;
  }

  public removeColumn(id: string): void {
    const columns = this._columns.getValue().filter((item) => item.id !== id);
    this.columns = columns;
  }

  public moveColumnUp(id: string): void {
    const columns = this._columns.getValue();
    const index = columns.findIndex((item) => item.id === id);
    if (index > 0) {
      const temp = columns[index - 1];
      columns[index - 1] = columns[index];
      columns[index] = temp;
      this.columns = columns;
    }
  }

  public moveColumnDown(id: string): void {
    const columns = this._columns.getValue();
    const index = columns.findIndex((item) => item.id === id);
    if (index < columns.length - 1) {
      const temp = columns[index + 1];
      columns[index + 1] = columns[index];
      columns[index] = temp;
      this.columns = columns;
    }
  }

  public insertColumnAbove(id: string, inactiveColumns: string[]): void {
    const columns = this._columns.getValue();
    const index = columns.findIndex((item) => item.id === id);
    columns.splice(index, 0, {
      value: inactiveColumns[0],
      id: `${this.getItems().length}-${new Date().getTime()}`,
      alreadyInitialized: false,
    });
    this.columns = columns;
  }

  public insertColumnBelow(id: string, inactiveColumns: string[]): void {
    const columns = this._columns.getValue();
    const index = columns.findIndex((item) => item.id === id);
    columns.splice(index + 1, 0, {
      value: inactiveColumns[0],
      id: `${this.getItems().length}-${new Date().getTime()}`,
      alreadyInitialized: false,
    });
    this.columns = columns;
  }

  public getItems(): string[] {
    return this._columns.getValue().map((item) => item.value);
  }

  public getColumns(): Column[] {
    return this._columns.getValue();
  }

  public copyColumns(): Column[] {
    return this._columns.getValue().map((item) => ({ ...item }));
  }

  public reOrderColumns(prevIndex: number, newIndex: number): void {
    const columns = this._columns.getValue();
    const [movedColumn] = columns.splice(prevIndex, 1);
    columns.splice(newIndex, 0, movedColumn);
    this.columns = columns;
  }

  resetColumns(newColumns: any[]): void {
    const columns = newColumns.map((value, index) => ({
      value,
      id: `${index}-${new Date().getTime()}`,
      alreadyInitialized: true,
    }));
    this._columns.next(columns);
  }
}
