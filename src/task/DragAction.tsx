import { put, takeEvery } from 'redux-saga/effects';

// import Helper
import { FileHelper } from '../helper/file.helper';

// import Reducer

// Root Saga登録配列
export const RootDragAction = [
    takeEvery('DragAction/DragStart'    , DragStart),
    takeEvery('DragAction/DragEnd'      , DragEnd),
    takeEvery('DragAction/DragEndImage' , DragEndImage),
    takeEvery('DragAction/DragEndCSV'   , DragEndCSV),
];


/**
 * テンプレートファイルのドラッグ開始
 * @param e HTMLMouseEvent
 */
export function* DragStart(e: any): any
{
    yield FileHelper.call().dragStart(e.target);
}

/**
 * テンプレートファイルドロップ処理
 * @param e HTMLMouseEvent
 */
export function* DragEnd(e: any): any
{
    yield FileHelper.call().dragEnd(e.event);
    const type = (FileHelper.call().getType() === 'svg') ? 'SVG' : 'Sheet';

    yield put({
        type                            : e.next,
        [FileHelper.call().getType()]   : FileHelper.call().getFile()
    });
}

/**
 * テンプレートファイルドロップ処理
 * @param e HTMLMouseEvent
 */
 export function* DragEndImage(e: any): any
 {
     yield FileHelper.call().dragEnd(e.event, 'image');
 
     yield put({
         type    : e.next,
         image   : FileHelper.call().getFile()
     });
 }

/**
 * テンプレートファイルドロップ処理
 * @param e HTMLMouseEvent
 */
export function* DragEndCSV(e: any): any
{
    yield FileHelper.call().dragEndCSV(e.event);
 
    yield put({
        type    : e.next,
        csv     : FileHelper.call().getFile()
    });
}


