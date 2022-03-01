import { put, select, takeEvery } from 'redux-saga/effects';

// import Helper
import { LayoutHelper }     from '../helper/layout.helper';
import { LayoutEditHelper } from '../helper/layout_edit.helper';
import { SpredsheetHelper } from '../helper/spredsheet.helper';

// import Reducer
import { PaperPropsInterface }          from '../reducers/Paper';
import { ListTextPropsInterface } from '../reducers/_Text/ListText';
import { initialState as initialLayout } from '../reducers/_Layout/_layout.interface';
import { ActiveLayoutPropsInterface }   from '../reducers/_Layout/ActiveLayout';
import { NewLayoutPropsInterface }      from '../reducers/_Layout/NewLayout';
import { LayoutImagePropsInterface } from '../reducers/_Image/LayoutImage';
import { ExcellLayoutPropsInterface }   from '../reducers/_Layout/ExcellLayout';



const paperParam    = (state: PaperPropsInterface)          => state.Paper;
const activeLayout  = (state: ActiveLayoutPropsInterface)   => state.ActiveLayout;
const layoutImage   = (state: LayoutImagePropsInterface)    => state.LayoutImage;
const listText      = (state: ListTextPropsInterface)       => state.ListText;
const newLayout     = (state: NewLayoutPropsInterface)      => state.NewLayout;
const excellLayout  = (state: ExcellLayoutPropsInterface)   => state.ExcellLayout;

// Root Saga登録配列
export const RootLayoutAction = [
    takeEvery('LayoutAction/save', Save),
    takeEvery('LayoutAction/changeTemplate' , changeTemplate),
    takeEvery('LayoutAction/changePaperSpec', changePaperSpec),
    takeEvery('LayoutAction/exchangeCSVText', exchangeCSVText),
    takeEvery('LayoutAction/changeExcellTemplate', changeExcellTemplate),
    takeEvery('LayoutAction/atachCSV'       , atachCSV),
];

/**
 * 背景イメージの変更
 * @param val {
 *     template: TemplateInterface
 * }
 */
export function* changeTemplate(val: any): any
{
    console.log('change use Template');

    // 背景テンプレートデータをレイアウト編集用Reducerに渡す
    yield put({
        type        : 'ActiveLayout/setTemplate',
        svg         : val.svg,
        id          : 0,
    });

    yield changePaperSpec(val);
}

/**
 * 
 * @param val 
 */
export function* changePaperSpec(val: any): any
{
    const al    = yield select(activeLayout);
    const _or   = (al.width > al.height) ? 'landscape' : 'portrait';
    const or    = (val.orientation === undefined) ? _or : val.orientation;

    // 用紙サイズ一覧を取得
    const paper = LayoutHelper.call()
                    .getPaperState(
                        yield select(paperParam),
                        (val.paper === undefined) ? al.paper : val.paper,
                        or
                    );
    console.log(paper);
    // 用紙サイズをレイアウト編集用Reducerに渡す
    yield put({
        type        : 'ActiveLayout/setPaper',
        paper       : paper.name,
        ...paper
    });
}

/**
 * 
 */
 export function* Save(): any
 {
     console.log('Save New Layout');
     const temp  = yield select(activeLayout);
     const texts = yield select(listText);
     const img   = yield select(layoutImage);
 
     const layout = Object.assign({}, initialLayout[0]);
     layout.template    = temp.temp_id;
     layout.paper       = temp.paper;
     layout.width       = temp.width;
     layout.height      = temp.height;
     layout.texts       = texts.texts;
     layout.images      = img;
     layout.svg         = temp.svg;
 
     yield put({
         type      : 'PrintAction/setup',
         layout    : layout
     });
     yield put({
        type      : 'PrintAction/print',
    });
 }

/**
 * 
 * @param val 
 */
export function* exchangeCSVText(val: any): any
{
    const texts = JSON.parse(JSON.stringify(yield select(listText)));

    if (texts.texts.length > 0) {
        const _texts = LayoutHelper.call().convTextData(texts.texts, val.csv);
        yield put({
            type    : 'ListText/set',
            texts   : _texts,
        });
    }
    // const layout = JSON.parse(JSON.stringify(yield select(activeLayout)));
    LayoutHelper.call().exchangeCSV(val.csv);

}


/**
 * 
 * Excell帳票
 * 
 * 
 * 
 */


/**
 * 背景イメージの変更(Excell)
 * @param val {
 *     template: TemplateInterface
 * }
 */
export function* changeExcellTemplate(val: any): any
{
    console.log('change use Excell Template');
  
    // 
    const contents = yield SpredsheetHelper
                        .call()
                        .getCellContents(val.sheet, '');
     
    // 用紙サイズをレイアウト編集用Reducerに渡す
    yield put({
        type        : 'ExcellLayout/setContents',
        contents    : contents,
    });
    yield put({
        type        : 'ExcellLayout/setSheet',
        sheet       : val.sheet,
    });
}

/**
 * エクセル帳票の変数をCSVから文字列に置き換え
 * @param val {csv: string, ...etc}
 * @return Promise<any>
 */
export function* atachCSV(val: any): any
{
    const layout = JSON.parse(JSON.stringify(yield select(excellLayout)));
    yield put({
        type    : 'ExcellLayout/setContents',
        contents: LayoutHelper.call().replaceCSV(layout.contents, val.csv)
    });
}


export function MoveStart(e: any): any
{
    LayoutEditHelper.call().moveOn(e);
}

export function* Move(e: any): any
{
    const leh = LayoutEditHelper.call();
    if (leh.checkFlag('resize')) {
        const w = leh.resizeCalc(e);
        yield put({
            type    : 'LayoutImage/update',
            image    : {
                ...e.editTarget,
                ...{
                    key : e.key,
                    width   : w,
                    height  : w * (e.width / e.height),
                }
            }
        });
    }
    if (leh.checkFlag('text')) {
        yield put({
            type    : 'ListText/update',
            text    : {
                ...e.editTarget,
                ...{
                    key : e.key,
                    x   : e.editTarget['x'] + leh.roundCalc(e.pageX, e.rate, 0),
                    y   : e.editTarget['y'] + leh.roundCalc(e.pageY, e.rate, 1)
                }
            }
        });
    }
    if (leh.checkFlag('image')) {
        yield put({
            type    : 'LayoutImage/update',
            image    : {
                ...e.editTarget,
                ...{
                    key : e.key,
                    x   : e.editTarget['x'] + leh.roundCalc(e.pageX, e.rate, 0),
                    y   : e.editTarget['y'] + leh.roundCalc(e.pageY, e.rate, 1)
                }
            }
        });
    }
    if (leh.checkFlag('screen')) {
        yield put({
            type    : 'ActiveLayout/setXY',
            x       : e.screenX - leh.roundCalc(e.pageX, e.rate, 0),
            y       : e.screenY - leh.roundCalc(e.pageY, e.rate, 1)
        });
    }
}

export function MoveEnd(e: any): any
{
    LayoutEditHelper.call().moveEnd(e);
}

