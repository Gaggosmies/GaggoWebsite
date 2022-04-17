var mainDiv = document.getElementById("mainDiv");
var secondDiv = document.getElementById("secondDiv");
var buttonDiv = document.getElementById("buttonDiv");
var commissionOrder = new CommissionOrder();

function DrawMainMenu() {
    ClearChildren();

    var MainMenuButtons = [
        new MainMenuButtonClass("Order Here", DrawQualityMenu, "btn-outline-primary"),
    ];

    DrawMainMenuButtons(MainMenuButtons, DrawQualityMenu);
    DrawNextButton(DrawQualityMenu);
}

DrawMainMenu();

function DrawQualityMenu() {
    ClearChildren();
    DrawButtons(QualityButtons, QualitySelected, DrawQuantityMenu, DrawMainMenu);
}

function DrawQuantityMenu() {
    ClearChildren();
    DrawButtons(QuantityButtons, QuantitySelected, DrawBackgroundMenu, DrawQualityMenu);
}

function DrawBackgroundMenu() {
    ClearChildren();

    // If emoji commissions selected
    if (QualitySelected.selectedItem === 0) {
        DrawSummaryMenu();
    }
    else {
        DrawButtons(BackgroundButtons, BackgroundSelected, DrawSummaryMenu, DrawQuantityMenu);
    }
}

function DrawSummaryMenu() {
    ClearChildren();

    // fill finished order class
    SummaryForCommission();

    // draw the summary
    DrawSummary()
}

function DrawAskFinalDetails() {
    ClearChildren();
    DrawFinalDetails();

    DrawBackButton(DrawSummaryMenu);
    DrawNextButton(DrawFinishOrder);
}

function DrawFinishOrder() {
    ClearChildren();

    DrawFinish();
    DrawNoteForUserData();
    DrawBackButton(DrawAskFinalDetails);
    
    // If there are no given username
    if (FinishedCommissionOrder.Username == null || FinishedCommissionOrder.Username == "") {
        alert("Please give a proper username");
        DrawAskFinalDetails();
    }
}