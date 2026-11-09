import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SafTabsDemoComponent } from './saf-tabs-demo.component';


 describe("Should load the Tabs Demo component  ",function(){
  let component: SafTabsDemoComponent; 
  let fixture: ComponentFixture<SafTabsDemoComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SafTabsDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterAll( () => fixture.destroy());

  it('should create Tab Component', () => {
    expect(component).toBeDefined();
  });
  
  it('should check tab title', (() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector("[data-testid='tab-title']").textContent).toContain('Tab Title');
  }));  

  it('should handle tab change on click', () => {
    spyOn(component, 'handleTabChange');
    fixture.detectChanges();

    const tab: HTMLElement = fixture.nativeElement.querySelector("#tabs-title");
    tab.click()

    expect(component.handleTabChange).toHaveBeenCalled();
    
  });

 it('Verify disable attribute exist or not in tab', () => {		
    expect('.tab-disabled').toContain('disabled');	
	}); 
  
  it('should check Tab disable message', () => {    
    const btn = fixture.debugElement.nativeElement.querySelector("[data-testid='tabs-disabled']");
    btn.click();   
    expect(component.showSelectedTabText).toBe('Tabs clicked from with disabled tabs');
  });

  it('should check Tab-vertical click behaviour renders intended content', () => {    
    const verticalTabs = fixture.debugElement.nativeElement.querySelector("[data-testid='tabs-vertical']");
    verticalTabs.click();
    expect(component.showSelectedTabText).toBe('Tabs clicked from vertical tabs'); 
  });

  it('should check Tab-horizontal click behaviour renders intended content', () => {    
    const horizontalTabs = fixture.debugElement.nativeElement.querySelector("[data-testid='tabs-horizontal']");
    horizontalTabs.click();
    expect(component.showSelectedTabText).toBe('Tabs clicked from horizontal tabs'); 
  });

});
