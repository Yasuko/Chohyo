import { createSlice } from '@reduxjs/toolkit';

export interface ServerPropsInterface
{
    Server?: ServerInterface,
    dispatch?   : any;
}

export interface ServerInterface
{
    url     : string;
    method  : string;
    header  : string|object;
    body    : any;
    current : string;
    bearer? : string;
    csrf?   : string;
}

export const initialState: ServerInterface = {
    url     : 'https://pdf-maker.hoden.biz/',
    method  : 'GET',
    header  : [
        'Content-type: application/json',
        'Accept: application/json'
    ],
    current : '',
    bearer  : '',
    csrf    : '',
    body    : '',
}

const slice = createSlice({
    name: 'Server',
    initialState,
    reducers: {
        updateBearerToken: (state: any, action: any) => {
            return Object.assign({}, state,
                {
                    bearer     : action.bearer,
                }
            )
        },
        updateFormParam: (state: any, action: any) => {
            return Object.assign({}, state,
                {
                    url     : action.url,
                    method  : action.method,
                    header  : action.header,
                }
            )
        },
        updateURL: (state: any, action: any) => {
            return Object.assign({}, state,
                {
                    url     : action.url,
                }
            )
        },
        updateBody: (state: any, action: any) => {
            return Object.assign({}, state,
                {
                    body    : action.body,
                }
            )
        },
        updateCurrent: (state: any, action: any) => {
            return Object.assign({}, state,
                {
                    current    : action.current,
                }
            )
        },
        resetForm: (state: any, action: any) => {
            return Object.assign({}, state, initialState)
        }
    }
});

export default slice.reducer;
export const {
    updateBearerToken,
    updateFormParam,
    updateURL,
    updateBody,
    updateCurrent,
    resetForm,
} = slice.actions;