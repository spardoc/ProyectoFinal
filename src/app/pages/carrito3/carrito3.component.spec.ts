import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Carrito3Component } from './carrito3.component';

describe('Carrito3Component', () => {
  let component: Carrito3Component;
  let fixture: ComponentFixture<Carrito3Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Carrito3Component]
    });
    fixture = TestBed.createComponent(Carrito3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
