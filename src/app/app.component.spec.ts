import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
  });

  it('renders the password generator directly as the main application', () => {
    const main: HTMLElement = fixture.nativeElement.querySelector('main');
    expect(main.querySelector('h1')?.textContent).toBe('Secure password generator');
    expect(main.querySelector('app-password-generator')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('router-outlet')).toBeNull();
    expect(fixture.nativeElement.querySelector('saf-side-nav')).toBeNull();
  });

  it('can generate a password from the application entry point', () => {
    fixture.nativeElement.querySelector('saf-button').click();
    fixture.detectChanges();
    const output: HTMLInputElement = fixture.nativeElement.querySelector('#generated-password');
    expect(output.value.length).toBe(20);
    expect(output.type).toBe('password');
  });
});
