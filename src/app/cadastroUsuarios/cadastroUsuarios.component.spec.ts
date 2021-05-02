import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroUsuariosComponent } from './cadastroUsuarios.component';

describe('CadastroUsuariosComponent', () => {
  let component: CadastroUsuariosComponent;
  let fixture: ComponentFixture<CadastroUsuariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroUsuariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
