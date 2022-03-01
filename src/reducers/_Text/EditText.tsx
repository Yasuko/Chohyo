import { createSlice } from '@reduxjs/toolkit';
import { TextInterface, initialState as orgInitial } from './_text.Interface';

export interface EditTextPropsInterface
{
    EditText?   : EditTextInterface,
    dispatch?   : any;
}

export interface EditTextInterface extends TextInterface
{
    key     : number,
    editend : boolean,
}

export const initialState: EditTextInterface[] = [{
    key     : 0,
    editend : false,
    ...orgInitial
}]

const slice = createSlice({
    name: 'EditText',
    initialState,
    reducers: {
        set: (state: any, action: any) => {
            return {...action.text, ...{key : action.key}}
        },
        setText: (state: any, action: any) => {
            return Object.assign({}, state,
                { text     : action.text, }
            )
        },
        setFont: (state: any, action: any) => {
            return Object.assign({}, state,
                { font     : action.font, }
            )
        },
        setSize: (state: any, action: any) => {
            return Object.assign({}, state,
                { size     : action.size, }
            )
        },
        setColor: (state: any, action: any) => {
            return Object.assign({}, state,
                { color    : action.color, }
            )
        },
        setX: (state: any, action: any) => {
            return Object.assign({}, state,
                { x     : action.x, }
            )
        },
        setY: (state: any, action: any) => {
            return Object.assign({}, state,
                { y     : action.y, }
            )
        },
        setEnd: (state: any, action: any) => {
            return Object.assign({}, state,
                { editend  : action.editend, }
            )
        },
        reset: (state: any, action: any) => {
            return initialState;
        }
    }
});

export default slice.reducer;
