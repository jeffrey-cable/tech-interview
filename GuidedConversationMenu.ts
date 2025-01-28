const SampleMenu = {
    header: "Making a Latte",
    subHeader: "Learn about process of making a latte",
    heirarchy: {
        "GCM_ROOT_MENU": {
            keys: ["brewing", "steaming"]
        },
        "brewing" : {
            keys: ["weighing", "grinding", "extracting"]
        },
        "steaming" : {
            keys: ["purging", "aerating", "pouring"]
        }
    },
    sections: {
        "brewing": {
            icon: "icon1",
            title: "Brewing espresso",
            desc: "Dose and brew your espresso",
            status: "Not yet started",
            buttonText: "Start",
            buttonState: "btn_start",
            action: "brewing",
            required: false,
            requiredBlocking: false,
            active: true
        },
        "steaming": {
            icon: "icon2",
            title: "Steaming",
            desc: "Steam and pour the milk for your latte",
            status: "Not yet started",
            buttonText: "Start",
            buttonState: "btn_start",
            action: "steaming",
            required: false,
            requiredBlocking: false,
            active: false
        },
        "weighing": {
            icon: "icon3",
            title: "Weighing",
            desc: "Determine your preferred dose of coffee",
            status: "Not yet started",
            buttonText: "Start",
            buttonState: "btn_start",
            action: "weighing",
            required: true,
            requiredBlocking: false,
            active: false
        },
        "grinding": {
            icon: "icon4",
            title: "Grinding",
            desc: "Find the right grind",
            status: "Not yet started",
            buttonText: "Start",
            buttonState: "btn_start",
            action: "grinding",
            required: true,
            requiredBlocking: false,
            active: false
        },
        "extracting": {
            icon: "icon5",
            title: "Extracting",
            desc: "Maximize the flavor of your espresso",
            status: "Not yet started",
            buttonText: "Start",
            buttonState: "btn_start",
            action: "steaming",
            required: true,
            requiredBlocking: false,
            active: false
        },
        "purging": {
            icon: "icon6",
            title: "Purging",
            desc: "Prepare your steam wand",
            status: "Not yet started",
            buttonText: "Start",
            buttonState: "btn_start",
            action: "purging",
            required: true,
            requiredBlocking: false,
            active: false
        },
        "aerating": {
            icon: "icon2",
            title: "Aerating",
            desc: "Create the ideal micro-foam for your latte",
            status: "Not yet started",
            buttonText: "Start",
            buttonState: "btn_start",
            action: "aerating",
            required: true,
            requiredBlocking: false,
            active: false
        },
        "pouring": {
            icon: "icon2",
            title: "Pouring",
            desc: "Master the art, of latte art",
            status: "Not yet started",
            buttonText: "Start",
            buttonState: "btn_start",
            action: "pouring",
            required: true,
            requiredBlocking: false,
            active: false
        },
    }
};


interface ISection {
    icon: string;
    title: string;
    desc: string;
    status: string;
    buttonText: string;
    buttonState: string;
    action: string;
    required: boolean;
    requiredBlocking: boolean;
    active: boolean;
    subSections: Array<ISection>;
}

interface IMenu {
    header: string;
    subHeader: string;
    heirarchy: { [index: string]: { keys: Array<string> } };
    sections: { [index: string]: ISection };
}

class GuidedConversationMenu {
    private initialized: boolean;
    private requiredNotCompleted: boolean;

    public constructor() {
        this.initialized = false;
        
        this.receiveData(JSON.stringify(SampleMenu));
    }

    private receiveData(data: string): void {
        if (!this.initialized && data.length > 0) {
            try {
                const tempJson: IMenu = JSON.parse(data);
                this.requiredNotCompleted = false;
                this.buildMenu(tempJson);
                this.initialized = true;
            }
            catch (e) {
                alert(e);
            }
        }
    }

    private buttonClick(e: MouseEvent): void {
        var element: any = e.currentTarget;
        console.log(element.id);
    }

    private generateActiveColumn(section: ISection): HTMLTableDataCellElement {
        var activeIconColumn: HTMLTableDataCellElement = document.createElement('td');
        activeIconColumn.classList.add("activeIconColumn");

        var icon = document.createElement('i');
        icon.classList.add("menuActiveIcon");
        icon.innerHTML = "brightness_1";
        activeIconColumn.appendChild(icon);

        return activeIconColumn;
    }

