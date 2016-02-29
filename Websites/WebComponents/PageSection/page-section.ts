module Websites.WebComponents {
    @Vidyano.WebComponents.WebComponent.register({
        extends: "section",
        properties: {
            page: Object
        },
        observers: [
            "_pageChanged(page, isAttached)"
        ]
    })
    export class PageSection extends Vidyano.WebComponents.WebComponent {
        page: Vidyano.WebComponents.WebsitePageModel;

        private _pageChanged(page: Vidyano.WebComponents.WebsitePageModel, isAttached: boolean) {
            if (!isAttached || !page)
                return;

            this.id = page.name;
            if (location.hash && location.hash.substr(1) === page.name) {
                this.async(() => {
                    location.hash = ``;
                    location.hash = `#${page.name}`;
                });
            }
        }
    }
}