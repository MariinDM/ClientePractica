import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaRolviewComponent } from './tabla-rolview.component';

describe('TablaRolviewComponent', () => {
  let component: TablaRolviewComponent;
  let fixture: ComponentFixture<TablaRolviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaRolviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaRolviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
