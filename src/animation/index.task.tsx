import { put } from 'redux-saga/effects';

export const AnimationTask = [
  loading_animation,
  toastr_animation,
];


export function* loading_animation(status: boolean) {
  yield put({
    type      : 'Animation/LOADING_ANIMATION',
    isLoading : status
  });
};

export function* toastr_animation(status: any) {
  yield put({
    type          : 'Toastr/TOASTR_ANIMATION',
    toastrLoading : status.toastrLoading,
    toastrText    : status.toastrText,
    toastrMode    : status.toastrMode,
  });
}