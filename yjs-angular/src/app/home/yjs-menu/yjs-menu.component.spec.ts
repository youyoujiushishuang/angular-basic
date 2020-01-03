import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YjsMenuComponent } from './yjs-menu.component';

describe('YjsMenuComponent', () => {
  let component: YjsMenuComponent;
  let fixture: ComponentFixture<YjsMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YjsMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YjsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
