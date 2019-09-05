import { Injectable } from '@angular/core';
import { HttpEventType, HttpEvent } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import {
  switchMap,
  map,
  catchError,
  mergeMap,
  tap,
  concatMap,
  takeUntil
} from 'rxjs/operators';

import { Observable, of } from 'rxjs';

import { FileUploadService } from '@app/file-upload/services';
import { FileUploadActions } from '@app/file-upload/state/actions';

import { ToasterActions } from '@app/core/state/actions';

// import { CivilityService } from '@app/civility/services';
// import { CRUD_MODAL_CONFIG } from '@app/shared/models/modal-config';

@Injectable()
export class FileUploadEffects {
  public constructor(
    private actions$: Actions,
    private service: FileUploadService,
    private ts: TranslateService
  ) {}

  uploadRequestEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FileUploadActions.uploadRequest),
      concatMap(({ file }) => {
        console.log(file);
        return this.service.addImage(file).pipe(
          takeUntil(this.actions$.pipe(ofType(FileUploadActions.uploadCancel))),
          map(event => this.getActionFromHttpEvent(event)),
          catchError(error =>
            of(
              FileUploadActions.uploadFailure({error: 'toto'})
            )
          )
        );
      })
    )
  );

  private getActionFromHttpEvent(event: HttpEvent<any>) {
    
    switch (event.type) {
      case HttpEventType.Sent: {
        return FileUploadActions.uploadStarted();
      }
      case HttpEventType.UploadProgress: {
        let progress = 0;
        if (event.total) {
          progress = Math.round((100 * event.loaded) / event.total);
        }
        console.log(progress);
        return FileUploadActions.uploadProgress({
          progress
        });
      }
      case HttpEventType.ResponseHeader:
      case HttpEventType.Response: {
        if (event.status === 200) {
          return FileUploadActions.uploadComplete();
        } else {
          return FileUploadActions.uploadFailure({
            error: event.statusText
          });
        }
      }
      default: {
        return FileUploadActions.uploadFailure({
          error: `Unknown Event: ${JSON.stringify(event)}`
        });
      }
    }
  }
}
