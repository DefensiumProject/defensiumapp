import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CredencialEditarPage } from './credencial-editar.page';

describe('CredencialEditarPage', () => {
  let component: CredencialEditarPage;
  let fixture: ComponentFixture<CredencialEditarPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CredencialEditarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
