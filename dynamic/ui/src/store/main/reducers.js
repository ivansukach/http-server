import {NEXT_SLIDE} from "./actions";
import {PREVIOUS_SLIDE} from "./actions";
import {PAUSE_SLIDE_SHOW} from "./actions";
import {LOAD_SLIDE_SHOW} from "./actions";
import {CHANGE_SLIDE} from "./actions";

export const defaultSlideShowState = {
    slides: undefined,
    current: 0,
    amount: 0,
    status: true
};

export const mainReducer = (state = defaultSlideShowState, action) => {

    switch (action.type){
        case LOAD_SLIDE_SHOW:
            return {...state, amount: action.payload.length, slides: action.payload}
        case NEXT_SLIDE:
            return {...state, current: action.payload}
        case PREVIOUS_SLIDE:
            return {...state, current: action.payload}
        case PAUSE_SLIDE_SHOW:
            return { ...state, status: false};
        case CHANGE_SLIDE:
            return { ...state, current: action.payload};
        default:
    }
    return state;
};
