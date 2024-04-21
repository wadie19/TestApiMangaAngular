import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeMangasComponent } from './liste-mangas.component';

describe('ListeMangasComponent', () => {
  let component: ListeMangasComponent;
  let fixture: ComponentFixture<ListeMangasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeMangasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeMangasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
