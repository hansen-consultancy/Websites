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
        var PageSection = (function (_super) {
            __extends(PageSection, _super);
            function PageSection() {
                _super.apply(this, arguments);
            }
            PageSection.prototype._pageChanged = function (page, isAttached) {
                if (!isAttached || !page)
                    return;
                this.id = page.name;
                if (location.hash && location.hash.substr(1) === page.name) {
                    this.async(function () {
                        location.hash = "";
                        location.hash = "#" + page.name;
                    });
                }
            };
            PageSection = __decorate([
                Vidyano.WebComponents.WebComponent.register({
                    extends: "section",
                    properties: {
                        page: Object
                    },
                    observers: [
                        "_pageChanged(page, isAttached)"
                    ]
                })
            ], PageSection);
            return PageSection;
        }(Vidyano.WebComponents.WebComponent));
        WebComponents.PageSection = PageSection;
    })(WebComponents = Websites.WebComponents || (Websites.WebComponents = {}));
})(Websites || (Websites = {}));
