import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { StepStatus } from '@saffron/core-components';
import { LinkIconComponent } from '../../link-icon/link-icon.component';
import { InPageNavigationComponent, InPageNavigationLink } from '../../layout/in-page-navigation/index';

@Component({
  selector: 'saf-wizard-demo',
  imports: [LinkIconComponent, InPageNavigationComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './saf-wizard-demo.component.html',
  styleUrls: ['./saf-wizard-demo.component.scss'],
})
export class SafWizardDemoComponent {
  inPageLinks: InPageNavigationLink[] = [
    { id: 'wizard-horizontal', label: 'Horizontal' },
    { id: 'wizard-vertical', label: 'Vertical' },
  ];

  steps = [
    {
      title: 'Step Title 1',
      description: 'Step description 1',
      contentText: 'Step content 1',
    },
    {
      title: 'Step Title 2',
      description: 'Step description 2',
      contentText: 'Step content 2',
    },
    {
      title: 'Step Title 3',
      description: 'Step description 3',
      contentText: 'Step content 3',
    },
    {
      title: 'Step Title 4',
      description: 'Step description 4',
      contentText: 'Step content 4',
    },
  ];

  activeHStep = 1;
  activeVStep = 1;
  activeVBgStep = 1;

  handleHNext() {
    this.activeHStep++;
  }

  handleHBack() {
    this.activeHStep--;
  }

  handleVNext() {
    if (this.activeVStep < this.steps.length) {
      this.activeVStep++;
    }
  }

  handleVBack() {
    this.activeVStep--;
  }

  handleVBgNext() {
    if (this.activeVBgStep < this.steps.length) {
      this.activeVBgStep++;
    }
  }

  handleVBgBack() {
    this.activeVBgStep--;
  }

  getStatus(step: number, active: number): StepStatus {
    if (step === active) {
      return 'active';
    }
    if (step < active) {
      return 'completed';
    }
    return 'inactive';
  }

  getStatusLabel(step: number, active: number) {
    if (step === active) {
      return 'In progress';
    }
    if (step < active) {
      return 'Complete';
    }
    return 'Incomplete';
  }
}
