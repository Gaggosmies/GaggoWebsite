var originalDiv = document.getElementById("mainDiv");
var commissionOrder = new CommissionOrder();

function DrawMainMenu () {
    ClearChildren();

    var Buttons = [
        new ButtonClass("OrderBtn", "Order Here", "btn-primary"),
    ];

    DrawButtons(Buttons, originalDiv, DrawOrderMenu1, DrawMainMenu);
}

DrawMainMenu();

function DrawOrderMenu1 () {
    ClearChildren();

    var Buttons = [
        new ButtonClass("ShadedBtn",        "Flat"),
        new ButtonClass("ShadedBtn",        "Shaded"),
        new ButtonClass("HighlightedBtn",   "Shaded + Highlighted"),
    ];

    DrawButtons(Buttons, originalDiv, DrawOrderMenu2, DrawMainMenu);
}

function DrawOrderMenu2 () {
    ClearChildren();

    var Buttons = [
        new ButtonClass("OneBtn",       "One"),
        new ButtonClass("TwoBtn",       "Two"),
        new ButtonClass("ThreeBtn",     "Three"),
        new ButtonClass("FourBtn",      "Four"),
    ];

    DrawButtons(Buttons, originalDiv, DrawOrderMenu3, DrawOrderMenu1);
}

function DrawOrderMenu3 () {
    ClearChildren();

    var Buttons = [
        new ButtonClass("NoBGBtn",          "None"),
        new ButtonClass("EasyBgBtn",        "Easy"),
        new ButtonClass("ComplexBgBtn",     "Complex"),
    ];

    DrawButtons(Buttons, originalDiv, DrawOrderMenu4, DrawOrderMenu2);
}

function DrawOrderMenu4 () {
    ClearChildren();

    var p = document.createElement("p");
    p.textContent = "Success";
    originalDiv.append(p);
}