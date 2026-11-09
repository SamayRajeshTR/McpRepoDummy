import { SafComboboxInstance } from '@saffron/core-components';
import { FormsModule } from '@angular/forms';
import {
  Component,
  ViewChild,
  ElementRef,
  OnInit,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { LinkIconComponent } from '../../link-icon/link-icon.component';

import { dataOptions } from './data';
import { SafA11y } from '@saffron/core-components';
import { InPageNavigationComponent, InPageNavigationLink } from '../../layout/in-page-navigation/index';

@Component({
  selector: 'saf-combobox-demo',
  imports: [FormsModule, LinkIconComponent, InPageNavigationComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './saf-combobox-demo.component.html',
})
export class SafComboboxDemoComponent implements OnInit {
  inPageLinks: InPageNavigationLink[] = [
    { id: 'combobox-default', label: 'Default' },
    { id: 'combobox-clearable', label: 'Clearable' },
    { id: 'combobox-compact-combobox', label: 'Compact combobox' },
    { id: 'combobox-disabled', label: 'Disabled' },
    { id: 'combobox-with-infinite-scroll', label: 'With infinite scroll and remote search' },
    { id: 'combobox-with-single-selection', label: 'With single selection' },
    { id: 'combobox-with-multi-selection', label: 'With multiple selection' },
    { id: 'combobox-with-sub-string-highlighting', label: 'With sub-string highlighting' },
    { id: 'combobox-virtualized', label: 'Virtualized' },
    { id: 'combobox-free-solo', label: 'Adding custom options' },
    { id: 'combobox-in-a-form', label: 'In a form' },
  ];

  @ViewChild('comboboxValue') comboboxValue!: ElementRef;
  @ViewChild('comboboxAutocomplete') comboboxAutocomplete!: ElementRef;

  loading = false;
  validationMessage = '';
  isValid: boolean | null = null;
  selectedValue: string | undefined = '';
  clearableValue: string = 'Tom Baker';
  constructor(private elementRef: ElementRef) {}

  page = 1;
  search = '';
  filteredOptions: typeof dataOptions = [];

  options = [
    'William Hartnell',
    'Patrick Troughton',
    'Jon Pertwee',
    'Peter Davidson',
    'Christopher Eccleston',
    'Matt Smith',
  ];

  singleValue = '';
  multipleValue = '';
  multiplePlaceholder = '';

  multipleOptions = [
    { label: 'William Hartnell', id: 1, selected: false },
    { label: 'Patrick Troughton', id: 2, selected: false },
    { label: 'Jon Pertwee', id: 3, selected: false },
    { label: 'Tom Baker', id: 4, selected: false },
    { label: 'Peter Davidson', id: 5, selected: false },
    { label: 'Colin Baker', id: 6, selected: false },
  ];

  virtualizedOptions = dataOptions.slice(0, 1000);

  get selectedOptions() {
    return this.multipleOptions.filter((o) => o.selected);
  }

  changeMultipleText() {
    if (this.selectedOptions.length === 0) {
      this.multipleValue = '';
      this.multiplePlaceholder = '';
    } else if (this.selectedOptions.length === 1) {
      this.multiplePlaceholder = '1 item selected';
    } else {
      this.multiplePlaceholder = `${this.selectedOptions.length} items selected`;
    }
  }

  onSingleClick(option: string) {
    this.singleValue = option;
  }

  onMultipleClick(option: { selected: boolean }) {
    option.selected = !option.selected;
    this.changeMultipleText();
  }

  onMultipleRemove(option: { selected: boolean }) {
    option.selected = false;
    this.changeMultipleText();
  }

  onMultipleClearAll() {
    this.multipleOptions.forEach((o) => (o.selected = false));
    this.changeMultipleText();
  }

  ngOnInit() {
    this.onMockFetch();
  }

  async onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (this.search !== value) {
      this.page = 1;
      this.search = value;
      this.onMockFetch();
    }
  }

  async onMockFetch() {
    this.loading = true;
    await new Promise((res) => setTimeout(() => res(true), 1000));
    const filterFunc = this.search
      ? (o: { label: string }) =>
          o.label.toLowerCase().includes(this.search.toLowerCase())
      : (o: any) => o;
    this.filteredOptions = dataOptions
      .filter(filterFunc)
      .slice(0, 10 * this.page + 10);
    this.page++;
    this.loading = false;

    if (this.filteredOptions.length === 0) {
      SafA11y.announce(`No results found for "${this.search}"`);
    }
  }

  onClear(event: Event) {
    this.clearableValue = '';
    // Duplicate DOM ids (e.g. the section heading) make id lookups unreliable,
    // so use the combobox that emitted the event instead.
    const combobox = event.target as HTMLElement;
    combobox.querySelectorAll('saf-option').forEach((opt) => {
      (opt as HTMLElement & { selected: boolean }).selected = false;
    });
  }

  onOptionClick(option: string, event: MouseEvent) {
    this.clearableValue = option;
    this.selectOptionFromEvent(event);
  }

  onOptionSelect(event: MouseEvent) {
    this.selectOptionFromEvent(event);
  }

  // Marks the clicked saf-option as selected and clears selected on its siblings.
  private selectOptionFromEvent(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const optionEl = target.closest('saf-option') as
      | (HTMLElement & { selected: boolean })
      | null;
    if (!optionEl || optionEl.hasAttribute('disabled')) {
      return;
    }
    optionEl.parentElement
      ?.querySelectorAll('saf-option')
      .forEach((opt) => {
        (opt as HTMLElement & { selected: boolean }).selected = opt === optionEl;
      });
  }

  onInput(event: Event) {
    this.clearableValue = (event.target as HTMLInputElement).value;
  }

  onSetAutocomplete() {
    this.comboboxAutocomplete.nativeElement.setAutocomplete(
      'Will',
      'William Hartnell',
    );
  }

  onChange() {
    this.selectedValue = this.comboboxValue?.nativeElement?.value;
  }

  onSubmit(event: SubmitEvent) {
    event.preventDefault();
    this.onChange();
    this.onValidate();
  }

  onReset() {
    this.selectedValue = '';
    this.validationMessage = '';
    setTimeout(() => (this.isValid = null), 100);
    this.comboboxValue.nativeElement.value = '';
  }

  onValidate() {
    if (!this.selectedValue) {
      this.isValid = false;
      this.validationMessage = 'Please select at least one option';
    } else {
      this.isValid = true;
      this.validationMessage = 'Successfully submitted!';
    }
  }

  testValidate() {
    console.log('test function fired');
    const taco = document.getElementById(
      'combobox-default-example',
    ) as HTMLInputElement;
    console.log(taco);
    console.log(taco.value);
    taco.value = 'hot dogs';
    if (taco?.value.includes('test')) {
      taco.value = '';
    }
  }

  optionsWithIds = [
    { label: 'William Hartnell', id: 1 },
    { label: 'Patrick Troughton', id: 2 },
    { label: 'Jon Pertwee', id: 3 },
    { label: 'Tom Baker', id: 4 },
    { label: 'Peter Davidson', id: 5 },
    { label: 'Colin Baker', id: 6 },
    { label: 'Sylvester McCoy', id: 7 },
    { label: 'Paul McGann', id: 8 },
    { label: 'Christopher Eccleston', id: 9 },
    { label: 'David Tenant', id: 10 },
    { label: 'Matt Smith', id: 11 },
    { label: 'Peter Capaldi', id: 12 },
    { label: 'Jodie Whittaker', id: 13 },
    { label: 'Ncuti Gatwa', id: 14 },
  ];

  selectedItem: (typeof this.optionsWithIds)[number] | null = null;
  searchTerm: string = '';

  get filteredOptionsFreeSolo() {
    if (!this.searchTerm) return this.optionsWithIds;
    return this.optionsWithIds.filter((option) =>
      option.label.toLowerCase().includes(this.searchTerm.toLowerCase()),
    );
  }

  get searchTermExistsAsOption() {
    return this.optionsWithIds.some(
      (option) => option.label.toLowerCase() === this.searchTerm.toLowerCase(),
    );
  }

  onInputFreeSolo(event: any) {
    this.searchTerm = event.detail;
  }

  onSelectOption(option: any) {
    this.selectedItem = option;
    this.searchTerm = '';
  }

  // Reference to the combobox element
  @ViewChild('combobox') comboboxRef!: ElementRef<SafComboboxInstance>;

  onAddCustomOption(event: MouseEvent) {
    // Stops the default combobox clickHandler from being called,
    // to avoid setting the value of the combobox to the value of the custom option
    // which results in the combobox having a value of "Add '{{searchTerm}}'"
    event.stopPropagation();
    this.selectedItem = { label: this.searchTerm, id: -1 };
    this.searchTerm = '';
    // Close the combobox, this is handled by the combobox clickHandler originally,
    this.comboboxRef.nativeElement.blur();
    // then handle focus. Since the selected option disappears, focus shifts to the beginning of the page.
    // We want to keep the focus on the combobox, so we need to set it back to the combobox.
    // then blur it to remove the text selection, mimicking default behavior
    this.comboboxRef.nativeElement.focus();
    this.comboboxRef.nativeElement.blur();
  }

  onOptionClickFreeSolo(option: (typeof this.optionsWithIds)[number]) {
    this.searchTerm = '';
    this.selectedItem = option;
  }
}
