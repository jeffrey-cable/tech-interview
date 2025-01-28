export const SampleMenu = {
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
