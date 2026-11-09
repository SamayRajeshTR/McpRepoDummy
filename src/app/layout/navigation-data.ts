export type NavigationCategory =
  | 'getting-started'
  | 'components'
  | 'patterns'
  | 'preview'
  | 'resources';

export interface NavigationItem {
  id: string;
  label: string;
  /** Absolute path as returned by Router.url, e.g. '/accordion' */
  path: string;
  icon: string;
  category: NavigationCategory;
  deprecated?: boolean;
  deprecationMessage?: string;
}

export interface NavigationCategoryGroup {
  id: string;
  label: string;
  icon: string;
  items: NavigationItem[];
}

export const allNavigationItems: NavigationItem[] = [
  // Getting Started
  {
    id: 'getting-started',
    label: 'Getting Started',
    path: '/getting-started',
    icon: 'rocket',
    category: 'getting-started',
  },

  // Resources
  {
    id: 'documentation-study',
    label: 'Documentation Study',
    path: '/documentation-study',
    icon: 'users',
    category: 'resources',
  },
  {
    id: 'adopting-saffron-tokens',
    label: 'Adopting Saffron Tokens',
    path: '/adopting-saffron-tokens',
    icon: 'palette',
    category: 'resources',
  },

  // Components (alphabetical)
  {
    id: 'accordion',
    label: 'Accordion',
    path: '/accordion',
    icon: 'list',
    category: 'components',
  },
  {
    id: 'action-card',
    label: 'Action Card',
    path: '/action-card',
    icon: 'rectangle-list',
    category: 'components',
  },
  {
    id: 'activity',
    label: 'Activity',
    path: '/activity',
    icon: 'clock',
    category: 'components',
  },
  {
    id: 'chat',
    label: 'Chat',
    path: '/chat',
    icon: 'robot',
    category: 'components',
  },
  {
    id: 'ai-prompt',
    label: 'AI Prompt',
    path: '/ai-prompt',
    icon: 'robot',
    category: 'components',
  },
  {
    id: 'alert',
    label: 'Alert',
    path: '/alert',
    icon: 'triangle-exclamation',
    category: 'components',
  },
  {
    id: 'anchor',
    label: 'Anchor',
    path: '/anchor',
    icon: 'link',
    category: 'components',
  },
  {
    id: 'avatar',
    label: 'Avatar',
    path: '/avatar',
    icon: 'circle-user',
    category: 'components',
  },
  {
    id: 'back-to-top',
    label: 'Back to Top',
    path: '/back-to-top',
    icon: 'arrow-up',
    category: 'components',
  },
  {
    id: 'badge',
    label: 'Badge',
    path: '/badge',
    icon: 'certificate',
    category: 'components',
  },
  {
    id: 'breadcrumb',
    label: 'Breadcrumb',
    path: '/breadcrumb',
    icon: 'chevron-right',
    category: 'components',
  },
  {
    id: 'button',
    label: 'Button',
    path: '/button',
    icon: 'hand-pointer',
    category: 'components',
  },
  {
    id: 'button-embedded',
    label: 'Button Embedded',
    path: '/button-embedded',
    icon: 'square',
    category: 'components',
  },
  {
    id: 'button-group',
    label: 'Button Group',
    path: '/button-group',
    icon: 'layer-group',
    category: 'components',
  },
  {
    id: 'button-and-menu',
    label: 'Button and Menu',
    path: '/button-and-menu',
    icon: 'bars',
    category: 'components',
  },
  {
    id: 'button-and-dialog',
    label: 'Button and Dialog',
    path: '/button-and-dialog',
    icon: 'window-maximize',
    category: 'components',
  },
  {
    id: 'card',
    label: 'Card',
    path: '/card',
    icon: 'id-card',
    category: 'components',
  },
  {
    id: 'checkbox',
    label: 'Checkbox',
    path: '/checkbox',
    icon: 'square-check',
    category: 'components',
  },
  {
    id: 'checkbox-group',
    label: 'Checkbox Group',
    path: '/checkbox-group',
    icon: 'list-check',
    category: 'components',
  },
  {
    id: 'chip',
    label: 'Chip',
    path: '/chip',
    icon: 'tag',
    category: 'components',
  },
  {
    id: 'combobox',
    label: 'Combobox',
    path: '/combobox',
    icon: 'caret-down',
    category: 'components',
  },
  {
    id: 'datepicker',
    label: 'DatePicker',
    path: '/datepicker',
    icon: 'calendar',
    category: 'components',
  },
  {
    id: 'dialog',
    label: 'Dialog',
    path: '/dialog',
    icon: 'window-maximize',
    category: 'components',
  },
  {
    id: 'disclosure',
    label: 'Disclosure',
    path: '/disclosure',
    icon: 'chevron-down',
    category: 'components',
  },
  {
    id: 'divider',
    label: 'Divider',
    path: '/divider',
    icon: 'minus',
    category: 'components',
  },
  {
    id: 'drawer',
    label: 'Drawer',
    path: '/drawer',
    icon: 'sidebar',
    category: 'components',
  },
  {
    id: 'empty-state',
    label: 'Empty State',
    path: '/empty-state',
    icon: 'circle-exclamation',
    category: 'components',
  },
  {
    id: 'faceted-filter',
    label: 'Faceted Filter',
    path: '/faceted-filter',
    icon: 'filter',
    category: 'components',
  },
  {
    id: 'file-upload',
    label: 'File Upload',
    path: '/file-upload',
    icon: 'upload',
    category: 'components',
  },
  {
    id: 'file-upload-progress-panel',
    label: 'File Upload Progress Panel',
    path: '/file-upload-progress-panel',
    icon: 'upload',
    category: 'components',
  },
  {
    id: 'file-upload-status-item',
    label: 'File Upload Status Item',
    path: '/file-upload-status-item',
    icon: 'upload',
    category: 'components',
  },
  {
    id: 'footer',
    label: 'Footer',
    path: '/footer',
    icon: 'window-minimize',
    category: 'components',
  },
  {
    id: 'icon',
    label: 'Icon',
    path: '/icon',
    icon: 'icons',
    category: 'components',
  },
  {
    id: 'layout-grid',
    label: 'Layout Grid',
    path: '/layout-grid',
    icon: 'grid',
    category: 'components',
  },
  {
    id: 'list',
    label: 'List',
    path: '/list',
    icon: 'list-ul',
    category: 'components',
  },
  {
    id: 'listbox',
    label: 'Listbox',
    path: '/listbox',
    icon: 'list',
    category: 'components',
  },
  {
    id: 'option',
    label: 'Option',
    path: '/option',
    icon: 'check',
    category: 'components',
  },
  {
    id: 'logo',
    label: 'Logo',
    path: '/logo',
    icon: 'image',
    category: 'components',
  },
  {
    id: 'menu',
    label: 'Menu',
    path: '/menu',
    icon: 'bars',
    category: 'components',
  },
  {
    id: 'message-box',
    label: 'Message Box',
    path: '/message-box',
    icon: 'message',
    category: 'components',
  },
  {
    id: 'metadata',
    label: 'Metadata',
    path: '/metadata',
    icon: 'info-circle',
    category: 'components',
  },
  {
    id: 'number-field',
    label: 'Number Field',
    path: '/number-field',
    icon: 'hashtag',
    category: 'components',
  },
  {
    id: 'pagination',
    label: 'Pagination',
    path: '/pagination',
    icon: 'ellipsis',
    category: 'components',
  },
  {
    id: 'product-header',
    label: 'Product Header',
    path: '/product-header',
    icon: 'window-maximize',
    category: 'components',
  },
  {
    id: 'progress',
    label: 'Progress',
    path: '/progress',
    icon: 'spinner',
    category: 'components',
  },
  {
    id: 'progress-ring',
    label: 'Progress Ring',
    path: '/progress-ring',
    icon: 'circle-notch',
    category: 'components',
  },
  {
    id: 'progress-text',
    label: 'Progress Text',
    path: '/progress-text',
    icon: 'percent',
    category: 'components',
  },
  {
    id: 'radio-group',
    label: 'Radio Group',
    path: '/radio-group',
    icon: 'circle-dot',
    category: 'components',
  },
  {
    id: 'search-field',
    label: 'Search Field',
    path: '/search-field',
    icon: 'magnifying-glass',
    category: 'components',
  },
  {
    id: 'select',
    label: 'Select',
    path: '/select',
    icon: 'caret-down',
    category: 'components',
  },
  {
    id: 'side-nav',
    label: 'Side Nav',
    path: '/side-nav',
    icon: 'bars',
    category: 'components',
  },
  {
    id: 'skip-link',
    label: 'Skip Link',
    path: '/skip-link',
    icon: 'forward',
    category: 'components',
  },
  {
    id: 'skip-link-group',
    label: 'Skip Link Group',
    path: '/skip-link-group',
    icon: 'forward-step',
    category: 'components',
  },
  {
    id: 'slider',
    label: 'Slider',
    path: '/slider',
    icon: 'sliders',
    category: 'components',
  },
  {
    id: 'splitter',
    label: 'Splitter',
    path: '/splitter',
    icon: 'grip-lines-vertical',
    category: 'components',
  },
  {
    id: 'status',
    label: 'Status',
    path: '/status',
    icon: 'circle-info',
    category: 'components',
  },
  {
    id: 'stepper',
    label: 'Stepper',
    path: '/stepper',
    icon: 'stairs',
    category: 'components',
  },
  {
    id: 'switch',
    label: 'Switch',
    path: '/switch',
    icon: 'toggle-on',
    category: 'components',
  },
  {
    id: 'table',
    label: 'Table',
    path: '/table',
    icon: 'table',
    category: 'components',
  },
  {
    id: 'tabs',
    label: 'Tabs',
    path: '/tabs',
    icon: 'folder',
    category: 'components',
  },
  {
    id: 'text',
    label: 'Text',
    path: '/text',
    icon: 'font',
    category: 'components',
  },
  {
    id: 'text-area',
    label: 'Text Area',
    path: '/text-area',
    icon: 'align-left',
    category: 'components',
  },
  {
    id: 'text-field',
    label: 'Text Field',
    path: '/text-field',
    icon: 'input-text',
    category: 'components',
  },
  {
    id: 'theme-provider',
    label: 'Theme Provider',
    path: '/theme-provider',
    icon: 'palette',
    category: 'components',
  },
  {
    id: 'toolbar',
    label: 'Toolbar',
    path: '/toolbar',
    icon: 'wrench',
    category: 'components',
  },
  {
    id: 'tooltip',
    label: 'Tooltip',
    path: '/tooltip',
    icon: 'comment-dots',
    category: 'components',
  },
  {
    id: 'tree-view',
    label: 'Tree View',
    path: '/tree-view',
    icon: 'sitemap',
    category: 'components',
  },
  {
    id: 'wijmo',
    label: 'Wijmo',
    path: '/wijmo',
    icon: 'chart-line',
    category: 'components',
  },
  {
    id: 'wijmo-manage-columns',
    label: 'Managing Columns with Wijmo',
    path: '/wijmo-manage-columns',
    icon: 'columns',
    category: 'components',
  },
  {
    id: 'windows',
    label: 'Windows',
    path: '/windows',
    icon: 'window-restore',
    category: 'components',
    deprecated: true,
    deprecationMessage: 'Window, Windows, and Window panel are all deprecated as of v4 and will be removed in a future major release.',
  },
  {
    id: 'wizard',
    label: 'Wizard',
    path: '/wizard',
    icon: 'hat-wizard',
    category: 'components',
  },

  // Patterns
  {
    id: 'ai-workspace',
    label: 'AI Workspace',
    path: '/ai-workspace',
    icon: 'desktop',
    category: 'patterns',
    deprecated: true,
    deprecationMessage: 'This pattern is deprecated and will be removed in V5.',
  },

  // Preview
  {
    id: 'basic-form',
    label: 'Basic Form',
    path: '/basic-form',
    icon: 'file-lines',
    category: 'preview',
  },
  {
    id: 'carousel',
    label: 'Carousel',
    path: '/carousel',
    icon: 'images',
    category: 'preview',
  },
  {
    id: 'comment-field',
    label: 'Comment Field',
    path: '/comment-field',
    icon: 'comment',
    category: 'preview',
  },
];

export const navigationData: NavigationCategoryGroup[] = [
  {
    id: 'getting-started',
    label: 'Getting Started',
    icon: 'house',
    items: allNavigationItems.filter((i) => i.category === 'getting-started'),
  },
  {
    id: 'resources',
    label: 'Resources',
    icon: 'book',
    items: allNavigationItems.filter((i) => i.category === 'resources'),
  },
  {
    id: 'components',
    label: 'Components',
    icon: 'objects-column',
    items: allNavigationItems.filter((i) => i.category === 'components'),
  },
  {
    id: 'patterns',
    label: 'Patterns',
    icon: 'puzzle-piece',
    items: allNavigationItems.filter((i) => i.category === 'patterns'),
  },
  {
    id: 'preview',
    label: 'Preview Components',
    icon: 'eye',
    items: allNavigationItems.filter((i) => i.category === 'preview'),
  },
];

export const findNavigationItemByPath = (path: string): NavigationItem | undefined =>
  allNavigationItems.find((item) => item.path === path);
