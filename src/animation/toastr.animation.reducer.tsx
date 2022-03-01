import { createSlice } from '@reduxjs/toolkit';

export interface toastrAnimationPropsInterface {
    toastrAnimation?: toastrAnimationInterface,
    dispatch?: any
}

/**
 * 
 * toastrMode: 表示データの種別 背景色が変わる
 *  success : 成功
 *  info    : 情報
 *  warn    : 警告
 *  error   : 失敗
 */
export interface toastrAnimationInterface
{
    Loading: boolean,
    Text   : string,
    Mode   : string,
}

export const initialState = {
    Loading: false,
    Text   : '',
    Mode   : '',
}

const slice = createSlice({
    name: "toastrAnimation",
    initialState,
    reducers: {
        TOASTR_ANIMATION: (state: any = false, action: any) => {
            return Object.assign({}, state,
                {
                    Loading   : action.Loading,
                    Text      : action.Text,
                    Mode      : action.Mode,
                }
            )
        },
        RESET: (state: any = false, action: any) => {
            return initialState;
        }
    }
});

export default slice.reducer;
export const {
    TOASTR_ANIMATION,
    RESET,
} = slice.actions;


