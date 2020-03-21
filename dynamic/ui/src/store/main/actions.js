import {store} from "../../App";
export const NEXT_SLIDE = 'NEXT_SLIDE';
export const PREVIOUS_SLIDE = 'PREVIOUS_SLIDE';
export const PAUSE_SLIDE_SHOW = 'PAUSE_SLIDE_SHOW';
export const LOAD_SLIDE_SHOW = 'LOAD_SLIDE_SHOW';
export const CHANGE_SLIDE = 'CHANGE_SLIDE';


export const nextSlide = () => {
    let slides = store.getState().main.slides;
    const current = store.getState().main.current;
    // slides[current].className = 'slide';
    const next = (current + 1) % slides.length;
    // slides[index].className = 'slide showing';
    return {
        type: NEXT_SLIDE,
        payload: {next: next, current: current}
    };
};

export const previousSlide = () => {
    const length = store.getState().main.slides.length;
    const current = store.getState().main.current;
    let next = (store.getState().main.current - 1 + length) % length;
    return {
        type: PREVIOUS_SLIDE,
        payload: {next: next, current: current}
    };
};

export const pauseSlideShow = () => {
    return {
        type: PAUSE_SLIDE_SHOW
    };
};
export const loadSlideShow = (slides) => {
    return {
        type: LOAD_SLIDE_SHOW,
        payload: slides
    };
};
export const changeSlide = (indexFromSaga) => {
    const length = store.getState().main.slides.length;
    const current = store.getState().main.current;
    let next = indexFromSaga % length;
    return {
        type: CHANGE_SLIDE,
        payload: {next: next, current: current}
    };
};


