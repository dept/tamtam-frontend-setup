class Tooltip {

    constructor( element ) {

        this.element = element;
        this.id = element.id;
        this.target = document.querySelector(`[aria-labelledby="${ this.id }"]`);

        this.bindEvents();

    }

    bindEvents() {

        this.target.addEventListener('mouseover', ( e ) => {

            const position = e.currentTarget.getBoundingClientRect();

            console.log( position.width );
            console.log( window.innerWidth - position.width );
        } );

    }

}

export default Tooltip;