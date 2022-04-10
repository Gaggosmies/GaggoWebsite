var originalDiv = document.getElementById("mainDiv");

function DrawMainMenu () {
    var Buttons = [
        new ButtonClass("OrderBtn", "Order Here", "btn-primary"),
    ];

    DrawButtons(Buttons, originalDiv, DrawOrderMenu1);
}

DrawMainMenu();

function DrawOrderMenu1 () {
    ClearChildren();

    var Buttons = [
        new ButtonClass("ShadedBtn",        "Flat",                     "btn-primary"),
        new ButtonClass("ShadedBtn",        "Shaded",                   "btn-primary"),
        new ButtonClass("HighlightedBtn",   "Shaded + Highlighted",     "btn-primary"),
    ];

    DrawButtons(Buttons, originalDiv, DrawOrderMenu2);
}

function DrawOrderMenu2 () {
    ClearChildren();

    var Buttons = [
        new ButtonClass("OneBtn",       "One",      "btn-primary"),
        new ButtonClass("TwoBtn",       "Two",      "btn-primary"),
        new ButtonClass("ThreeBtn",     "Three",    "btn-primary"),
        new ButtonClass("FourBtn",      "Four",     "btn-primary"),
    ];

    DrawButtons(Buttons, originalDiv, DrawOrderMenu3);
}

function DrawOrderMenu3 () {
    ClearChildren();

    var Buttons = [
        new ButtonClass("NoBGBtn",          "None",     "btn-primary"),
        new ButtonClass("EasyBgBtn",        "Easy",     "btn-primary"),
        new ButtonClass("ComplexBgBtn",     "Complex",  "btn-primary"),
    ];

    DrawButtons(Buttons, originalDiv, DrawOrderMenu4);
}

function DrawOrderMenu4 () {
    ClearChildren();

    var p = document.createElement("P");
    p.textContent = "Success";
    originalDiv.append(p);
}