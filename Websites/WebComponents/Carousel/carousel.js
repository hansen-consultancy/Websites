var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Websites;
(function (Websites) {
    var WebComponents;
    (function (WebComponents) {
        var Carousel = (function (_super) {
            __extends(Carousel, _super);
            function Carousel() {
                _super.apply(this, arguments);
            }
            Carousel.prototype.attached = function () {
                var _this = this;
                _super.prototype.attached.call(this);
                this._domObserver = Polymer.dom(this).observeNodes(function (info) { return _this._computeImages(); });
            };
            Carousel.prototype.detached = function () {
                _super.prototype.detached.call(this);
                Polymer.dom(this).unobserveNodes(this._domObserver);
            };
            Carousel.prototype._updateInterval = function (isAttached, interval) {
                var _this = this;
                if (this._interval) {
                    clearInterval(this._interval);
                    this._interval = null;
                }
                if (!isAttached)
                    return;
                this._interval = setInterval(function () {
                    _this.selectedIndex = _this.selectedIndex + 1 < _this.images.length ? _this.selectedIndex + 1 : 0;
                }, interval);
            };
            Carousel.prototype._computeImages = function () {
                var imageChildren = this.getEffectiveChildren().filter(function (c) { return c.nodeName == "IMG"; });
                var imageWidth = 100 / imageChildren.length;
                this.$["inner"].style.width = 100 * imageChildren.length + "%";
                imageChildren.forEach(function (img) { return img.style.width = imageWidth + "%"; });
                var images = imageChildren.map(function (img, i) {
                    return {
                        index: i,
                        name: "image" + i
                    };
                });
                this._setImages(images);
            };
            Carousel.prototype._isSelected = function (image, selectedIndex) {
                return image && image.index === selectedIndex;
            };
            Carousel.prototype._select = function (e) {
                this._updateInterval(this.isAttached, this.interval);
                this.selectedIndex = e.model.image.index;
            };
            Carousel.prototype._selectedIndexChanged = function () {
                this.customStyle["--carousel-left-margin"] = this.selectedIndex * -100 + "%";
                this.updateStyles();
            };
            Carousel = __decorate([
                Vidyano.WebComponents.WebComponent.register({
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
            ], Carousel);
            return Carousel;
        }(Vidyano.WebComponents.WebComponent));
        WebComponents.Carousel = Carousel;
    })(WebComponents = Websites.WebComponents || (Websites.WebComponents = {}));
})(Websites || (Websites = {}));
