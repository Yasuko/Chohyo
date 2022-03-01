import { createSlice } from '@reduxjs/toolkit';
import { ListTextInterface, listInitial } from './_text.Interface';

export interface ListTextPropsInterface
{
    ListText?   : ListTextInterface,
    dispatch?   : any,
}

export const initialState: ListTextInterface = listInitial;

const slice = createSlice({
    name: 'ListText',
    initialState,
    reducers: {
        set: (state: any, action: any) => {
            state.texts = action.texts
            return state;
        },
        setSpot: (state: any, action: any) => {
            return Object.assign({}, state,
                { spot     : action.spot, }
            )
        },
        add: (state: any, action: any) => {
            state.texts = state.texts.concat([action.text]);
            return state;
        },
        update: (state: any, action: any) => {
            state.texts[action.text.key] = action.text;
            return state;
        },
        delete: (state: any, action: any) => {
            delete state.texts[action.key];
            return state;
        },
        reset: (state: any, action: any) => {
            return initialState;
        }
    }
});

export default slice.reducer;
