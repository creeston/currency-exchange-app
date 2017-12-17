import { ErrorHandler, Injectable} from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    constructor(public snackBar: MatSnackBar) {}

    handleError(error) {
        this.snackBar.open(JSON.stringify(error), "Close", {
            duration: 2000,
        });
    }
  
}