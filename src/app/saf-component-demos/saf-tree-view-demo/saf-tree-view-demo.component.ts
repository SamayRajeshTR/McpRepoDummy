import {
  Component,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { LinkIconComponent } from '../../link-icon/link-icon.component';
import { InPageNavigationComponent, InPageNavigationLink } from '../../layout/in-page-navigation/index';

// Recursive data type

interface TreeArray {
  name: string;
  icon: string;
  items?: TreeArray[];
};

@Component({
  selector: 'saf-tree-item-recursive',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <ng-template #template>
      <saf-tree-item expanded>
        <saf-icon [iconName]="data.icon" size="16"></saf-icon>
        <span style="margin-left: 6px;">{{ data.name }}</span>
        @for (data of data.items; track data) {
          <saf-tree-item-recursive [data]="data"></saf-tree-item-recursive>
        }
      </saf-tree-item>
    </ng-template>
  `,
})
export class SafTreeItemRecursiveComponent implements OnInit {
  @ViewChild('template', { static: true }) template: any;

  @Input() data!: TreeArray;

  constructor(private viewContainerRef: ViewContainerRef) {}

  ngOnInit() {
    this.viewContainerRef.createEmbeddedView(this.template);
  }
}

@Component({
  selector: 'saf-tree-view-demo',
  imports: [SafTreeItemRecursiveComponent, LinkIconComponent, InPageNavigationComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './saf-tree-view-demo.component.html',
})
export class SafTreeViewDemoComponent {
  inPageLinks: InPageNavigationLink[] = [
    { id: 'tree-view-default', label: 'Default' },
    { id: 'tree-view-flat', label: 'Flat' },
    { id: 'tree-view-nested', label: 'Nested' },
    { id: 'tree-view-dynamic-menu', label: 'Dynamic Menu' },
    { id: 'tree-view-dynamic-tree', label: 'Dynamic Tree' },
    { id: 'tree-view-keyboard-click', label: 'Keyboard click' },
  ];

  clickCounts: Record<string, number> = { leaf: 0, parent: 0, child: 0, disabled: 0 };
  expandedChangeCounts: Record<string, number> = { leaf: 0, parent: 0 };

  countClick(id: string) {
    this.clickCounts[id]++;
  }

  countExpandedChange(id: string) {
    this.expandedChangeCounts[id]++;
  }

  treeData: TreeArray[] = [
    {
      name: 'Network',
      icon: 'sitemap',
    },
    {
      name: 'This PC',
      icon: 'house',
      items: [
        {
          name: 'Documents',
          icon: 'folder',
        },
        {
          name: 'Downloads',
          icon: 'folder',
          items: [
            {
              name: 'saffron_design_system-main.zip',
              icon: 'file',
            },
          ],
        },
        {
          name: 'Music',
          icon: 'folder',
          items: [
            {
              name: '80s',
              icon: 'folder',
              items: [
                {
                  name: 'Joy Division',
                  icon: 'folder',
                  items: [
                    {
                      name: 'Love Will Tear Us Apart.mp3',
                      icon: 'file',
                    },
                    {
                      name: 'Disorder.mp3',
                      icon: 'file',
                    },
                  ],
                },
                {
                  name: 'New Order',
                  icon: 'folder',
                  items: [
                    {
                      name: 'Bizarre Love Triangle.mp3',
                      icon: 'file',
                    },
                    {
                      name: 'Blue Monday.mp3',
                      icon: 'file',
                    },
                  ],
                },
                {
                  name: 'Talking Heads',
                  icon: 'folder',
                  items: [
                    {
                      name: 'Burning Down the House.mp3',
                      icon: 'file',
                    },
                    {
                      name: '',
                      icon: 'ellipsis-stroke',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          name: 'Pictures',
          icon: 'folder',
        },
      ],
    },
  ];
}
