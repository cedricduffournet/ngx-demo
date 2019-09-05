import {
  createSelector,
  createFeatureSelector,
  Action,
  combineReducers
} from '@ngrx/store';

import { User } from '@app/user/models/User';
import * as fromRoot from '@app/core/state/reducers';
import * as fromFileUpload from '@app/file-upload/state/reducers/file-upload.reducer';
import * as fromLoginView from '@app/authentication/state/reducers/login-view.reducer';
import * as fromRegisterView from '@app/authentication/state/reducers/register-view.reducer';

/* export interface FileUploadState {
  file: fromFileUpload.State;
} */

export interface State extends fromRoot.State {
  fileUpload: fromFileUpload.State;
}

export function reducers(state: State | undefined, action: Action) {
  return combineReducers({
    fileUpload: fromFileUpload.reducer
  })(state, action);
}

export const selectFileUploadState = createFeatureSelector<State>('fileUpload');

export const getFileUploadState = createSelector(
  selectFileUploadState,
  fileUpload => fileUpload.fileUpload
);

export const getFileUploadStatus = createSelector(
  getFileUploadState,
  fromFileUpload.getStatus
);

export const getFileUploadError = createSelector(
  getFileUploadState,
  fromFileUpload.getError
);

export const getFileUploadProgress = createSelector(
  getFileUploadState,
  fromFileUpload.getProgress
);

