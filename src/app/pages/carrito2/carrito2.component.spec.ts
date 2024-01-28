import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Carrito2Component } from './carrito2.component';

describe('Carrito2Component', () => {
  let component: Carrito2Component;
  let fixture: ComponentFixture<Carrito2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Carrito2Component]
    });
    fixture = TestBed.createComponent(Carrito2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
