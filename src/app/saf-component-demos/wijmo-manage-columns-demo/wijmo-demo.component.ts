import {
  Component,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { CollectionView, DataType } from '@grapecity/wijmo';
import {
  CellType,
  DataMap,
  GridPanel,
  type FlexGrid,
} from '@grapecity/wijmo.grid';
import { CellMaker } from '@grapecity/wijmo.grid.cellmaker';
import { Selector } from '@grapecity/wijmo.grid.selector';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
import { WjGridFilterModule } from '@grapecity/wijmo.angular2.grid.filter';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
import { GridManageColumnsComponent } from './grid-manage-columns/wijmo-manage-columns.component';
import { LinkIconComponent } from '../../link-icon/link-icon.component';
import '../../wijmo-license';

const data = [
  'Afghanistan',
  'Aland Islands',
  'Albania',
  'Algeria',
  'American Samoa',
  'Andorra',
  'Angola',
  'Anguilla',
  'Antarctica',
  'Antigua and Barbuda',
  'Argentina',
  'Armenia',
  'Aruba',
  'Australia',
  'Austria',
  'Azerbaijan',
  'Bahamas',
  'Bahrain',
  'Bangladesh',
  'Barbados',
  'Belarus',
  'Belgium',
  'Belize',
  'Benin',
  'Bermuda',
  'Bhutan',
  'Bolivia',
  'Bonaire, Sint Eustatius and Saba',
  'Bosnia and Herzegovina',
  'Botswana',
  'Bouvet Island',
  'Brazil',
  'British Indian Ocean Territory (Chagos Archipelago)',
  'Brunei Darussalam',
  'Bulgaria',
  'Burkina Faso',
  'Burundi',
  'Cambodia',
  'Cameroon',
  'Canada',
  'Cape Verde',
  'Cayman Islands',
  'Central African Republic',
  'Chad',
  'Chile',
  'China',
  'Christmas Island',
  'Cocos (Keeling) Islands',
  'Colombia',
  'Comoros',
  'Congo',
  'Cook Islands',
  'Costa Rica',
  "Cote d'Ivoire",
  'Croatia',
  'Cuba',
  'Curacao',
  'Cyprus',
  'Czechia',
  'Democratic Republic of the Congo',
  'Denmark',
  'Djibouti',
  'Dominica',
  'Dominican Republic',
  'Ecuador',
  'Egypt',
  'El Salvador',
  'Equatorial Guinea',
  'Eritrea',
  'Estonia',
  'Eswatini',
  'Ethiopia',
  'Faroe Islands',
  'Falkland Islands (Malvinas)',
  'Fiji',
  'Finland',
  'France',
  'French Guiana',
  'French Polynesia',
  'French Southern Territories',
  'Gabon',
  'Gambia',
  'Georgia',
  'Germany',
  'Ghana',
  'Gibraltar',
  'Greece',
  'Greenland',
  'Grenada',
  'Guadeloupe',
  'Guam',
  'Guatemala',
  'Guernsey',
  'Guinea',
  'Guinea-Bissau',
  'Guyana',
  'Haiti',
  'Heard Island and McDonald Islands',
  'Holy See (Vatican City State)',
  'Honduras',
  'Hong Kong',
  'Hungary',
  'Iceland',
  'India',
  'Indonesia',
  'Iran',
  'Iraq',
  'Ireland',
  'Isle of Man',
  'Israel',
  'Italy',
  'Jamaica',
  'Japan',
  'Jersey',
  'Jordan',
  'Kazakhstan',
  'Kenya',
  'Kiribati',
  "Democratic People's Republic of Korea",
  'Republic of Korea',
  'Kuwait',
  'Kyrgyz Republic',
  "Lao People's Democratic Republic",
  'Latvia',
  'Lebanon',
  'Lesotho',
  'Liberia',
  'Libyan Arab Jamahiriya',
  'Liechtenstein',
  'Lithuania',
  'Luxembourg',
  'Macao',
  'Madagascar',
  'Malawi',
  'Malaysia',
  'Maldives',
  'Mali',
  'Malta',
  'Marshall Islands',
  'Martinique',
  'Mauritania',
  'Mauritius',
  'Mayotte',
  'Mexico',
  'Micronesia',
  'Moldova',
  'Monaco',
  'Mongolia',
  'Montenegro',
  'Montserrat',
  'Morocco',
  'Mozambique',
  'Myanmar',
  'Namibia',
  'Nauru',
  'Nepal',
  'Netherlands',
  'New Caledonia',
  'New Zealand',
  'Nicaragua',
  'Niger',
  'Nigeria',
  'Niue',
  'Norfolk Island',
  'North Macedonia',
  'Northern Mariana Islands',
  'Norway',
  'Oman',
  'Pakistan',
  'Palau',
  'Palestine',
  'Panama',
  'Papua New Guinea',
  'Paraguay',
  'Peru',
  'Philippines',
  'Pitcairn Islands',
  'Poland',
  'Portugal',
  'Puerto Rico',
  'Qatar',
  'Reunion',
  'Romania',
  'Russian Federation',
  'Rwanda',
  'Saint Barthelemy',
  'Saint Helena',
  'Saint Kitts and Nevis',
  'Saint Lucia',
  'Saint Martin',
  'Saint Pierre and Miquelon',
  'Saint Vincent and the Grenadines',
  'Samoa',
  'San Marino',
  'Sao Tome and Principe',
  'Saudi Arabia',
  'Senegal',
  'Serbia',
  'Seychelles',
  'Sierra Leone',
  'Singapore',
  'Sint Maarten',
  'Slovakia',
  'Slovenia',
  'Solomon Islands',
  'Somalia',
  'South Africa',
  'South Georgia and the South Sandwich Islands',
  'South Sudan',
  'Spain',
  'Sri Lanka',
  'Sudan',
  'Suriname',
  'Svalbard & Jan Mayen Islands',
  'Sweden',
  'Switzerland',
  'Syrian Arab Republic',
  'Taiwan',
  'Tajikistan',
  'Tanzania',
  'Thailand',
  'Timor-Leste',
  'Togo',
  'Tokelau',
  'Tonga',
  'Trinidad and Tobago',
  'Tunisia',
  'Turkey',
  'Turkmenistan',
  'Turks and Caicos Islands',
  'Tuvalu',
  'Uganda',
  'Ukraine',
  'United Arab Emirates',
  'United Kingdom',
  'United States of America',
  'United States Minor Outlying Islands',
  'Uruguay',
  'Uzbekistan',
  'Vanuatu',
  'Venezuela',
  'Vietnam',
  'Virgin Islands, British',
  'Virgin Islands, U.S.',
  'Wallis and Futuna',
  'Western Sahara',
  'Yemen',
  'Zambia',
  'Zimbabwe',
];

enum SELECT_ALL {
  ALL_SELECTED = 'ALL_SELECTED',
  NONE_SELECTED = 'NONE_SELECTED',
  SOME_SELECTED = 'SOME_SELECTED',
}

export interface Model {
  id: number;
  country: string;
  select: 'Yes' | 'No' | 'Maybe';
  status: 'Active' | 'Inactive';
}

function getData(): Model[] {
  return data.map((country, i) => ({
    id: i + 1,
    country,
    select:
      Math.random() > 0.33 ? 'Yes' : Math.random() > 0.66 ? 'No' : 'Maybe',
    checkbox: Math.random() > 0.5,
    status: Math.random() > 0.5 ? 'Active' : 'Inactive',
  }));
}

@Component({
  selector: 'saf-wijmo-columns-demo',
  imports: [
    CommonModule,
    WjGridModule,
    WjGridFilterModule,
    WjInputModule,
    DragDropModule,
    LinkIconComponent,
    GridManageColumnsComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './wijmo-demo.component.html',
})
export class WijmoManageColumnsDemoComponent {
  itemsSourceToolbar = new CollectionView<Model>(getData(), {
    pageSize: 25,
  });

  @ViewChild(GridManageColumnsComponent)
  columnsManager?: GridManageColumnsComponent;
  @ViewChild('gridRef', { static: true }) gridRef!: FlexGrid;
  @ViewChild('drawerRef', { static: false }) drawerRef?: ElementRef;
  @ViewChild('bottomDrawerRef', { static: false }) bottomDrawerRef?: ElementRef;

  selectedIdsToolbar: number[] = [];
  pageIndexToolbar = 0;
  filter = '';
  columnsList: any[] = [];
  defaultColumns: any[] = [];
  noVisibleColumnsList: any[] = [];
  isCompact = document.querySelector('.saf-flexgrid--compact') !== null;
  readonly SELECT_ALL = SELECT_ALL;
  currentSelectAllState = this.getCurrentSelectAllState();
  allColumns: any = [];
  allActiveColumns: string[] = [];
  isColumnUpdateError = false;

  constructor(private cdr: ChangeDetectorRef) {}

  // Toggles for demo
  isCompactDensity = false;
  isAlternatingRows = true;
  isFlexsheet = true;

  handleCompactDensityChange(event: any): void {
    this.isCompactDensity = event.target.checked;
    this.cdr.detectChanges();
    this.gridRef.refresh();
  }
  handleAlternatingRowsChange(event: any): void {
    this.isAlternatingRows = event.target.checked;
  }
  handleFlexsheetChange(event: any): void {
    this.isFlexsheet = event.target.checked;
  }

  handleOpenDrawer(ref: string) {
    if (ref === 'drawerRef') {
      this.drawerRef?.nativeElement.show();
    } else {
      this.bottomDrawerRef?.nativeElement.show();
    }
  }

  getCurrentSelectAllState() {
    const { length } = this.selectedIdsToolbar;
    const { totalItemCount } = this.itemsSourceToolbar;
    switch (length) {
      case 0:
        return SELECT_ALL.NONE_SELECTED;
      case totalItemCount:
        return SELECT_ALL.ALL_SELECTED;
      default:
        return SELECT_ALL.SOME_SELECTED;
    }
  }

  initGrid(grid: FlexGrid) {
    grid.itemFormatter = this.itemFormatter;
    grid.rowHeaders.columns[0].header = 'Select';
    grid.rowHeaders.columns[0].width = 78;
    this.defaultColumns = this.columnsList = grid.columnHeaders.columns;
    const allColumnsHeaders: string[] = grid.columnHeaders.columns
      .map((column) => column.header || '')
      .filter((columnName) => columnName !== '');
    this.allActiveColumns = [...allColumnsHeaders];
    this.allColumns = [...grid.columnHeaders.columns];

    new Selector(grid, {
      showCheckAll: false,
      itemChecked: () => {
        this.updateCheckboxSelect();
      },
    });

    grid.updatedLayout.addHandler((grid: FlexGrid) => {
      this.saffronizeFilterIcon(grid);
    });
  }

  private elementsMustHaveValue = (values: string[]) => {
    return values.every((value) => !!value && value !== '');
  };

  private elementsShouldBeDifferent = (values: string[]) => {
    const newMap = new Map<string, number>();
    values.forEach((value) => {
      const record = newMap.get(value);
      if (!record) {
        newMap.set(value, 1);
      } else {
        newMap.set(value, record + 1);
      }
    });
    const amountIsFine = Array.from(newMap, ([, value]) => value).every(
      (value) => value === 1,
    );
    const numberOfElements = Array.from(newMap, ([, value]) => value).reduce(
      (acc, act) => acc + act,
      0,
    );
    return numberOfElements === values.length && amountIsFine;
  };

  private verifyIfNewColumnsAreValidValues = (
    newValues: string[],
    availableValues: string[],
  ) => {
    return newValues.every(
      (value) =>
        !!availableValues.find((availableValue) => availableValue === value),
    );
  };

  private areNewColumnsValuesOk = (
    newValues: string[],
    availableValues: string[],
  ) => {
    return (
      this.elementsMustHaveValue(newValues) &&
      this.elementsShouldBeDifferent(newValues) &&
      this.verifyIfNewColumnsAreValidValues(newValues, availableValues)
    );
  };

  applyManagerChanges(newColumnsHeaders: any) {
    const availableColumns = this.allColumns
      .map((column: any) => column.header)
      .filter((header: string) => header !== '');

    const areNewValuesOk = this.areNewColumnsValuesOk(
      newColumnsHeaders,
      availableColumns,
    );

    if (areNewValuesOk) {
      const activeColumns: any[] = [];
      newColumnsHeaders.forEach((columnName: any) => {
        const column = this.allColumns.find(
          (column: any) => column.header === columnName,
        );
        if (column) {
          activeColumns.push(column);
        }
      });
      this.allActiveColumns = activeColumns.map((column) => column.header);

      for (let i = 0; this.columnsList.length; i++) {
        this.columnsList.splice(0, 1);
      }
      for (let i = 0; i < activeColumns.length; i++) {
        this.columnsList.splice(i, 0, activeColumns[i]);
      }
    } else {
      this.handleUpdateColumnError(true);
    }
  }

  handleUpdateColumnError(showError: boolean) {
    this.isColumnUpdateError = showError;
  }

  handleOpenManageColumns() {
    this.columnsManager?.showManageColumnsDrawer();
  }

  onManagerClose() {
    this.columnsManager?.hideManageColumnsDrawer();
    setTimeout(() => {
      // move the focus to the button after close
      document.getElementById('openManageColumn')?.focus();
    }, 500);
  }

  onManageColumnsUpdate(event: any) {
    this.noVisibleColumnsList = event.inactiveList;

    for (let i = 0; this.columnsList.length; i++) {
      this.columnsList.splice(0, 1);
    }
    for (let i = 0; i < event.activeList.length; i++) {
      this.columnsList.splice(i, 0, event.activeList[i]);
    }
  }

  updateCheckboxSelect() {
    const grid = this.gridRef;
    const selectedRows = grid.rows.filter((r: any) => r.isSelected);
    const currentSelectedIds = this.selectedIdsToolbar.filter(
      (id: number) => !grid.rows.map((r: any) => r.dataItem.id).includes(id),
    );
    const newSetSelectedIds = new Set([
      ...currentSelectedIds,
      ...selectedRows.map((r: any) => r.dataItem.id),
    ]);
    this.selectedIdsToolbar = Array.from(newSetSelectedIds);
    this.currentSelectAllState = this.getCurrentSelectAllState();
  }

  updateSelectionToolbar() {
    const grid = this.gridRef;
    this.selectedIdsToolbar = grid.itemsSource.sourceCollection
      .filter((r: any) => r.isSelected)
      .map((row: any) => row.id);
  }

  selectAllToolbar() {
    const grid = this.gridRef;
    const currentSelectAllState = this.getCurrentSelectAllState();

    if (currentSelectAllState === SELECT_ALL.ALL_SELECTED) {
      grid.rows.forEach((row: any) => {
        row.isSelected = false;
      });
      this.selectedIdsToolbar = [];
    } else {
      grid.rows.forEach((row: any) => {
        row.isSelected = true;
      });
      this.selectedIdsToolbar = grid.itemsSource.sourceCollection.map(
        (row: any) => row.id,
      );
    }

    this.currentSelectAllState = this.getCurrentSelectAllState();
    grid.refresh(true);
  }

  searchFilter(event: any) {
    const grid = this.gridRef;
    const value = event.target.value;
    this.filter = value;
    this.itemsSourceToolbar.filter = (item: any) =>
      value.length === 0 ||
      item.country.toLowerCase().indexOf(value) !== -1 ||
      String(item.id) === value;
    this.itemsSourceToolbar.moveToPage(0);
    this.pageIndexToolbar = 0;
    grid.rows.forEach((row: any) => {
      row.isSelected = this.selectedIdsToolbar.includes(row.dataItem.id);
    });
  }

  _setPageIndexToolbar(event: any) {
    const grid = this.gridRef;
    const index = event.detail - 1;
    this.itemsSourceToolbar.moveToPage(index);
    this.pageIndexToolbar = index;
    grid.rows.forEach((row: any) => {
      row.isSelected = this.selectedIdsToolbar.includes(row.dataItem.id);
    });
    // Handle Pagination Focus
    let prevButton: any;
    let nextButton: any;
    const buttons = document
      .querySelector('saf-pagination')
      ?.shadowRoot?.querySelectorAll('saf-button');
    buttons?.forEach((button: any) => {
      if (button.innerText === 'Previous') {
        prevButton = button;
      }
      if (button.innerText === 'Next') {
        nextButton = button;
      }
    });
    if (index <= 0) {
      nextButton.focus();
    }
    const showRecords = this.itemsSourceToolbar.pageSize * (index + 1);
    if (showRecords >= this.itemsSourceToolbar.totalItemCount) {
      prevButton.focus();
    }
  }

  setItemsPerPageToolbar(event: any) {
    const grid = this.gridRef;
    const size = event.detail;
    this.itemsSourceToolbar.pageSize = size;
    grid.rows.forEach((row: any) => {
      row.isSelected = this.selectedIdsToolbar.includes(row.dataItem.id);
    });
  }

  itemFormatter = (
    panel: GridPanel,
    rowIdx: number,
    colIdx: number,
    cell: HTMLElement,
  ) => {
    const { grid } = panel;
    if (panel.cellType === CellType.Cell) {
      const col = grid.columns[colIdx];
      if (col.dataType === DataType.Boolean) {
        this.formatCheckboxCell(cell);
      }
      if (col.binding === 'status') {
        this.formatStatusCell(grid, rowIdx, cell);
      }
      if (col.header === 'Link') {
        this.formatLinkCell(cell);
      }
    }
  };

  formatStatusCell = (grid: FlexGrid, rowIdx: number, cell: HTMLElement) => {
    const status = grid.rows[rowIdx].dataItem.status;
    const active = status === 'Active';
    cell.innerHTML = '';
    const statusDot = document.createElement('div');
    statusDot.style.alignItems = 'center';
    statusDot.style.display = 'flex';
    statusDot.style.gap = '8px';
    cell.appendChild(statusDot);
    const dot = document.createElement('div');
    dot.style.backgroundColor = active ? '#eaffe5' : '#ffeded';
    dot.style.borderColor = active ? '#387c2b' : '#dc0a0a';
    dot.style.borderRadius = '50%';
    dot.style.borderStyle = 'solid';
    dot.style.borderWidth = '1px';
    dot.style.height = '12px';
    dot.style.width = '12px';
    statusDot.appendChild(dot);
    const text = document.createElement('span');
    text.textContent = status;
    statusDot.appendChild(text);
  };

  formatLinkCell = (cell: HTMLElement) => {
    // activate link on enter
    cell.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        const link = cell.querySelector('a');
        link?.click();
        event.stopImmediatePropagation();
      }
    });
  };

  formatCheckboxCell = (cell: HTMLElement) => {
    // add SR only to communicate the role and state of the checkbox
    const checkbox = cell.querySelector('input');
    if (!checkbox) return;
    // reuse the existing element so the text updates with the state instead of stacking
    let srOnly = cell.querySelector('saf-sr-only');
    if (!srOnly) {
      srOnly = document.createElement('saf-sr-only');
      checkbox.parentElement?.appendChild(srOnly);
    }
    srOnly.textContent = `Checkbox, ${checkbox.checked ? 'Checked' : 'Unchecked'}`;
  };

  saffronizeFilterIcon = function saffronizeFilterIcon(grid: FlexGrid) {
    const panel = grid.columnHeaders;
    const columns = panel.columns;
    columns.forEach((column) => {
      const cell = panel.getCellElement(0, column.index);
      if (!cell) return;
      cell.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
          e.stopImmediatePropagation();
        }
      });
      const filterButton = cell.querySelector<HTMLButtonElement>(
        '.wj-btn.wj-btn-glyph.wj-elem-filter',
      );
      if (filterButton) {
        cell.addEventListener('focusin', () => {
          filterButton.tabIndex = 0;
        });
        cell.addEventListener('focusout', () => {
          filterButton.tabIndex = -1;
        });
        filterButton.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') {
            filterButton.click();
            e.stopImmediatePropagation();
          }
        });
        filterButton.parentElement!.appendChild(filterButton);
      }
    });

    const dataPanel = grid.cells;
    const dataColumns = dataPanel.columns;

    dataColumns.forEach((column) => {
      const cell = dataPanel.getCellElement(0, column.index);
      if (!cell) return;

      if (cell) {
        cell.addEventListener('focusout', () => {
          cell.tabIndex = -1;
        });
        cell.addEventListener('keydown', (e) => {
          if (e.key === 'Tab') {
            setTimeout(() => {
              cell.tabIndex = 0;
            }, 0);
          }
        });
      }
    });
  };

  selectDataMap = new DataMap<number, Model['select']>(
    [
      { id: 0, name: 'Yes' },
      { id: 1, name: 'No' },
      { id: 2, name: 'Maybe' },
    ],
    'id',
    'name',
  );

  linkCellTemplate = CellMaker.makeLink({
    text: 'Visit ${item.country}',
    href: 'https://www.google.com/search?q=${item.country}',
    label: 'Link: visit ${item.country}',
    attributes: {
      rel: 'noopener noreferrer',
      tabIndex: -1,
    },
    // no need for click handler, the link navigates automatically
  });

  // Utils
  Math = Math;
}
