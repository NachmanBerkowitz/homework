import { TestBed } from '@angular/core/testing';

import { BloggersService } from './bloggers.service';

describe('BloggersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BloggersService = TestBed.get(BloggersService);
    expect(service).toBeTruthy();
  });
});
