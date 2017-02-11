/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ServerlessService } from './serverless.service';

describe('ServerlessService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServerlessService]
    });
  });

  it('should ...', inject([ServerlessService], (service: ServerlessService) => {
    expect(service).toBeTruthy();
  }));
});
