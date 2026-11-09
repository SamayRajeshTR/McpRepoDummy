import { Component, ViewChild, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SafSplitterInstance } from '@saffron/core-components';
import { LinkIconComponent } from '../../link-icon/link-icon.component';
import { InPageNavigationComponent, InPageNavigationLink } from '../../layout/in-page-navigation/index';

@Component({
  selector: 'saf-splitter-demo',
  imports: [LinkIconComponent, InPageNavigationComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './saf-splitter-demo.component.html',
})
export class SafSplitterDemoComponent {
  inPageLinks: InPageNavigationLink[] = [
    { id: 'splitter', label: 'Splitter' },
  ];

  @ViewChild('splitterRef') splitter: SafSplitterInstance | undefined;
  byFunctionValue = 10;
  widthTextField = 50;
  widthValue = 50;

  changeSplitterByFn = () => {
    if (this.splitter) {
      // @ts-expect-error changeSplitterSize is a method on the SafSplitterInstance, but TypeScript doesn't recognize it
      (this.splitter.nativeElement as SafSplitterInstance).changeSplitterSize(
        this.byFunctionValue,
      );
    }
  };

  handleChangeWidth = () => {
    this.widthValue = this.widthTextField;
  };

  changeByFnTextOnKeydown = (event: Event) => {
    // @ts-expect-error target.value
    this.handleChangeByFnValue(event.target.value, 'fn');
  };

  changeByWidthTextOnKeydown = (event: Event) => {
    // @ts-expect-error target.value
    this.handleChangeByFnValue(event.target.value, 'width');
  };

  handleWidthChange = (a: any) => {
    this.widthTextField = a.target.width;
  };

  handleChangeByFnValue = (value: string, type: 'width' | 'fn') => {
    try {
      const valueAsNumber = parseInt(value, 10);
      if (valueAsNumber >= 0 && valueAsNumber <= 100) {
        if (type === 'fn') {
          this.byFunctionValue = valueAsNumber;
        } else {
          this.widthTextField = valueAsNumber;
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
}
