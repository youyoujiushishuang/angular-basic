import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YjsHeaderComponent } from './yjs-header.component';

describe('YjsHeaderComponent', () => {
  let component: YjsHeaderComponent;
  let fixture: ComponentFixture<YjsHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YjsHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YjsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