    private generateIconColumn(section: ISection): HTMLTableDataCellElement {
        var iconColumn: HTMLTableDataCellElement = document.createElement('td');
        iconColumn.classList.add("iconColumn");

        var icon = document.createElement('i');
        icon.classList.add("menuIcon");
        icon.innerHTML = section.icon;
        iconColumn.appendChild(icon);

        return iconColumn;
    }

    private generateTitleColumn(section: ISection): HTMLTableDataCellElement {
        var titleColumn: HTMLTableDataCellElement = document.createElement('td');
        titleColumn.classList.add("titleColumn");

        var title = document.createElement('div');
        title.classList.add("menuTitle");
        title.innerHTML = section.title + (section.required ? "*" : "");
        titleColumn.appendChild(title);

        return titleColumn;
    }

    private generatreDescColumn(section: ISection): HTMLTableDataCellElement {
        var descColumn: HTMLTableDataCellElement = document.createElement('td');
        descColumn.classList.add("descColumn");

        var desc = document.createElement('div');
        desc.classList.add("menuDesc");
        desc.innerHTML = section.desc;
        descColumn.appendChild(desc);

        return descColumn;

    }

    private generateStatusColumn(section: ISection): HTMLTableDataCellElement {
        var statusColumn: HTMLTableDataCellElement = document.createElement('td');
        statusColumn.classList.add("statusColumn");

        var status = document.createElement('div');
        status.classList.add("menuStatus");
        status.innerHTML = section.status;
        statusColumn.appendChild(status);

        return statusColumn;
    }

    private generateButtonColumn(section: ISection): HTMLTableDataCellElement {
        var buttonColumn: HTMLTableDataCellElement = document.createElement('td');
        buttonColumn.classList.add("buttonColumn");

        var button = document.createElement('div');

        // required    : true
        // blocking    : true
        // notComplete : false
        // buttonState : btn_start



        if (this.requiredNotCompleted && section.requiredBlocking) {
            section.buttonState = "btn_disabled";
        }

        this.requiredNotCompleted = this.requiredNotCompleted || (section.required && (section.buttonState != "btn_edited"))

        switch (section.buttonState) {

            case "btn_start": {
                button.classList.add("menuButtonStart");
                button.addEventListener("click", this.buttonClick)
                break;
            }

            case "btn_edited": {
                button.classList.add("menuButtonEdited");
                button.addEventListener("click", this.buttonClick)
                break;
            }

            case "btn_disabled": {
                button.classList.add("menuButtonDisabled");
                break;
            }

            default: {
                button.classList.add("menuButtonDisabled");
                break;
            }

        }

        button.innerHTML = section.buttonText;
        button.id = section.action;

        buttonColumn.appendChild(button);

        return buttonColumn;
    }

    private buildMenu(menu: IMenu) {

        let menuStructure: Array<ISection>;

        const pageHeader: HTMLElement | null = document.getElementById('pageHeader');
        if (pageHeader) {
            pageHeader.innerHTML = menu.header;
        }

        if (menu.subHeader.length) {
            const pageSubHeader: HTMLDivElement = document.createElement('div');
            pageSubHeader.classList.add('pageSubHeader');
            pageSubHeader.innerHTML = menu.subHeader;
            pageHeader?.appendChild(pageSubHeader);
        }

        const menuTable: HTMLTableElement = document.getElementById('menuTable') as HTMLTableElement;

        menuStructure = this.buildMenuStructure(menu.heirarchy, menu.sections);

        // to do - render menu

    }

    private buildMenuStructure(heirarchy: { [index: string]: { keys: Array<string> } }, sections: { [index: string]: ISection }): Array<ISection> {

        const menuStructure: Array<ISection> = [];

        if (heirarchy["GCM_ROOT_MENU"] !== undefined) {
            for (let i = 0; i < heirarchy["GCM_ROOT_MENU"].keys.length; i++) {
                menuStructure.push(buildSectionItem(heirarchy["GCM_ROOT_MENU"].keys[i]));
            }
        }

        return menuStructure;

        function buildSectionItem(sectionKey: string): ISection {

            let sectionItem: ISection;
            const subSections: Array<ISection> = [];

            if (heirarchy[sectionKey] !== undefined) {
                for (let i = 0; i < heirarchy[sectionKey].keys.length; i++) {
                    subSections.push(buildSectionItem(heirarchy[sectionKey].keys[i]));
                }
            }
            else {
                return sections[sectionKey];
            }

            sectionItem = sections[sectionKey];
            sectionItem.subSections = subSections;

            return sectionItem;

        }
    }
}

window.onload = (): void => {
    const menu = new GuidedConversationMenu();
};
