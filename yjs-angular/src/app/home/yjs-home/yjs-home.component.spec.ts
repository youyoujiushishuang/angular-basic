import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YjsHomeComponent } from './yjs-home.component';

describe('YjsHomeComponent', () => {
  let component: YjsHomeComponent;
  let fixture: ComponentFixture<YjsHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YjsHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YjsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
