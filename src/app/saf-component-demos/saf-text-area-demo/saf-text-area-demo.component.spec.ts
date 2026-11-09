import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SafTextAreaDemoComponent } from './saf-text-area-demo.component';

 describe("Should load the Text Area Demo component", () => {
  let component: SafTextAreaDemoComponent;
  let fixture: ComponentFixture<SafTextAreaDemoComponent>;

  beforeEach( () => {
    TestBed.configureTestingModule({
      imports: [SafTextAreaDemoComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SafTextAreaDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterAll( () => {
    fixture.destroy()
  });

  it('Should create the textarea app', (() => {
    expect(component).toBeDefined();
  }));

  it('should check textarea is disabled', () => {
    const textareaDisabled = fixture.debugElement.nativeElement.querySelector("[data-testid='textarea-disabled']");

    expect(textareaDisabled.disabled);
  });
});
