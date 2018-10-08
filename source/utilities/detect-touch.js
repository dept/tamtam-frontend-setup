const IS_TOUCH = 'is-touch';
const WITH_MOUSE = `${IS_TOUCH}--with-mouse`;
const html = document.querySelector('html');

class DetectTouch {

    get isTouchDevice() {
        return this.touch;
    }

    constructor() {
        this.hasMouse = false;
        this.mouseEvent = () => this.handleMouseEvent();
        this.touch = 'ontouchstart' in document.documentElement
            || navigator.maxTouchPoints > 0
            || navigator.msMaxTouchPoints > 0;


        document.documentElement.addEventListener('touchstart', () => {
            document.documentElement.removeEventListener('mousemove', this.mouseEvent);
        });

        document.documentElement.addEventListener('mousemove', this.mouseEvent);

        if (this.touch) {
            html.classList.add(IS_TOUCH);
        }
    }

    handleMouseEvent() {
        if(!this.hasMouse && html.classList.contains(IS_TOUCH)){
            html.classList.add(WITH_MOUSE);
            this.hasMouse = true;
        }
    }
}

export default new DetectTouch();
