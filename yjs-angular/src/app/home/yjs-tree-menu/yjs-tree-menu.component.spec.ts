import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YjsTreeMenuComponent } from './yjs-tree-menu.component';

describe('YjsTreeMenuComponent', () => {
  let component: YjsTreeMenuComponent;
  let fixture: ComponentFixture<YjsTreeMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YjsTreeMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YjsTreeMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
