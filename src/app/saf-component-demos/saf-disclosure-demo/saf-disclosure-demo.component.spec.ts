import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SafDisclosureDemoComponent } from './saf-disclosure-demo.component';


 describe("should load the disclosure Demo component ",function(){
  let fixture: ComponentFixture<SafDisclosureDemoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SafDisclosureDemoComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SafDisclosureDemoComponent);
    fixture.detectChanges();
   });

  it('Should create the Disclosure app', (() => {
    expect(SafDisclosureDemoComponent).toBeDefined();
  }));

  it('should check disclosure sub content', (() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#disclosure-content').textContent).toContain('Disclosure content');
  }));

});

