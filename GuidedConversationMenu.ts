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

        this.renderMenuStructure(menuTable, menuStructure);

        this.setActiveSection(menuStructure);

    }

    private renderMenuStructure(menuTable: HTMLTableElement, menuStructure: Array<ISection>) {

        var self = this;

        for (var i = 0; i < menuStructure.length; i++) {
            renderSection(menuStructure[i]);
        }

        function renderSection(section: ISection) {
            var menuSection: HTMLTableRowElement;
            var subSections: HTMLTableRowElement;

            menuSection = self.buildSectionElement(section);
            menuTable.appendChild(menuSection);

            if (section.subSections !== undefined) {
                subSections = renderSubSections(section.subSections);
                menuTable.appendChild(subSections);
            }
            

            function renderSubSections(sections: Array<ISection>): HTMLTableRowElement {                

                var subTable: HTMLTableElement = createSubTable();
                
                for (var i = 0; i < sections.length; i++) {

                    subTable.appendChild(self.buildSubSectionElement(sections[i]));

                    if (sections[i].subSections !== undefined) {
                        subTable.appendChild(renderSubSections(sections[i].subSections));
                    }
                }

                return wrapSubTable(subTable);

                function createSubTable(): HTMLTableElement {
                    var subTable: HTMLTableElement = document.createElement('table');
                    subTable.classList.add("menuSubTable");
                    return subTable
                }

                function wrapSubTable(subTable: HTMLTableElement): HTMLTableRowElement {
                    var subSections: HTMLTableRowElement = document.createElement('tr');
                    subSections.classList.add("menuRow");
                    subSections.setAttribute("subsectioncontainer", "true");

                    var subTableCell: HTMLTableDataCellElement = document.createElement('td');
                    subTableCell.colSpan = 4;
                    subTableCell.classList.add("menuSubTableContainer");

                    subSections.appendChild(document.createElement('td'));
                    subSections.appendChild(document.createElement('td'));
                    subTableCell.appendChild(subTable);
                    subSections.appendChild(subTableCell);
                    
                    return subSections;
                }

            }
        }

    }

    private buildSectionElement(section: ISection): HTMLTableRowElement {
        var sectionElement: HTMLTableRowElement = document.createElement('tr');

        sectionElement.classList.add("menuRow");
        sectionElement.id = section.action;

        // icon column
        sectionElement.appendChild(this.generateActiveColumn(section));

        // icon column
        sectionElement.appendChild(this.generateIconColumn(section));

        // title column
        sectionElement.appendChild(this.generateTitleColumn(section));

        if (!(section.subSections !== undefined)) {

            // description column
            sectionElement.appendChild(this.generatreDescColumn(section));

            // status column
            sectionElement.appendChild(this.generateStatusColumn(section));

            // button column
            sectionElement.appendChild(this.generateButtonColumn(section));

        } else {
            // colspan created an additional border for some reason...
            //sectionElement.appendChild(this.generatePlaceholderColumn(3));
            sectionElement.appendChild(document.createElement('td'));
            sectionElement.appendChild(document.createElement('td'));
            sectionElement.appendChild(document.createElement('td'));
            sectionElement.setAttribute("subsectionfollows", "true"); 
        }

        return sectionElement;

    }

    private buildSubSectionElement(section: ISection): HTMLTableRowElement {

        var subSectionElement: HTMLTableRowElement = document.createElement('tr');

        subSectionElement.classList.add("menuRow");

        //// icon column
        //subSectionElement.appendChild(this.generateIconColumn(section));

        // title column
        subSectionElement.appendChild(this.generateTitleColumn(section));

        if (!(section.subSections !== undefined)) {

            // description column
            subSectionElement.appendChild(this.generatreDescColumn(section));

            // status column
            subSectionElement.appendChild(this.generateStatusColumn(section));

            // button column
            subSectionElement.appendChild(this.generateButtonColumn(section));

        } else {

            // colspan created an additional border for some reason...
            //subSectionElement.appendChild(this.generatePlaceholderColumn(3));
            subSectionElement.appendChild(document.createElement('td'));
            subSectionElement.appendChild(document.createElement('td'));
            subSectionElement.appendChild(document.createElement('td'));
            subSectionElement.setAttribute("subsectionfollows", "true"); 
        }

        return subSectionElement;

    }

    //private generatePlaceholderColumn(colspan: number): HTMLTableDataCellElement {
    //    var placeholder: HTMLTableDataCellElement = document.createElement('td');
    //    placeholder.colSpan = colspan;
    //    return placeholder;
    //}

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

    private setActiveSection(menuStructure: Array<ISection>) {

        var activeSection: ISection;

        // take find required and make it

        for (var i = 0; i < menuStructure.length; i++) {
            if (findRequired([menuStructure[i]])) {
                activeSection = menuStructure[i];
                break;
            }
        }

        if (activeSection === undefined) {
            for (var i = 0; i < menuStructure.length; i++) {
                if (findNext([menuStructure[i]])) {
                    activeSection = menuStructure[i];
                    break;
                }
            }
        }

        if (activeSection === undefined) {
            activeSection = menuStructure[menuStructure.length - 1];
        }


        document.getElementById(activeSection.action).classList.add("active");

        function findRequired(sections: Array<ISection>): boolean {
            for (var i = 0; i < sections.length; i++) {
                if ((sections[i].required && (sections[i].buttonState === "btn_start") && !sections[i].subSections) ||
                    (sections[i].subSections && findRequired(sections[i].subSections)))
                    return true;
            }
            return false;
        }
        function findNext(sections: Array<ISection>): boolean {
            for (var i = 0; i < sections.length; i++) {
                if ((sections[i].buttonState === "btn_start" && !sections[i].subSections) ||
                    (sections[i].subSections && findNext(sections[i].subSections)))
                    return true;
            }
            return false;
        }
            

    }
}

window.onload = (): void => {
    const menu = new GuidedConversationMenu();
};
