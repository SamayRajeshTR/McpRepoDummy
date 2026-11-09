import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SafButtonDemoComponent } from './saf-button-demo.component';


 describe("Should load the Button Demo component ",function(){
  let component: SafButtonDemoComponent;
  let fixture: ComponentFixture<SafButtonDemoComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SafButtonDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
   });

   it('Verify button disabled attribute', () => {
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('saf-button').disabled).toBeFalsy();
   });

   it('should check component is created', () => {
    expect(component).toBeTruthy();
  });
});

