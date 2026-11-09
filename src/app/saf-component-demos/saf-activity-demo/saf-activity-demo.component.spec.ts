import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SafActivityDemoComponent } from './saf-activity-demo.component';


 describe("Should load the Activity Demo component ",function(){
  let fixture: ComponentFixture<SafActivityDemoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SafActivityDemoComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SafActivityDemoComponent);
    fixture.detectChanges();
  });

  it('should check Activity title', (() => {
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('#activity').textContent).toContain('Activity');
  }));

  it('Should Check Activity Note Heading', () => {
    const debugElement = fixture.debugElement;
    const div = debugElement.query(By.css('#activity-note'));
    expect(div.nativeElement.innerText).toContain('Note');
  });

  it('Should Check Activity Icon Section', () => {
    const debugElement = fixture.debugElement;
    const div = debugElement.query(By.css('#activity-icon'));
    expect(div.nativeElement.innerText).toContain('Activity with icon');
  });

  it('Should Check Activity No Image Avatar Section', () => {
    const debugElement = fixture.debugElement;
    const div = debugElement.query(By.css('#activity-signed-in-no-image-avatar'));
    expect(div.nativeElement.innerText).toContain('Signed in no image avatar');
  });

  it('Should Check Activity With Image Avatar Section', () => {
    const debugElement = fixture.debugElement;
    const div = debugElement.query(By.css('#activity-signed-in-with-image-avatar'));
    expect(div.nativeElement.innerText).toContain('Signed in with image avatar');
  });

});

