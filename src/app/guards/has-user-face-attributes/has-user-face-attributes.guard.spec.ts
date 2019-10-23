import { TestBed, async, inject } from '@angular/core/testing';

import { HasUserFaceAttributesGuard } from './has-user-face-attributes.guard';

xdescribe('HasUserFaceAttributesGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HasUserFaceAttributesGuard]
    });
  });

  it('should ...', inject([HasUserFaceAttributesGuard], (guard: HasUserFaceAttributesGuard) => {
    expect(guard).toBeTruthy();
  }));
});
