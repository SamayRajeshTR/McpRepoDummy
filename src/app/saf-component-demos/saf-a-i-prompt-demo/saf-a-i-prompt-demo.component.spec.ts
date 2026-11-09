import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SafAIPromptDemoComponent } from './saf-a-i-prompt-demo.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

fdescribe('SafAIPromptDemoComponent', () => {
  let component: SafAIPromptDemoComponent;
  let fixture: ComponentFixture<SafAIPromptDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SafAIPromptDemoComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(SafAIPromptDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Basic Properties', () => {
    it('should initialize with empty composer value', () => {
      expect(component.composerValue).toBe('');
    });

    it('should initialize with empty sended value', () => {
      expect(component.sendedValue).toBe('');
    });

    it('should have composer message', () => {
      expect(component.composerMessage).toContain('full composer');
    });
  });

  describe('Composer Functionality', () => {
    it('should handle composer change', () => {
      const event = { detail: 'test value' };
      component.handleComposerChange(event);
      expect(component.composerValue).toBe('test value');
    });

    it('should handle send and reset composer value', () => {
      component.composerValue = 'test value';
      const event = { detail: 'sent value' };
      component.handleSend(event);
      expect(component.sendedValue).toBe('sent value');
      expect(component.composerValue).toBe('');
    });

    it('should handle action click', () => {
      spyOn(console, 'log');
      component.handleActionClick('Upload');
      expect(console.log).toHaveBeenCalledWith('Upload action clicked');
    });
  });

  describe('Loading State', () => {
    it('should initialize processing as false', () => {
      expect(component.processing).toBe(false);
    });

    it('should initialize cancelled as false', () => {
      expect(component.cancelled).toBe(false);
    });

    it('should set processing to true on send', () => {
      component.onSend();
      expect(component.processing).toBe(true);
      expect(component.cancelled).toBe(false);
    });

    it('should stop processing when onStop is called', () => {
      component.onSend();
      component.onStop();
      expect(component.processing).toBe(false);
      expect(component.cancelled).toBe(true);
    });

    it('should clear timer on stop', () => {
      component.onSend();
      expect(component.timer).toBeDefined();
      component.onStop();
      expect(component.processing).toBe(false);
    });
  });

  describe('File Upload Functionality', () => {
    it('should initialize with empty upload files', () => {
      expect(component.uploadFiles).toEqual([]);
    });

    it('should initialize with empty file errors', () => {
      expect(component.fileErrors).toEqual([]);
    });

    it('should have correct max files limit', () => {
      expect(component.maxFiles).toBe(50);
    });

    it('should have correct max file size limit', () => {
      expect(component.maxFileSize).toBe(1000000);
    });

    it('should have correct visible chips count', () => {
      expect(component.VISIBLE_CHIPS_COUNT).toBe(5);
    });

    it('should have menu triggers configured', () => {
      expect(component.menuTriggers).toEqual({
        '@': 'agent-menu',
        '#': 'tag-menu',
        '/': 'command-menu',
      });
    });

    it('should handle files selected', () => {
      const mockFiles = [
        { name: 'test1.pdf' },
        { name: 'test2.pdf' },
      ];
      const event = { detail: { files: mockFiles } };

      component.handleFilesSelected(event);

      expect(component.uploadFiles.length).toBe(2);
      expect(component.uploadFiles[0].name).toBe('test1.pdf');
      expect(component.uploadFiles[1].name).toBe('test2.pdf');
    });

    it('should handle invalid selection', () => {
      const event = {
        detail: {
          reason: 'size',
          rejected: [{ name: 'large-file.pdf' }],
        },
      };

      component.handleInvalidSelection(event);

      expect(component.fileErrors.length).toBe(1);
      expect(component.fileErrors[0].reason).toBe('size');
    });

    it('should clear errors on upload click', () => {
      component.fileErrors = [
        {
          reason: 'size',
          rejected: [{ name: 'test.pdf' }],
          timestamp: Date.now(),
        },
      ];

      component.handleUploadClick();

      expect(component.fileErrors).toEqual([]);
      expect(component.pendingErrors).toEqual([]);
    });

    it('should remove file by id', () => {
      component.uploadFiles = [
        { id: 'file1', name: 'test1.pdf' },
        { id: 'file2', name: 'test2.pdf' },
      ];

      component.removeFile('file1');

      expect(component.uploadFiles.length).toBe(1);
      expect(component.uploadFiles[0].id).toBe('file2');
    });

    it('should toggle show all chips', () => {
      expect(component.showAllChips).toBe(false);
      component.toggleShowAllChips();
      expect(component.showAllChips).toBe(true);
      component.toggleShowAllChips();
      expect(component.showAllChips).toBe(false);
    });

    it('should return visible files based on showAllChips', () => {
      component.uploadFiles = [
        { id: '1', name: 'file1.pdf' },
        { id: '2', name: 'file2.pdf' },
        { id: '3', name: 'file3.pdf' },
        { id: '4', name: 'file4.pdf' },
        { id: '5', name: 'file5.pdf' },
        { id: '6', name: 'file6.pdf' },
      ];

      component.showAllChips = false;
      expect(component.visibleFiles.length).toBe(5);

      component.showAllChips = true;
      expect(component.visibleFiles.length).toBe(6);
    });

    it('should handle file upload send', () => {
      component.uploadFiles = [{ id: '1', name: 'test.pdf' }];
      component.fileErrors = [
        {
          reason: 'size',
          rejected: [{ name: 'test.pdf' }],
          timestamp: Date.now(),
        },
      ];
      component.showAllChips = true;

      component.handleFileUploadSend();

      expect(component.uploadFiles).toEqual([]);
      expect(component.fileErrors).toEqual([]);
      expect(component.showAllChips).toBe(false);
    });

    it('should generate error message for too-many error', () => {
      const errors = [
        {
          reason: 'too-many',
          rejected: [{ name: 'file1.pdf' }, { name: 'file2.pdf' }],
          maxFiles: 50,
          timestamp: Date.now(),
        },
      ];

      const message = component.generateErrorMessage(errors);

      expect(message).toContain('50 file upload limit exceeded');
      expect(message).toContain('2 of your files were not uploaded');
    });

    it('should generate error message for size and type errors', () => {
      const errors = [
        {
          reason: 'size',
          rejected: [{ name: 'large.pdf' }],
          timestamp: Date.now(),
        },
        {
          reason: 'type',
          rejected: [{ name: 'file.exe' }],
          timestamp: Date.now(),
        },
      ];

      const message = component.generateErrorMessage(errors);

      expect(message.sizeFiles).toBeDefined();
      expect(message.typeFiles).toBeDefined();
      expect(message.sizeFiles.length).toBe(1);
      expect(message.typeFiles.length).toBe(1);
    });

    it('should return sendDisabled as undefined when no files', () => {
      component.uploadFiles = [];
      expect(component.sendDisabled).toBeUndefined();
    });

    it('should return sendDisabled as false when files exist', () => {
      component.uploadFiles = [{ id: '1', name: 'test.pdf' }];
      expect(component.sendDisabled).toBe(false);
    });
  });

  describe('Alert Handling', () => {
    it('should handle alert close', () => {
      component.fileErrors = [
        {
          reason: 'size',
          rejected: [{ name: 'test.pdf' }],
          timestamp: Date.now(),
        },
      ];

      component.handleAlertClose();

      expect(component.fileErrors).toEqual([]);
    });
  });
});
