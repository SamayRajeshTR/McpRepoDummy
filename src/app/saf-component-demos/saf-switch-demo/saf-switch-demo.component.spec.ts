import {  ComponentFixture, TestBed } from '@angular/core/testing';
import { SafSwitchDemoComponent } from './saf-switch-demo.component';


 describe("Should load the Switch Demo component", function(){
  let fixture: ComponentFixture<SafSwitchDemoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SafSwitchDemoComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SafSwitchDemoComponent);
    fixture.detectChanges()
  });

  afterAll(() => fixture.destroy());

  it('should check switch disabled or not', () => {
    const switchbtn = fixture.debugElement.nativeElement.querySelector('#switch-disabled');
    expect(switchbtn.disabled);
  });

  it('should check switch checked attribute', () => {
    const switchbtn = fixture.debugElement.nativeElement.querySelector('#switch-checked');
    expect(switchbtn.checked);
  });

});
