const KEYBOARD_FOCUSED = 'has--keyboard-focus';

class DetectKeyboardFocus {

    constructor() {
        this.keyDown = false;

        document.addEventListener('keydown', () => this.handleKey(true), true);
        document.addEventListener('keyup', () => this.handleKey(false), true);
        document.addEventListener('mouseleave', () => this.handleKey(false));
        document.addEventListener('focus', () => this.handleFocus(), true);
        document.addEventListener('blur', () => DetectKeyboardFocus._handleBlur(), true);
    }

    handleKey(pressed) {
        this.keyDown = pressed;
    }

    handleFocus() {
        if (this.keyDown) document.body.classList.add(KEYBOARD_FOCUSED);
    }

    static handleBlur() {
        document.body.classList.remove(KEYBOARD_FOCUSED);
    }

}

export default new DetectKeyboardFocus();
