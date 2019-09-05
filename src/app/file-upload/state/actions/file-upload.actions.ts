import { props, createAction } from '@ngrx/store';

export const uploadRequest = createAction(
  '[File upload] request',
  props<{ file: File }>()
);

export const uploadCancel = createAction('[File upload] cancel');

export const uploadReset = createAction('[File upload] reset');

export const uploadStarted = createAction('[File upload] started');

export const uploadProgress = createAction(
  '[File upload] progress',
  props<{ progress: number }>()
);

export const uploadFailure = createAction(
  '[File upload] failure',
  props<{ error: string }>()
);

export const uploadComplete = createAction('[File upload] complete');
