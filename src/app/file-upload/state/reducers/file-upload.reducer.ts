import { createReducer, on } from '@ngrx/store';

import { FileUploadActions } from '@app/file-upload/state/actions';

export enum UploadStatus {
  Ready = 'Ready',
  Requested = 'Requested',
  Started = 'Started',
  Failed = 'Failed',
  Completed = 'Completed'
}

export interface State {
  status: UploadStatus;
  error: string | null;
  progress: number | null;
}

export const INITIAL_STATE: State = {
  status: UploadStatus.Ready,
  error: null,
  progress: null
};

export const reducer = createReducer(
  INITIAL_STATE,
  on(FileUploadActions.uploadRequest, state => ({
    ...state,
    status: UploadStatus.Requested,
    error: null,
    progress: null
  })),
  on(FileUploadActions.uploadCancel, FileUploadActions.uploadReset, state => ({
    ...state,
    status: UploadStatus.Ready,
    error: null,
    progress: null
  })),
  on(FileUploadActions.uploadFailure, (state, { error }) => ({
    ...state,
    status: UploadStatus.Failed,
    error,
    progress: null
  })),
  on(FileUploadActions.uploadStarted, state => ({
    ...state,
    status: UploadStatus.Started,
    error: null,
    progress: 0
  })),
  on(FileUploadActions.uploadProgress, (state, { progress }) => ({
    ...state,
    progress
  })),
  on(FileUploadActions.uploadComplete, state => ({
    ...state,
    status: UploadStatus.Completed,
    error: null,
    progress: 100
  }))
);

export const getStatus = (state: State) => state.status;
export const getError = (state: State) => state.error;
export const getProgress = (state: State) => state.progress;
/* export const getIds = (state: State) => state.ids;
export const getDeleting = (state: State) => state.deleting;
export const getDeleted = (state: State) => state.deleted;
export const getAdding = (state: State) => state.adding;
export const getAdded = (state: State) => state.added;
export const getLoading = (state: State) => state.loading;
export const getLoaded = (state: State) => state.loaded;
export const getConfig = (state: State) => state.config;
export const getTotalItems = (state: State) => state.totalItems; */
