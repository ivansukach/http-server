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
            return {...state, amount: action.payload.length, slides: action.payload};
        case NEXT_SLIDE:{
            let slides = state.slides;
            slides[action.payload.current].className='slide';
            slides[action.payload.next].className='slide showing';
            return {...state, current: action.payload.next, slides: slides, status: false};
        }

        case PREVIOUS_SLIDE:{
            let slides = state.slides;
            slides[action.payload.current].className='slide';
            slides[action.payload.next].className='slide showing';
            return {...state, current: action.payload.next, slides: slides, status: false};
        }

        case PAUSE_SLIDE_SHOW:
            return { ...state, status: false};
        case CHANGE_SLIDE: {
            let slides = state.slides;
            slides[action.payload.current].className = 'slide';
            slides[action.payload.next].className = 'slide showing';
            return {...state, current: action.payload.next, slides: slides};
        }
        default:
    }
    return state;
};
