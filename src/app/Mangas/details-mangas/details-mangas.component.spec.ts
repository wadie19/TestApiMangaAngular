import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsMangasComponent } from './details-mangas.component';

describe('DetailsMangasComponent', () => {
  let component: DetailsMangasComponent;
  let fixture: ComponentFixture<DetailsMangasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsMangasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsMangasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
