/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DragAndDropManagerService } from './drag-and-drop-manager.service';

describe('Service: DragAndDropManager', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DragAndDropManagerService]
    });
  });

  it('should ...', inject([DragAndDropManagerService], (service: DragAndDropManagerService) => {
    expect(service).toBeTruthy();
  }));
});
