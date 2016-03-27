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
var _lightbox = new Lightbox();
_lightbox.load();
var Websites;
(function (Websites) {
    var WebComponents;
    (function (WebComponents) {
        var Lightbox = (function (_super) {
            __extends(Lightbox, _super);
            function Lightbox() {
                _super.apply(this, arguments);
            }
            Lightbox.prototype._update = function (img, thumb, group) {
                this.setAttribute("data-jslghtbx", img);
                this.setAttribute("data-jslghtbx-group", group);
                thumb = thumb || img;
                this.style.backgroundImage = "url(" + thumb + ")";
                _lightbox.thumbnails.push(this);
            };
            Lightbox.prototype._tap = function (e) {
                _lightbox.open(this, this.group);
                e.stopPropagation();
                e.preventDefault();
            };
            Lightbox = __decorate([
                Vidyano.WebComponents.WebComponent.register({
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
            ], Lightbox);
            return Lightbox;
        }(Vidyano.WebComponents.WebComponent));
        WebComponents.Lightbox = Lightbox;
        var LightboxImg = (function (_super) {
            __extends(LightboxImg, _super);
            function LightboxImg() {
                _super.apply(this, arguments);
            }
            LightboxImg.prototype._update = function (img, thumb, group) {
                this.setAttribute("data-jslghtbx", img);
                this.setAttribute("data-jslghtbx-group", group);
                this.style.cursor = "pointer";
                thumb = thumb || img;
                _lightbox.thumbnails.push(this);
            };
            LightboxImg.prototype._tap = function (e) {
                _lightbox.open(this, this.group);
                e.stopPropagation();
                e.preventDefault();
            };
            LightboxImg = __decorate([
                Vidyano.WebComponents.WebComponent.register({
                    extends: "img",
                    properties: {
                        img: {
                            type: String,
                            value: ""
                        },
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
            ], LightboxImg);
            return LightboxImg;
        }(Vidyano.WebComponents.WebComponent));
        WebComponents.LightboxImg = LightboxImg;
    })(WebComponents = Websites.WebComponents || (Websites.WebComponents = {}));
})(Websites || (Websites = {}));
