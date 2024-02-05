import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarSComponent } from './navbar-s.component';

describe('NavbarSComponent', () => {
  let component: NavbarSComponent;
  let fixture: ComponentFixture<NavbarSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarSComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
