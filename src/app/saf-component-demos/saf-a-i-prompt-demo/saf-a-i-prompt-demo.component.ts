import {
  AfterViewChecked,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinkIconComponent } from '../../link-icon/link-icon.component';
import { InPageNavigationComponent, InPageNavigationLink } from '../../layout/in-page-navigation/index';

interface UploadedFile {
  id: string;
  name: string;
}

interface FileError {
  reason: string;
  rejected: { name: string }[];
  maxFiles?: number;
  timestamp: number;
}

@Component({
  selector: 'saf-a-i-prompt-demo',
  imports: [LinkIconComponent, CommonModule, InPageNavigationComponent],
  templateUrl: './saf-a-i-prompt-demo.component.html',
  styles: [
    '.Component-demo{padding: 0;}.Component-demo saf-ai-prompt { display: block; margin-bottom: 16px; }',
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SafAIPromptDemoComponent implements AfterViewChecked {
  inPageLinks: InPageNavigationLink[] = [
    { id: 'ai-prompt-default', label: 'Default' },
    { id: 'ai-prompt-error-state', label: 'Error state with character count' },
    { id: 'ai-prompt-without-heading-label', label: 'Without heading label' },
    { id: 'ai-prompt-expands-up', label: 'Expands Up' },
    { id: 'ai-prompt-with-custom-options', label: 'With additional actions' },
    { id: 'ai-prompt-with-loading', label: 'With loading' },
    { id: 'ai-prompt-with-agent-menu', label: 'With inline mention' },
    { id: 'ai-prompt-with-file-upload', label: 'With file upload' },
  ];

  composerValue = '';
  sendedValue = '';
  composerMessage =
    'This example shows a full composer with action buttons for file uploads and voice input.';

  handleComposerChange(event: any) {
    this.composerValue = event.detail;
  }

  handleSend(event: any) {
    this.sendedValue = event.detail;
    // Reset after sending
    this.composerValue = '';
  }

  handleActionClick(action: string) {
    console.log(`${action} action clicked`);
    // Add your action logic here
  }

  /*----------------------- loading logic -------------------------*/
  processing = false;
  cancelled = false;

  timer?: ReturnType<typeof setTimeout>;

  onSend() {
    this.cancelled = false;
    this.processing = true;
    this.timer = setTimeout(() => {
      this.processing = false;
    }, 5000);
  }

  onStop() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.processing = false;
    this.cancelled = true;
  }

  /*----------------------- file upload logic -------------------------*/
  @ViewChild('uploadAlert') uploadAlert?: ElementRef;
  @ViewChild('uploadButtonRef') uploadButtonRef?: ElementRef;
  @ViewChild('chipGroupHeaderRef') chipGroupHeaderRef?: ElementRef;

  readonly VISIBLE_CHIPS_COUNT = 5;
  readonly maxFiles = 50;
  readonly maxFileSize = 1000000; // 1MB

  menuTriggers = {
    '@': 'agent-menu',
    '#': 'tag-menu',
    '/': 'command-menu',
  };

  uploadFiles: UploadedFile[] = [];
  fileErrors: FileError[] = [];
  liveAnnouncement = '';
  shouldFocusAlert = false;
  showAllChips = false;

  pendingFiles: UploadedFile[] | null = null;
  pendingErrors: FileError[] = [];
  decisionTimer?: ReturnType<typeof setTimeout>;

  get visibleFiles(): UploadedFile[] {
    return this.showAllChips
      ? this.uploadFiles
      : this.uploadFiles.slice(0, this.VISIBLE_CHIPS_COUNT);
  }

  get sendDisabled(): boolean | undefined {
    // Match React logic: false when files exist, undefined when no files
    return this.uploadFiles.length > 0 ? false : undefined;
  }

  ngAfterViewChecked() {
    if (
      this.shouldFocusAlert &&
      this.uploadAlert &&
      this.fileErrors.length > 0
    ) {
      requestAnimationFrame(() => {
        this.uploadAlert?.nativeElement?.focus();
      });
      this.shouldFocusAlert = false;
    }
  }

  generateErrorMessage(errors: FileError[]): any {
    if (errors.length === 0) return null;

    const tooManyError = errors.find((error) => error.reason === 'too-many');
    if (tooManyError) {
      const { rejected } = tooManyError;
      return `${this.maxFiles} file upload limit exceeded. ${rejected.length} of your files were not uploaded. Please review uploaded files.`;
    }

    const sizeFiles = errors
      .filter((e) => e.reason === 'size')
      .flatMap((e) => e.rejected);
    const typeFiles = errors
      .filter((e) => e.reason === 'type')
      .flatMap((e) => e.rejected);

    return { sizeFiles, typeFiles };
  }

  scheduleDecision() {
    if (this.decisionTimer) return;
    this.decisionTimer = setTimeout(() => {
      const newFiles = this.pendingFiles;
      const errors = this.pendingErrors;

      this.pendingFiles = null;
      this.pendingErrors = [];
      this.decisionTimer = undefined;

      const hasUploads = newFiles && newFiles.length > 0;
      const hasErrors = errors.length > 0;

      if (hasUploads && hasErrors) {
        this.shouldFocusAlert = true;
        setTimeout(() => {
          this.liveAnnouncement = `${this.uploadFiles.length} file${this.uploadFiles.length !== 1 ? 's' : ''} uploaded.`;
        }, 200);
      } else if (hasUploads) {
        this.liveAnnouncement = `${this.uploadFiles.length} file${this.uploadFiles.length !== 1 ? 's' : ''} uploaded.`;
        this.chipGroupHeaderRef?.nativeElement?.focus();
      } else if (hasErrors) {
        this.shouldFocusAlert = true;
      }
    }, 200);
  }

  handleFilesSelected(event: any) {
    this.liveAnnouncement = '';
    const newFiles = event.detail.files.map((file: any) => ({
      id: file.name,
      name: file.name,
    }));
    this.pendingFiles = newFiles;

    this.uploadFiles = [
      ...this.uploadFiles.filter(
        (f) => !newFiles.some((nf: UploadedFile) => nf.id === f.id),
      ),
      ...newFiles,
    ];
    this.scheduleDecision();
  }

  handleInvalidSelection(event: any) {
    const { reason, rejected } = event.detail;

    this.pendingErrors = [
      ...this.pendingErrors,
      { reason, rejected, maxFiles: this.maxFiles, timestamp: Date.now() },
    ];
    this.fileErrors = [
      ...this.fileErrors,
      { reason, rejected, maxFiles: this.maxFiles, timestamp: Date.now() },
    ];
    this.scheduleDecision();
  }

  handleUploadClick() {
    this.fileErrors = [];
    this.pendingErrors = [];
    this.pendingFiles = null;
    if (this.decisionTimer) {
      clearTimeout(this.decisionTimer);
      this.decisionTimer = undefined;
    }
  }

  handleAlertClose() {
    this.fileErrors = [];
    this.uploadButtonRef?.nativeElement?.focus();
  }

  removeFile(fileId: string) {
    this.uploadFiles = this.uploadFiles.filter((f) => f.id !== fileId);
    if (this.uploadFiles.length <= this.VISIBLE_CHIPS_COUNT) {
      this.showAllChips = false;
    }
    this.liveAnnouncement = `${this.uploadFiles.length} file${this.uploadFiles.length !== 1 ? 's' : ''} uploaded.`;
  }

  toggleShowAllChips() {
    this.showAllChips = !this.showAllChips;
  }

  handleFileUploadSend() {
    const fileCount = this.uploadFiles.length;
    this.uploadFiles = [];
    this.fileErrors = [];
    this.showAllChips = false;
    this.liveAnnouncement = `${fileCount} file${fileCount !== 1 ? 's' : ''} sent.`;
    setTimeout(() => (document.activeElement as HTMLElement)?.blur(), 0);
  }
}
