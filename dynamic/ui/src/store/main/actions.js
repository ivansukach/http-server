export const NEXT_SLIDE = 'NEXT_SLIDE';
export const PREVIOUS_SLIDE = 'PREVIOUS_SLIDE';
export const PAUSE_SLIDE_SHOW = 'PAUSE_SLIDE_SHOW';
export const LOAD_SLIDE_SHOW = 'LOAD_SLIDE_SHOW';
export const CHANGE_SLIDE = 'LOAD_SLIDE_SHOW';


export const nextSlide = () => {
    const slides = store.getState.main.slides;
    let index = (store.getState.main.current + 1) % slides.length;
    return {
        type: NEXT_SLIDE,
        payload: index
    };
};

export const previousSlide = () => {
    const length = store.getState.main.slides.length;
    let index = (store.getState.main.current - 1 + length) % length;
    return {
        type: PREVIOUS_SLIDE,
        payload: index
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
    const length = store.getState.main.slides.length;
    let index = indexFromSaga % length;
    return {
        type: CHANGE_SLIDE,
        payload: index
    };
};


