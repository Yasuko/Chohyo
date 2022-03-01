import { createSlice } from '@reduxjs/toolkit';

export interface loadingAnimationPropsInterface {
    loadingAnimation?  : loadingAnimationInterface,
    dispatch?   : any,
}

export interface loadingAnimationInterface {
    isLoading   : boolean,
    message     : string,
}

export const initialState = {
    isLoading   : false,
    message     : 'Now Yomikonderunen....'
}

const slice = createSlice({
    name: "loadingAnimation",
    initialState,
    reducers: {
        LOADING_ANIMATION: (state: any = false, action: any) => {
            const ms = (action.message) ? action.message : initialState.message;
            return Object.assign({}, state,
                {
                    isLoading   : action.isLoading,
                    message     : ms,
                }
            )
        }
    }
});

export default slice.reducer;
export const {
    LOADING_ANIMATION
} = slice.actions;


