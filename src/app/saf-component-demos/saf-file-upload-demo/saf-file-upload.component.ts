import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { LinkIconComponent } from '../../link-icon/link-icon.component';
import { InPageNavigationComponent, InPageNavigationLink } from '../../layout/in-page-navigation/index';


interface FileData {
	id: string;
	filename: string;
	status: 'uploading' | 'success' | 'error' | 'pending' | 'paused';
	progress: number;
	errorMessage?: string;
}

interface FileError {
	reason: string;
	rejected: File[];
	maxFiles?: number;
	timestamp: number;
}

interface FormError {
	fieldId: string;
	fieldLabel: string;
	message: string;
}

@Component({
  selector: 'saf-file-upload-demo',
  templateUrl: './saf-file-upload.component.html',
  styleUrls: ['./saf-file-upload.styles.scss'],
  imports: [NgIf, NgFor, LinkIconComponent, InPageNavigationComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export class SafFileUploadDemoComponent implements AfterViewInit, OnDestroy {
  inPageLinks: InPageNavigationLink[] = [
    { id: 'file-upload-default', label: 'File Upload' },
  ];


  @ViewChild('fileUploadElement', { static: false }) fileUploadElement!: ElementRef;
	@ViewChild('uploadAlert', { static: false }) uploadAlert!: ElementRef;
	@ViewChild('uploadButton', { static: false }) uploadButton!: ElementRef;
	@ViewChild('errorSummaryRef', { static: false }) errorSummaryRef!: ElementRef;
	@ViewChild('progressPanel', { static: false }) progressPanel!: ElementRef;
	@ViewChild('firstNameField', { static: false }) firstNameField!: ElementRef;
	@ViewChild('lastNameField', { static: false }) lastNameField!: ElementRef;
	@ViewChild('resetButton', { static: false }) resetButton!: ElementRef;

	selectedFiles: FileData[] = [];
	fileErrors: FileError[] = [];
	formErrors: FormError[] = [];
	isSubmitted: boolean = false;

	firstNameInvalid: boolean = false;
	firstNameValidationMessage: string = '';
	lastNameInvalid: boolean = false;
	lastNameValidationMessage: string = '';
	fileUploadInvalid: boolean = false;
	fileUploadValidationMessage: string = '';

	private uploadIntervals: Map<string, any> = new Map();
	private filesSelectedListener: (e: CustomEvent) => void = () => {};
	private invalidSelectionListener: (e: CustomEvent) => void = () => {};

	ngAfterViewInit() {
		this.filesSelectedListener = (e: CustomEvent) => {
			this.handleFileChange(e);
		};

		this.invalidSelectionListener = (e: CustomEvent) => {
			this.handleInvalidSelection(e);
		};

		this.fileUploadElement.nativeElement.addEventListener(
			'files-selected',
			this.filesSelectedListener
		);

		this.fileUploadElement.nativeElement.addEventListener(
			'invalid-selection',
			this.invalidSelectionListener
		);
	}

	ngOnDestroy() {
		if (this.fileUploadElement) {
			this.fileUploadElement.nativeElement.removeEventListener(
				'files-selected',
				this.filesSelectedListener
			);
			this.fileUploadElement.nativeElement.removeEventListener(
				'invalid-selection',
				this.invalidSelectionListener
			);
		}

		this.uploadIntervals.forEach((interval) => clearInterval(interval));
		this.uploadIntervals.clear();
	}

	handleFileChange(event: CustomEvent) {
		const files = Array.from(event.detail?.files || []) as File[];

		const fileData: FileData[] = files.map((file, index) => ({
			id: `file-${Date.now()}-${index}`,
			filename: file.name,
			status: 'uploading' as const,
			progress: 0,
		}));

		this.selectedFiles = [...this.selectedFiles, ...fileData];

		fileData.forEach((file) => {
			this.simulateFileUpload(file.id);
		});

		setTimeout(() => {
			if (this.fileErrors.length === 0) {
				this.progressPanel?.nativeElement?.focus();
			}
		}, 0);
	}

	handleInvalidSelection(event: CustomEvent) {
		const { reason, rejected } = event.detail;
		const maxFilesAttr = this.fileUploadElement?.nativeElement?.getAttribute('max-files');
		const maxFiles = maxFilesAttr ? Number(maxFilesAttr) : undefined;

		const newError: FileError = {
			reason,
			rejected,
			maxFiles,
			timestamp: Date.now(),
		};

		this.fileErrors = [...this.fileErrors, newError];

		setTimeout(() => {
			this.uploadAlert?.nativeElement?.focus();
		}, 0);
	}

	simulateFileUpload(fileId: string) {
		let currentProgress = 0;
		const errorChance = Math.random();
		const shouldError = errorChance < 0.17;
		const errorAtProgress = shouldError ? Math.floor(Math.random() * 60) + 20 : null;

		const interval = setInterval(() => {
			this.selectedFiles = this.selectedFiles.map((file) => {
				if (file.id !== fileId) return file;

				if (errorAtProgress && shouldError && currentProgress >= errorAtProgress && file.status === 'uploading') {
					clearInterval(this.uploadIntervals.get(fileId));
					this.uploadIntervals.delete(fileId);
					return {
						...file,
						status: 'error' as const,
						progress: currentProgress,
						errorMessage: 'Upload failed. Please try again.',
					};
				}

				if (currentProgress >= 100) {
					clearInterval(this.uploadIntervals.get(fileId));
					this.uploadIntervals.delete(fileId);
					return {
						...file,
						status: 'success' as const,
						progress: 100,
					};
				}

				return {
					...file,
					progress: currentProgress,
				};
			});

			currentProgress += Math.floor(Math.random() * 10) + 5;
		}, Math.random() * 200 + 150);

		this.uploadIntervals.set(fileId, interval);
	}

	handleOnRemove(event: CustomEvent) {
		const filenameToRemove = event.detail?.filename;
		const fileToRemove = this.selectedFiles.find((file) => file.filename === filenameToRemove);

		if (fileToRemove && this.uploadIntervals.has(fileToRemove.id)) {
			clearInterval(this.uploadIntervals.get(fileToRemove.id));
			this.uploadIntervals.delete(fileToRemove.id);
		}

		this.selectedFiles = this.selectedFiles.filter((file) => file.filename !== filenameToRemove);
	}

	handleUploadClick() {
		if (this.fileErrors.length > 0) {
			this.fileErrors = [];
		}
		if (this.fileUploadInvalid) {
			this.fileUploadInvalid = false;
			this.fileUploadValidationMessage = '';
		}
	}

	handleAlertClose() {
    this.fileErrors = [];
		setTimeout(() => {
      console.log('Focusing upload button after alert close');
			this.uploadButton?.nativeElement?.focus();
		}, 0);
	}

	getSubheading(): string {
		if (this.selectedFiles.length === 0) return '';

		const totalFiles = this.selectedFiles.length;
		const fileLabel = totalFiles === 1 ? 'file' : 'files';

		const statusCounts = {
			uploading: 0,
			success: 0,
			error: 0,
			pending: 0,
			paused: 0,
		};

		this.selectedFiles.forEach((file) => {
			const status = file.status;
			if (status && status in statusCounts) {
				statusCounts[status]++;
			}
		});

		const activeCount = statusCounts.uploading + statusCounts.pending + statusCounts.paused;

		if (activeCount > 0) {
			return `${totalFiles} ${fileLabel} uploading`;
		} else if (statusCounts.error > 0) {
			const errorLabel = statusCounts.error === 1 ? 'error' : 'errors';
			return `${totalFiles} ${fileLabel} added (${statusCounts.error} ${errorLabel})`;
		} else {
			return `${totalFiles} ${fileLabel} added`;
		}
	}

	getTotalRejectedFiles(): number {
		return this.fileErrors.reduce((count, error) => count + error.rejected.length, 0);
	}

	generateErrorMessage(errors: FileError[]): string {
		if (errors.length === 0) return '';

		const totalRejectedFiles = this.getTotalRejectedFiles();

		const tooManyError = errors.find((error) => error.reason === 'too-many');
		if (tooManyError) {
			const { maxFiles, rejected } = tooManyError;
			return `${maxFiles} file upload limit exceeded. ${rejected.length} of your files were not uploaded. Please review uploaded files.`;
		}

		const sizeErrors = errors.filter((error) => error.reason === 'size');
		const typeErrors = errors.filter((error) => error.reason === 'type');

		if (totalRejectedFiles === 1) {
			if (sizeErrors.length > 0) {
				const file = sizeErrors[0].rejected[0];
				return `${file.name} exceeds the file size limit. It was not uploaded.`;
			}
			if (typeErrors.length > 0) {
				const file = typeErrors[0].rejected[0];
				return `${file.name} uses the wrong file type. It was not uploaded.`;
			}
		}

		const messages: string[] = [];

		if (sizeErrors.length > 0) {
			const allSizeFiles = sizeErrors.flatMap((error) => error.rejected);
			const fileNames = allSizeFiles.map((file) => file.name).join(', ');
			const verb = allSizeFiles.length === 1 ? 'exceeds' : 'exceed';
			const pronoun = allSizeFiles.length === 1 ? 'It was' : 'They were';
			messages.push(`${fileNames} ${verb} the file size limit. ${pronoun} not uploaded.`);
		}

		if (typeErrors.length > 0) {
			const allTypeFiles = typeErrors.flatMap((error) => error.rejected);
			const fileNames = allTypeFiles.map((file) => file.name).join(', ');
			const verb = allTypeFiles.length === 1 ? 'uses' : 'use';
			const pronoun = allTypeFiles.length === 1 ? 'It was' : 'They were';
			messages.push(`${fileNames} ${verb} the wrong file type. ${pronoun} not uploaded.`);
		}

		return messages.join(' ');
	}

	getErrorMessages(): string[] {
		const messages: string[] = [];

		const tooManyError = this.fileErrors.find((error) => error.reason === 'too-many');
		if (tooManyError) {
			const { maxFiles, rejected } = tooManyError;
			messages.push(`${maxFiles} file upload limit exceeded. ${rejected.length} of your files were not uploaded. Please review uploaded files.`);
		}

		const sizeErrors = this.fileErrors.filter((error) => error.reason === 'size');
		const typeErrors = this.fileErrors.filter((error) => error.reason === 'type');

		if (sizeErrors.length > 0) {
			const allSizeFiles = sizeErrors.flatMap((error) => error.rejected);
			const fileNames = allSizeFiles.map((file) => file.name).join(', ');
			const verb = allSizeFiles.length === 1 ? 'exceeds' : 'exceed';
			const pronoun = allSizeFiles.length === 1 ? 'It was' : 'They were';
			messages.push(`${fileNames} ${verb} the file size limit. ${pronoun} not uploaded.`);
		}

		if (typeErrors.length > 0) {
			const allTypeFiles = typeErrors.flatMap((error) => error.rejected);
			const fileNames = allTypeFiles.map((file) => file.name).join(', ');
			const verb = allTypeFiles.length === 1 ? 'uses' : 'use';
			const pronoun = allTypeFiles.length === 1 ? 'It was' : 'They were';
			messages.push(`${fileNames} ${verb} the wrong file type. ${pronoun} not uploaded.`);
		}

		return messages;
	}

	validateForm(): FormError[] {
		const errors: FormError[] = [];
		const firstName = this.firstNameField?.nativeElement?.value || '';
		const lastName = this.lastNameField?.nativeElement?.value || '';

		if (!firstName || firstName.trim() === '') {
			this.firstNameInvalid = true;
			this.firstNameValidationMessage = 'Enter your first name.';
			errors.push({
				fieldId: 'firstName',
				fieldLabel: 'First Name',
				message: 'Enter your first name.',
			});
		} else {
			this.firstNameInvalid = false;
			this.firstNameValidationMessage = '';
		}

		if (!lastName || lastName.trim() === '') {
			this.lastNameInvalid = true;
			this.lastNameValidationMessage = 'Enter your last name.';
			errors.push({
				fieldId: 'lastName',
				fieldLabel: 'Last Name',
				message: 'Enter your last name.',
			});
		} else {
			this.lastNameInvalid = false;
			this.lastNameValidationMessage = '';
		}

		if (this.selectedFiles.length === 0) {
			this.fileUploadInvalid = true;
			this.fileUploadValidationMessage = 'Upload at least one file.';
			errors.push({
				fieldId: 'uploadButton',
				fieldLabel: 'Resume and Cover Letter',
				message: 'Upload at least one file.',
			});
		} else {
			this.fileUploadInvalid = false;
			this.fileUploadValidationMessage = '';
		}

		return errors;
	}

	handleSubmit(event: Event) {
		event.preventDefault();
		event.stopPropagation();

		const errors = this.validateForm();
		this.formErrors = errors;

		if (errors.length === 1) {
			setTimeout(() => {
				const fieldElement = document.getElementById(errors[0].fieldId);
				fieldElement?.focus();
			}, 100);
			return;
		} else if (errors.length > 1) {
			setTimeout(() => {
				this.errorSummaryRef?.nativeElement?.focus();
			}, 100);
			return;
		}

		this.isSubmitted = true;
		this.selectedFiles = [];
		this.fileErrors = [];
		this.formErrors = [];

		if (this.firstNameField?.nativeElement) {
			this.firstNameField.nativeElement.value = '';
		}
		if (this.lastNameField?.nativeElement) {
			this.lastNameField.nativeElement.value = '';
		}
	}

	clearAll() {
		this.uploadIntervals.forEach((interval) => clearInterval(interval));
		this.uploadIntervals.clear();
		this.selectedFiles = [];
		this.fileErrors = [];
		setTimeout(() => {
      console.log('Focusing upload button after clearAll');
			this.uploadButton?.nativeElement?.focus();
		}, 0);
	}

	handleReset() {
		this.uploadIntervals.forEach((interval) => clearInterval(interval));
		this.uploadIntervals.clear();
    this.progressPanel?.nativeElement?.remove();
    this.fileErrors = [];
		this.formErrors = [];
		this.isSubmitted = false;
		this.firstNameInvalid = false;
		this.firstNameValidationMessage = '';
		this.lastNameInvalid = false;
		this.lastNameValidationMessage = '';
		this.fileUploadInvalid = false;
		this.fileUploadValidationMessage = '';
    this.selectedFiles = [];
		if (this.firstNameField?.nativeElement) {
			this.firstNameField.nativeElement.value = '';
		}
		if (this.lastNameField?.nativeElement) {
			this.lastNameField.nativeElement.value = '';
		}

			this.resetButton?.nativeElement?.focus();

	}

	focusField(fieldId: string, event: Event) {
    console.log('focusField called for', fieldId, event);
		event.preventDefault();
		const element = document.getElementById(fieldId);
		element?.focus();
	}
}
