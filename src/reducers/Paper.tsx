import { createSlice } from '@reduxjs/toolkit';

export interface PaperPropsInterface
{
    Paper?      : PaperInterface[],
    dispatch?   : any;
}

export interface PaperInterface
{
    name        : string
    width       : number,
    height      : number,
}

export const initialState: PaperInterface[] = [
    {
        name        : 'A3',
        width       : 297,
        height      : 420,
    },
    {
        name        : 'A4',
        width       : 210,
        height      : 297,
    },
    {
        name        : 'A5',
        width       : 148,
        height      : 210,
    },
    {
        name        : 'B4',
        width       : 257,
        height      : 364,
    },
    {
        name        : 'B5',
        width       : 182,
        height      : 257,
    }
]

const slice = createSlice({
    name: 'Paper',
    initialState,
    reducers: {
        set: (state: any, action: any) => {
            return action.paper;
        },
        add: (state: any, action: any) => {
            return {...state, ...action.paper};
        },
        reset: (state: any, action: any) => {
            return initialState;
        }
    }
});

export default slice.reducer;
export const {
    set, add, reset
} = slice.actions;