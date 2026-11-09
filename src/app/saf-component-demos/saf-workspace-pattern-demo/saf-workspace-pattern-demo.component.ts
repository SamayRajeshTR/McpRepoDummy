import { FormsModule } from '@angular/forms';
import {
  Component,
  ElementRef,
  ViewChildren,
  QueryList,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { LinkIconComponent } from '../../link-icon/link-icon.component';
import { InPageNavigationComponent, InPageNavigationLink } from '../../layout/in-page-navigation/index';

interface IMessage {
  name: string;
  time: string;
  text: string;
};

interface IWindow {
  id?: string;
  isLoading: boolean;
  title: string;
  resultTitle: string;
  resultSubtitle: string;
  resultText: string;
  results: {
    type: string;
    name: string;
  }[];
};

const getTime = () => {
  const now = new Date();
  const hour = now.getHours() % 12 || 12;
  const mins =
    now.getMinutes() < 10 ? `0${now.getMinutes()}` : now.getMinutes();
  const ampm = now.getHours() >= 12 ? 'p.m.' : 'a.m.';
  return `${hour}:${mins} ${ampm}`;
};

const windowMocked: IWindow = {
  isLoading: true,
  title: 'Mossimo Wals docs',
  resultTitle: 'Documents',
  resultSubtitle: "related to 'Mossimo Wals '",
  resultText: 'Project  2022',
  results: [
    {
      type: 'document',
      name: 'Doc XYZ.pdf',
    },
    {
      type: 'document',
      name: 'Doc ABC.pdf',
    },
    {
      type: 'document',
      name: 'Doc MPLS.pdf',
    },
    {
      type: 'document',
      name: 'Doc XYW.pdf',
    },
    {
      type: 'document',
      name: 'Doc ABC.pdf',
    },
    {
      type: 'document',
      name: 'Doc ABC.pdf',
    },
  ],
};

const mockedResponses = [
  'Okay - glad to help',
  'Sure, Jane. In California, non-complete clauses are generally unenforceble except in limited circumstanses. They are subject to strict scrutiny and are typically only valid in the contexrt of the sale business. Would you like more details?',
  'Begin by typing your question or message in the chat prompt below to initiate a new conversation',
  'Under New York law, there is no explicit duty to disclose zoning and regulatory changes in the sale of a business, particulary if this business is a matter of public record.',
  'Under New York law, fraudulent concealment requires proof of: (1) failure to discharge a duty to disclose; (2) an intention to defraud, or scienter; (3) reliance; and (4) damages.',
];

const mockedKeywords = ['find', 'search', 'show'];

@Component({
  selector: 'saf-workspace-demo',
  imports: [FormsModule, LinkIconComponent, InPageNavigationComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './saf-workspace-pattern-demo.component.html',
  styleUrls: ['./saf-workspace-demo.component.scss'],
})
export class SafWorkspaceDemoComponent {
  inPageLinks: InPageNavigationLink[] = [
    { id: 'ai-workspace', label: 'AI Workspace' },
    { id: 'ai-workspace-processing', label: 'Processing' },
    { id: 'ai-workspace-with-empty-state', label: 'AI Workspace With Empty State' },
    { id: 'ai-workspace-skip-link', label: 'Skip Link' },
  ];

  chatData = [{ title: 'Getting started', id: 'chat-1', closeable: false }];
  workspaceData = [{ title: 'Workspace', id: 'ws-1' }];

  textMessage = 'Find documents for Mossimo Wals from 2022 to 2023';
  messages: IMessage[] = [];
  windows: IWindow[] = [];
  selectedWindow = 'tab-suggestions';
  showRegenerate = false;
  @ViewChildren('element', { read: ElementRef })
  public elements!: QueryList<ElementRef>;

  onAddChat = () => {
    this.chatData = [
      ...this.chatData,
      {
        title: 'Getting started',
        id: `chat-${Date.now()}`,
        closeable: true,
      },
    ];
  };

  onCloseChat = (e: any) => {
    this.chatData = this.chatData.filter((i: any) => i.id !== e.target.id);
  };

  onChangeTextMessage = (e: Event) => {
    this.textMessage = (<HTMLInputElement>e.target).value;
  };

  onSendMessage = () => {
    console.log('send message!');
    const tmpMessage = {
      name: 'Jane Doe',
      time: getTime(),
      text: this.textMessage.trim()
        ? this.textMessage.trim()
        : 'Hi. This is a new message',
    };
    this.messages.push(tmpMessage);
    this.textMessage = '';
    this.processMessage(tmpMessage);
  };

  processMessage = (tmpMessage: IMessage) => {
    // searching for keywords
    const hasKeywords = tmpMessage.text
      .toLowerCase()
      .trim()
      .split(' ')
      .some((word) => mockedKeywords.includes(word));

    if (!hasKeywords) {
      // pick a generic response
      this.showRegenerate = false;
      const tmpResponse = {
        name: 'Thomson Reuters',
        time: getTime(),
        text: mockedResponses[Math.floor(Math.random() * 4) + 1],
      };
      this.messages.push(tmpResponse);
      return;
    }

    // processing - creating new window
    const newId = `tab-results-${Math.floor(Math.random() * 1000)}`;
    const newWindow = {
      ...windowMocked,
      id: newId,
    };
    this.windows.push(newWindow as IWindow);

    const tmpWindows = this.windows.map((item) => {
      return {
        ...item,
        isLoading: false,
      };
    });

    setTimeout(() => {
      this.selectedWindow = newId;
      this.elements.last.nativeElement.click();
    }, 0);

    setTimeout(() => {
      this.windows = tmpWindows;
      this.showRegenerate = true;
    }, 2000);
  };
}

// chat-panel
@Component({
  selector: 'saf-workspace-chat-panel',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './saf-workspace-chat-panel.html',
  styleUrls: ['./saf-workspace-demo.component.scss'],
})
export class SafWorkspaceChatPanel {
  loading = false;

  handleSubmit = (e: any) => {
    e.preventDefault();
    this.loading = true;
    setTimeout(() => (this.loading = false), 2000);
  };
}

// workspace-panel
@Component({
  selector: 'saf-workspace-panel',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './saf-workspace-panel.html',
  styleUrls: ['./saf-workspace-demo.component.scss'],
})
export class SafWorkspacePanel {}
