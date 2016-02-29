declare var Lightbox: {
    new ();
};

var _lightbox = new Lightbox();
_lightbox.load();

module Websites.WebComponents {
    @Vidyano.WebComponents.WebComponent.register({
        properties: {
            img: String,
            thumb: {
                type: String,
                value: ""
            },
            group: {
                type: String,
                value: ""
            }
        },
        observers: [
            "_update(img, thumb, group)"
        ],
        listeners: {
            "tap": "_tap"
        }
    })
    export class Lightbox extends Vidyano.WebComponents.WebComponent {
        img: string;
        group: string;

        private _update(img: string, thumb: string, group: string) {
            this.setAttribute("data-jslghtbx", img);
            this.setAttribute("data-jslghtbx-group", group);

            thumb = thumb || img;
            this.style.backgroundImage = `url(${thumb})`;

            _lightbox.thumbnails.push(this);
        }

        private _tap() {
            _lightbox.open(this, this.group);
        }
    }
}