import { createSlice } from '@reduxjs/toolkit';
import {
    EditTemplateInterface, editInitial
} from './_template_interface';

export interface ListTemplatePropsInterface
{
    ListTemplate?: EditTemplateInterface[],
    dispatch?   : any;
}

export const initialState: EditTemplateInterface[] = [
    editInitial
]

const slice = createSlice({
    name: 'ListTemplate',
    initialState,
    reducers: {
        set: (state: any, action: any) => {
            return action.template
        },
        add: (state: any, action: any) => {
            return Object.assign({}, ...state, ...action)
        },
        up: (state: any, action: any) => {
            for (const key in state) {
                if (Object.prototype.hasOwnProperty.call(state, key)) {
                    if (state[key]['id'] === action['id']) {
                        state[key] = action;
                        return state;
                    }
                }
            }
        },
        del: (state: any, action: any) => {
            for (const key in state) {
                if (Object.prototype.hasOwnProperty.call(state, key)) {
                    if (state[key]['id'] === action['id']) {
                        delete state[key];
                        return state;
                    }
                }
            }
        },
        reset: (state: any, action: any) => {
            return initialState;
        }
    }
});

export default slice.reducer;
