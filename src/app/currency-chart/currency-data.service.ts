import { Injectable } from '@angular/core';

@Injectable()
export class CurrencyDataService {

  constructor() { }

  multi: Array<any> = [
    {
      "name": "BTC",
      "series": [
        {
          "name": "09.12",
          "value": 8000
        },
        {
          "name": "10.12",
          "value": 14000
        },
        {
          "name": "11.12",
          "value": 15000
        },
        {
          "name": "12.12",
          "value": 10000
        }
      ]
    },  
  ];

}
