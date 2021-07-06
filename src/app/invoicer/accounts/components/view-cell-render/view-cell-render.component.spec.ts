import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCellRenderComponent } from './view-cell-render.component';

describe('ViewCellRenderComponent', () => {
  let component: ViewCellRenderComponent;
  let fixture: ComponentFixture<ViewCellRenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCellRenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCellRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
