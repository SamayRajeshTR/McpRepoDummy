import { By } from '@angular/platform-browser';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { SafMenuDemoComponent } from './saf-menu-demo.component';


 describe("Should load the Menu Demo component  ",function(){
  let fixture: ComponentFixture<SafMenuDemoComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SafMenuDemoComponent);
    fixture.detectChanges();
});

  it('should check Menu title', waitForAsync(() => {
    const fixture = TestBed.createComponent(SafMenuDemoComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#menu-title').textContent).toContain('Menu');
  }));

  it('Menu With checkbox items', () => {
    const fixture = TestBed.createComponent(SafMenuDemoComponent);
    const debugElement = fixture.debugElement;
    fixture.detectChanges();
    const div = debugElement.query(By.css('#menu-with-checkbox-items'));
    expect(div.nativeElement.innerText).toContain('With checkbox items');
  });

  it('Menu with aria-current items', () => {
    const fixture = TestBed.createComponent(SafMenuDemoComponent);
    fixture.componentInstance.selectedItem = '2.2';
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#menu-with-aria-current').textContent).toContain(
      'With aria-current',
    );

    expect(fixture.componentInstance.getTopLevelAriaCurrent('2')).toBe('true');
    expect(fixture.componentInstance.getChildAriaCurrent('2.2')).toBe('page');
    expect(fixture.componentInstance.getTopLevelAriaCurrent('1')).toBeNull();
    expect(fixture.componentInstance.getChildAriaCurrent('2')).toBeNull();

    const ariaCurrentHeading = compiled.querySelector('#menu-with-aria-current');
    const ariaCurrentSection = ariaCurrentHeading.closest('.Component-heading').nextElementSibling;

    const currentParent = ariaCurrentSection.querySelector('saf-menu-item[aria-current="true"]');
    const currentChild = ariaCurrentSection.querySelector('saf-menu-item[aria-current="page"]');

    expect(currentParent.textContent).toContain('Menu item 2');
    expect(currentChild.textContent).toContain('Menu item 2.2');
    expect(ariaCurrentSection.querySelectorAll('saf-menu-item[aria-current="page"]').length).toBe(1);
  });

  it('Menu with nested items', () => {
    const fixture = TestBed.createComponent(SafMenuDemoComponent);
    const debugElement = fixture.debugElement;
    fixture.detectChanges();
    const div = debugElement.query(By.css('#menu-with-nested-items'));
    expect(div.nativeElement.innerText).toContain('With nested items');
  });

  it('Menu with radio items', () => {
    const fixture = TestBed.createComponent(SafMenuDemoComponent);
    const debugElement = fixture.debugElement;
    fixture.detectChanges();
    const div = debugElement.query(By.css('#menu-with-radio-items'));
    expect(div.nativeElement.innerText).toContain('With radio items');
  });


  it('should have the menu open', async () => {
    const menu = fixture.nativeElement.parentNode.querySelector('.nested-menu');
    expect(menu).toBeTruthy();
  });
});

