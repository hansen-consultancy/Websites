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
        var ContactForm = (function (_super) {
            __extends(ContactForm, _super);
            function ContactForm() {
                _super.apply(this, arguments);
            }
            ContactForm.prototype._sendMessage = function () {
                var _this = this;
                this.app.service.getPersistentObject(null, "Websites.Contact").then(function (po) {
                    po.getAttribute("Name").setValue(_this.name);
                    po.getAttribute("Email").setValue(_this.email);
                    po.getAttribute("Message").setValue(_this.message);
                    po.save().then(function () {
                        _this.app.showMessageDialog({
                            title: po.notificationType != Vidyano.NotificationType.OK ? Vidyano.NotificationType[po.notificationType] : null,
                            message: po.notification,
                            actions: ["OK"],
                            actionTypes: ["OK"]
                        });
                    }, function (e) {
                        _this.app.showMessageDialog({
                            title: Vidyano.NotificationType[Vidyano.NotificationType.Error],
                            message: po.notification,
                            actions: ["OK"],
                            actionTypes: ["Error"]
                        });
                    });
                });
            };
            ContactForm = __decorate([
                Vidyano.WebComponents.WebComponent.register({
                    properties: {
                        name: {
                            type: String,
                            notify: true
                        },
                        nameLabel: {
                            type: String,
                            value: "Name"
                        },
                        email: {
                            type: String,
                            notify: true
                        },
                        emailLabel: {
                            type: String,
                            value: "Email"
                        },
                        message: {
                            type: String,
                            notify: true
                        },
                        messageLabel: {
                            type: String,
                            value: "Message"
                        },
                        sendMessageLabel: {
                            type: String,
                            value: "Send Message"
                        }
                    }
                })
            ], ContactForm);
            return ContactForm;
        }(Vidyano.WebComponents.WebComponent));
        WebComponents.ContactForm = ContactForm;
    })(WebComponents = Websites.WebComponents || (Websites.WebComponents = {}));
})(Websites || (Websites = {}));
