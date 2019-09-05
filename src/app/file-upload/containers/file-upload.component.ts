import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromFileUpload from '@app/file-upload/state/reducers';
import { FileUploadActions } from '@app/file-upload/state/actions';
// import * as fromFileUploadSelectors from 'src/app/upload-file-store/selectors';
// import * as fromFileUploadState from 'src/app/upload-file-store/state';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html'/* ,
  styleUrls: ['./file-upload.component.css'] */
})
export class FileUploadComponent implements OnInit {
  completed$: Observable<boolean>;
  progress$: Observable<number | null>;
  error$: Observable<string | null>;
  isInProgress$: Observable<boolean>;
  isReady$: Observable<boolean>;
  hasFailed$: Observable<boolean>;

  constructor(private store: Store<fromFileUpload.State>) {}

  ngOnInit() {
    /*     this.completed$ = this.store.pipe(
      select(fromFileUploadSelectors.selectUploadFileCompleted)
    ); */

    this.progress$ = this.store.pipe(
      select(fromFileUpload.getFileUploadProgress)
    );

    this.error$ = this.store.pipe(select(fromFileUpload.getFileUploadError));

    /*     this.isInProgress$ = this.store$.pipe(
      select(fromFileUploadSelectors.selectUploadFileInProgress)
    );

    this.isReady$ = this.store$.pipe(
      select(fromFileUploadSelectors.selectUploadFileReady)
    );

    this.hasFailed$ = this.store$.pipe(
      select(fromFileUploadSelectors.selectUploadFileFailed)
    ); */
  }

  uploadFile(event: any) {
    const files: FileList = event.target.files;
    const file = files.item(0) as File;
    console.log(file);
    const sendFile = {
      ...file,
      name: file.name
    };

    console.log(sendFile);
    /*     const files: FileList = event.target.files;
    
 */


    this.store.dispatch(FileUploadActions.uploadRequest({file}));
/*       new fromFileUploadActions.UploadRequestAction({
        file
      })
    ); */

    // clear the input form
    event.srcElement.value = null;
  }

  resetUpload() {
    this.store.dispatch(FileUploadActions.uploadReset() );
    // this.store$.dispatch(new fromFileUploadActions.UploadResetAction());
  }

  cancelUpload() {
    this.store.dispatch(FileUploadActions.uploadCancel() );
    // this.store$.dispatch(new fromFileUploadActions.UploadCancelAction());
  }
}
