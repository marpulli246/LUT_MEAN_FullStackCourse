/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GetdataService } from './getdata.service';

describe('GetdataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetdataService]
    });
  });

  it('should ...', inject([GetdataService], (service: GetdataService) => {
    expect(service).toBeTruthy();
  }));
});
