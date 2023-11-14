import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FileManagerPageComponent } from './file-manager-page.component';

describe('FileManagerPageComponent', () => {
  let component: FileManagerPageComponent;
  let fixture: ComponentFixture<FileManagerPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FileManagerPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileManagerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
