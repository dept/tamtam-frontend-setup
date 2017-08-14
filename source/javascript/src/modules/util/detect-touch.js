class DetectTouch {

    get isTouchDevice() {
        return this.touch;
    }

    constructor() {
        this.touch = 'ontouchstart' in document.documentElement
            || navigator.maxTouchPoints > 0
            || navigator.msMaxTouchPoints > 0;

        if (this.touch) {
            document.querySelector('html').classList.add( 'is-touch' );
        }
    }
}

export default new DetectTouch();
