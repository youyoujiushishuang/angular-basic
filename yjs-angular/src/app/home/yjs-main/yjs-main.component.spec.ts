import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YjsMainComponent } from './yjs-main.component';

describe('YjsMainComponent', () => {
  let component: YjsMainComponent;
  let fixture: ComponentFixture<YjsMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YjsMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YjsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
