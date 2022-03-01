import { createSlice } from '@reduxjs/toolkit';
import { TextInterface, initialState as initialText } from '../_Text/_text.Interface';
import { LayoutImageInterface, layoutInitialState } from '../_Image/_Image.Interface';
export interface NewPrintPropsInterface
{
    NewPrint?   : NewPrintInterface,
    dispatch?   : any;
}

export interface NewPrintInterface
{
    svg?     : string,
    sheet?   : string,
    name     : string,
    paper    : string,
    width    : number,
    height   : number,
    contents?: string[],
    texts?   : TextInterface[],
    images?  : LayoutImageInterface[],
    memo?     : string,
    show?     : boolean,
}

export const initialState: NewPrintInterface = {
    svg     : '',
    name    : '',
    paper   : 'A4',
    width   : 210,
    height  : 297,
    texts   : [initialText],
    images  : [layoutInitialState],
    memo    : '',
    show    : false,
}

const slice = createSlice({
    name: 'NewPrint',
    initialState,
    reducers: {
        set: (state: any, action: any) => {
            return action.layout
        },
        setLayout: (state: any, action: any) => {
            return Object.assign({}, state,
                {
                    layout      : action.layout
                }
            );
        },
        updateText: (state: any, action: any) => {
            state.texts.map((val, key) => {
                if (key === action.key) {
                    state.texts[key]['text'] = action.text
                }
            });
            return state;
        },
        setShow: (state: any, action: any) => {
            return Object.assign({}, state,
                {
                    show      : action.show
                }
            );
        },
        reset: (state: any, action: any) => {
            return initialState;
        }
    }
});

export default slice.reducer;
