const IS_TOUCH = 'is-touch';

class DetectTouch {

    get isTouchDevice() {
        return this.touch;
    }

    constructor() {
        this.hasMouse = false;
        this.mouseEvent = () => this._handleMouseEvent();
        this.touch = 'ontouchstart' in document.documentElement
            || navigator.maxTouchPoints > 0
            || navigator.msMaxTouchPoints > 0;


        document.documentElement.addEventListener('touchstart', () => {
            document.documentElement.removeEventListener('mousemove', this.mouseEvent);
        });

        document.documentElement.addEventListener('mousemove', this.mouseEvent);

        if (this.touch) {
            document.querySelector('html').classList.add(IS_TOUCH);
        }
    }

    _handleMouseEvent() {
        if(!this.hasMouse){
            document.querySelector('html').classList.remove(IS_TOUCH);
            this.hasMouse = true;
        }
    }
}

export default new DetectTouch();
