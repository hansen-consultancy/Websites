module Websites.WebComponents {
    @Vidyano.WebComponents.WebComponent.register({
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
    export class ContactForm extends Vidyano.WebComponents.WebComponent {
        name: string;
        email: string;
        message: string;

        private _sendMessage() {
            this.app.service.getPersistentObject(null, "Websites.Contact").then(po => {
                po.getAttribute("Name").setValue(this.name); 
                po.getAttribute("Email").setValue(this.email);
                po.getAttribute("Message").setValue(this.message);

                po.save().then(() => {
                    this.app.showMessageDialog({
                        title: po.notificationType != Vidyano.NotificationType.OK ? Vidyano.NotificationType[po.notificationType] : null,
                        message: po.notification,
                        actions: ["OK"],
                        actionTypes: ["OK"]
                    });
                }, e => {
                    this.app.showMessageDialog({
                        title: Vidyano.NotificationType[Vidyano.NotificationType.Error],
                        message: po.notification,
                        actions: ["OK"],
                        actionTypes: ["Error"]
                    });
                });
            });
        }
    }
}