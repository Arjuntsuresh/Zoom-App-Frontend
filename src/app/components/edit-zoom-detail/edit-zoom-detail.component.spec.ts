import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditZoomDetailComponent } from './edit-zoom-detail.component';

describe('EditZoomDetailComponent', () => {
  let component: EditZoomDetailComponent;
  let fixture: ComponentFixture<EditZoomDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditZoomDetailComponent]
    });
    fixture = TestBed.createComponent(EditZoomDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
