import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SafProgressDemoComponent } from './saf-progress-demo.component';

 describe("Should load the Progress Demo component  ",function(){
  let component: SafProgressDemoComponent;
  let fixture: ComponentFixture<SafProgressDemoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SafProgressDemoComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SafProgressDemoComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
  });

  afterEach( () => {
    fixture.destroy()
  })

  it('should check progressbar default value', () => {
    expect(component).toBeDefined();
    const element = fixture.debugElement.nativeElement.querySelector("[data-testid='progressbar']")
    element.value = 60;
    expect(element.value).toEqual(60);
  });

});

