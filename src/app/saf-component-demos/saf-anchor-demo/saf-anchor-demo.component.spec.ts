import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SafAnchorDemoComponent } from './saf-anchor-demo.component';


 describe("Should load the Anchor Demo component ",function(){
  let component: SafAnchorDemoComponent;
  let fixture: ComponentFixture<SafAnchorDemoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SafAnchorDemoComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SafAnchorDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterAll( () => {
    fixture.destroy();
  });

  it('should create Anchor Component', () => {
    expect(component).toBeDefined();
  });

})


