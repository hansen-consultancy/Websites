module Websites.WebComponents {
    @Vidyano.WebComponents.WebComponent.register({
        properties: {
            interval: {
                type: Number,
                reflectToAttribute: true,
                value: 5000
            },
            images: {
                type: Array,
                readOnly: true
            },
            selectedIndex: {
                type: Number,
                value: 0,
                observer: "_selectedIndexChanged"
            }
        },
        observers: [
            "_updateInterval(isAttached, interval)"
        ]
    })
    export class Carousel extends Vidyano.WebComponents.WebComponent {
        private _domObserver: PolymerDomChangeObserver;
        private _interval: number;
        private images: CarouselImage[];
        interval: number;
        selectedIndex: number;

        private _setImages: (images: CarouselImage[]) => void;

        attached() {
            super.attached();

            this._domObserver = Polymer.dom(this).observeNodes(info => this._computeImages());
        }

        detached() {
            super.detached();

            Polymer.dom(this).unobserveNodes(this._domObserver);
        }

        private _updateInterval(isAttached: boolean, interval: number) {
            if (this._interval) {
                clearInterval(this._interval);
                this._interval = null;
            }

            if (!isAttached)
                return;

            this._interval = setInterval(() => {
                this.selectedIndex = this.selectedIndex + 1 < this.images.length ? this.selectedIndex + 1 : 0;
            }, interval);
        }

        private _computeImages() {
            const imageChildren = <HTMLImageElement[]>this.getEffectiveChildren().filter(c => c.nodeName == "IMG");

            const imageWidth = 100 / imageChildren.length;
            this.$["inner"].style.width = `${100 * imageChildren.length}%`;
            imageChildren.forEach(img => img.style.width = `${imageWidth}%`);

            const images = imageChildren.map((img, i) => {
                return {
                    index: i,
                    name: `image${i}`
                };
            });

            this._setImages(images);
        }

        private _isSelected(image: CarouselImage, selectedIndex: number): boolean {
            return image && image.index === selectedIndex;
        }

        private _select(e: TapEvent) {
            this._updateInterval(this.isAttached, this.interval);
            this.selectedIndex = e.model.image.index;
        }

        private _selectedIndexChanged() {
            this.customStyle["--carousel-left-margin"] = `${this.selectedIndex * -100}%`;
            this.updateStyles();
        }
    }

    interface CarouselImage {
        name: string;
        index: number;
    }
}