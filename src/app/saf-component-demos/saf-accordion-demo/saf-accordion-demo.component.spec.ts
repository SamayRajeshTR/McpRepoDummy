import { By } from '@angular/platform-browser';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { SafAccordionDemoComponent } from './saf-accordion-demo.component';


 describe("Should load the Accordion Demo component ",function(){
  let fixture: ComponentFixture<SafAccordionDemoComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SafAccordionDemoComponent);
    fixture.detectChanges();
  });

  it('should check accordion title', waitForAsync(() => {
      const fixture = TestBed.createComponent(SafAccordionDemoComponent);
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('#accordion-title').textContent).toContain('Accordion');
  }));


it('should have to check Multi-expand mode', () => {
  const fixture = TestBed.createComponent(SafAccordionDemoComponent);
  const debugElement = fixture.debugElement;
  fixture.detectChanges();
  const div = debugElement.query(By.css('#accordion-multi-expand-mode'));
  expect(div.nativeElement.innerText).toContain('Multi-expand mode');

});

it('Verify Single Expand Mode', () => {
  const fixture = TestBed.createComponent(SafAccordionDemoComponent);
  const debugElement = fixture.debugElement;
  fixture.detectChanges();
  const div = debugElement.query(By.css('#accordion-single-expand-mode'));
  expect(div.nativeElement.innerText).toContain('Single expand mode');
});

it('Verify Accordion sub items 1', () => {
  const fixture = TestBed.createComponent(SafAccordionDemoComponent);
  const debugElement = fixture.debugElement;
  fixture.detectChanges();
  const div = debugElement.query(By.css('#accordionSingleItem1'));
  expect(div.nativeElement.innerText).toContain('Accordion item 1 heading');
});

it('Verify Accordion sub items 2', () => {
  const fixture = TestBed.createComponent(SafAccordionDemoComponent);
  const debugElement = fixture.debugElement;
  fixture.detectChanges();
  const div = debugElement.query(By.css('#accordionSingleItem2'));
  expect(div.nativeElement.innerText).toContain('Accordion item 2 heading');
});

});

