import { TestBed } from '@angular/core/testing';

import { Irrigation } from './irrigation';

describe('Irrigation', () => {
  let service: Irrigation;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Irrigation);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
