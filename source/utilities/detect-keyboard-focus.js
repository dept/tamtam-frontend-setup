const KEYBOARD_FOCUSED = 'has--keyboard-focus';

class DetectKeyboardFocus {

    constructor() {
        this.keyDown = false;

        document.addEventListener('keydown', () => this._handleKey(true), true);
        document.addEventListener('keyup', () => this._handleKey(false), true);
        document.addEventListener('mouseleave', () => this._handleKey(false));
        document.addEventListener('focus', () => this._handleFocus(), true);
        document.addEventListener('blur', () => this._handleBlur(), true);
    }

    _handleKey(pressed) {
        this.keyDown = pressed;
    }

    _handleFocus() {
        if (this.keyDown) document.body.classList.add(KEYBOARD_FOCUSED);
    }

    _handleBlur() {
        document.body.classList.remove(KEYBOARD_FOCUSED);
    }

}

export default new DetectKeyboardFocus();
