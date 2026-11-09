import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasswordGeneratorComponent } from './password-generator.component';

describe('PasswordGeneratorComponent', () => {
  let fixture: ComponentFixture<PasswordGeneratorComponent>;
  let component: PasswordGeneratorComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasswordGeneratorComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(PasswordGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('starts without a password and generates a hidden 20-character password on click', () => {
    expect(component.password).toBe('');
    fixture.nativeElement.querySelector('saf-button').click();
    fixture.detectChanges();
    const output: HTMLInputElement = fixture.nativeElement.querySelector('#generated-password');
    expect(output.value.length).toBe(20);
    expect(output.type).toBe('password');
    expect(output.readOnly).toBeTrue();
    expect(component.status).toBe('New password generated.');
  });

  it('shows and hides the generated password', () => {
    component.generate();
    fixture.detectChanges();
    const toggle: HTMLElement = fixture.nativeElement.querySelector('.actions saf-button');
    toggle.click();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('#generated-password').type).toBe('text');
    toggle.click();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('#generated-password').type).toBe('password');
  });

  it('reports invalid settings without leaving an old password available', () => {
    component.generate();
    component.length = 11;
    component.generate();
    fixture.detectChanges();
    expect(component.password).toBe('');
    expect(fixture.nativeElement.querySelector('[role="alert"]').textContent).toContain('12 and 128');
    component.length = 20;
    component.characterTypes.forEach(type => type.selected = false);
    component.generate();
    expect(component.error).toContain('Select at least one');
  });

  it('clears the previous password when settings change', async () => {
    component.generate();
    component.visible = true;
    const checkbox: HTMLInputElement = fixture.nativeElement.querySelector('input[type="checkbox"]');
    checkbox.click();
    await fixture.whenStable();
    expect(component.password).toBe('');
    expect(component.visible).toBeFalse();
  });

  it('copies only after an explicit request', async () => {
    const write = spyOn(navigator.clipboard, 'writeText').and.resolveTo();
    component.generate();
    expect(write).not.toHaveBeenCalled();
    await component.copy();
    expect(write).toHaveBeenCalledOnceWith(component.password);
    expect(component.status).toContain('Password copied');
  });

  it('handles clipboard rejection', async () => {
    spyOn(navigator.clipboard, 'writeText').and.rejectWith(new Error('Permission denied'));
    component.generate();
    await component.copy();
    expect(component.status).toContain('copy it manually');
  });

  it('ignores a pending copy result after clearing the password', async () => {
    let finishCopy!: () => void;
    spyOn(navigator.clipboard, 'writeText').and.returnValue(
      new Promise<void>(resolve => finishCopy = resolve),
    );
    component.generate();
    const copy = component.copy();
    component.clear();
    finishCopy();
    await copy;
    expect(component.password).toBe('');
    expect(component.status).toBe('');
  });

  it('clears the password, visibility, and feedback', () => {
    component.generate();
    component.visible = true;
    component.clear();
    expect(component.password).toBe('');
    expect(component.visible).toBeFalse();
    expect(component.status).toBe('');
    expect(component.error).toBe('');
  });
});
