module Websites.WebComponents {
    @Vidyano.WebComponents.WebComponent.register({
        extends: "a",
        properties: {
            page: Object,
            href: {
                type: String,
                reflectToAttribute: true,
                computed: "_computeHref(page)"
            }
        },
        observers: [
            "_pageChanged(page, isAttached)"
        ],
        listeners: {
            "tap": "_tap"
        }
    })
    export class PageAnchor extends Vidyano.WebComponents.WebComponent {
        page: Vidyano.WebComponents.WebsitePageModel;

        private _pageChanged(page: Vidyano.WebComponents.WebsitePageModel, isAttached: boolean) {
            if (!isAttached)
                return;

            this.textContent = page.label;
        }

        private _computeHref(page: Vidyano.WebComponents.WebsitePageModel): string {
            return page != null ? `#${page.name}` : "#";
        }

        private _tap() {
            var panel = <any>this.findParent(p => (<HTMLElement>p).tagName === "PAPER-DRAWER-PANEL");
            if (panel != null)
                panel.closeDrawer();
        }
    }
}