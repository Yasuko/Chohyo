import { createSlice } from '@reduxjs/toolkit';

export interface PrintDataPropsInterface
{
    PrintData?: PrintDataInterface,
    dispatch?   : any;
}

export interface PrintDataInterface
{
    image   : string,
    paper   : string,
    width   : number,
    height  : number,
}

export const initialState: PrintDataInterface = {
    image     : '',
    paper     : 'A4',
    width     : 0,
    height    : 0,
}

const slice = createSlice({
    name: 'PrintData',
    initialState,
    reducers: {
        setPrintData: (state: any, action: any) => {
            return Object.assign({}, state,
                {
                    image   : action.image,
                    paper   : action.paper,
                    width   : ('width' in action) ? action.width : 0,
                    height  : ('height' in action) ? action.height : 0,
                }
            )
        },
        setImage: (state: any, action: any) => {
            return Object.assign({}, state,
                { image     : action.image, }
            )
        },
        setSize: (state: any, action: any) => {
            return Object.assign({}, state,
                { 
                    width     : action.width,
                    height    : action.height,
                }
            )
        },
        resetPrintData: (state: any, action: any) => {
            return initialState;
        }
    }
});

export default slice.reducer;
export const {
    setPrintData,
    setImage,
    setSize,
    resetPrintData,
} = slice.actions;