var mainDiv = document.getElementById("mainDiv");
var secondDiv = document.getElementById("secondDiv");
var buttonDiv = document.getElementById("buttonDiv");
var commissionOrder = new CommissionOrder();

function DrawMainMenu() {
    ClearChildren();

    DrawMainMenuButtons("Order Here", "btn-primary", DrawReadToS);
    DrawMainMenuButtons("Queue", "btn-secondary", DrawQueue);
    DrawMainMenuButtons("Terms of Service", "btn-danger", OpenToS);

    DrawMainMenuButtons("Feedback", "btn-warning", DrawFeedback);
}

DrawMainMenu();

function DrawReadToS() {
    ClearChildren();
    DrawMainMenuButtons("I've read the ToS and I agree", "btn-primary", DrawQualityMenu);
    DrawMainMenuButtons("Terms of Service", "btn-danger", OpenToS);

    DrawNoteForUser("Note: Read and Agree to Terms of Service before continuing");

    DrawBackButton(DrawMainMenu);
}

function DrawQualityMenu() {
    ClearChildren();
    DrawButtons(QualityButtons, QualitySelected, DrawQuantityMenu, DrawMainMenu, "Choose picture quality");
}

function DrawQuantityMenu() {
    ClearChildren();
    // If comic selected
    if (QualityButtons[QualitySelected.selectedItem].buttonText == "Comic") {

    }
    else {
        DrawButtons(QuantityButtons, QuantitySelected, DrawBackgroundMenu, DrawQualityMenu, "Choose amount of characters");
    }
}

function DrawBackgroundMenu() {
    ClearChildren();

    // If emoji or medallion commissions selected
    if (QualityButtons[QualitySelected.selectedItem].buttonText === "Emoji" || QualityButtons[QualitySelected.selectedItem].buttonText === "Medallion") {
        DrawSummaryMenu();
    }
    else {
        DrawButtons(BackgroundButtons, BackgroundSelected, DrawSummaryMenu, DrawQuantityMenu, "Choose background quality");
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

    DrawNoteForUser("Loading...");

    GetCommissionCountForId();

    // If there are no given username
    if (FinishedCommissionOrder.Username == null || FinishedCommissionOrder.Username == "") {
        alert("Please give a proper username");
        DrawAskFinalDetails();
    }
}

function DrawQueue() {
    ClearChildren();

    DrawNoteForUser("Loading...");

    DrawQueueScreen();

    DrawBackButton(DrawMainMenu);
}

function DrawFeedback() {
    ClearChildren();

    DrawBackButton(DrawMainMenu);

    DrawFeedbackScreen();
}