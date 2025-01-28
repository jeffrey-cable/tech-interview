import { SampleMenu } from './SampleMenu';

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

    private buildMenu(menu: IMenu): void {

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
