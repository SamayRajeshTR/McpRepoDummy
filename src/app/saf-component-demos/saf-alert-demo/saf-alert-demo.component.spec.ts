import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SafAlertDemoComponent } from './saf-alert-demo.component';

describe("Should load the Alert Demo component ",function(){

  let fixture: ComponentFixture<SafAlertDemoComponent>;

  beforeEach( () => {
    TestBed.configureTestingModule({
      imports: [SafAlertDemoComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SafAlertDemoComponent);
    fixture.detectChanges();
  })

  afterAll( () => {
    fixture.destroy()
  })


  it('Verify alert with primary attribute', async () => {
    const compiled = fixture.debugElement.nativeElement;
    await compiled.querySelector('#toast-alert-btn').click();

    const toastPrimaryAlert = compiled.querySelector("[data-testid='toast-primary']");
    expect(toastPrimaryAlert).toBeDefined();

	});


});
