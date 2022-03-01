import { createSlice } from '@reduxjs/toolkit';
import {
    EditImageInterface,
    editInitialState,
} from './_Image.Interface';


export interface ListImagePropsInterface
{
    ListImage?  : EditImageInterface,
    dispatch?   : any;
};

export const initialState: EditImageInterface[] = [editInitialState];

const slice = createSlice({
    name: 'ListImage',
    initialState,
    reducers: {
        set: (state: any, action: any) => {
            return action.images;
        },
        reset: (state: any, action: any) => {
            return initialState;
        }
    }
});

export default slice.reducer;
