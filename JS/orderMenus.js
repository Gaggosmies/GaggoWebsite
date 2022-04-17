var mainDiv = document.getElementById("mainDiv");
var secondDiv = document.getElementById("secondDiv");
var buttonDiv = document.getElementById("buttonDiv");
var commissionOrder = new CommissionOrder();

function DrawMainMenu() {
    ClearChildren();

    DrawMainMenuButtons("Order Here", "btn-primary", DrawReadToS);
    DrawMainMenuButtons("Queue", "btn-secondary", DrawQueue);
    DrawMainMenuButtons("ToS", "btn-danger", OpenToS);

    DrawMainMenuButtons("Feedback", "btn-warning", DrawFeedback);
}

DrawMainMenu();

function DrawReadToS() {
    ClearChildren();
    DrawMainMenuButtons("I've read the ToS and I agree", "btn-primary", DrawQualityMenu);
    DrawMainMenuButtons("ToS", "btn-danger", OpenToS);

    DrawNoteForUser("Note: Read and Agree to Terms of Service before continuing");

    DrawBackButton(DrawMainMenu);
}

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
    DrawNoteForUser("Note: Username and picture details will be public in queue.");
    DrawBackButton(DrawAskFinalDetails);

    // If there are no given username
    if (FinishedCommissionOrder.Username == null || FinishedCommissionOrder.Username == "") {
        alert("Please give a proper username");
        DrawAskFinalDetails();
    }
}

function DrawQueue() {
    ClearChildren();

    DrawQueueScreen();

    DrawBackButton(DrawMainMenu);
}

function DrawFeedback() {
    ClearChildren();

    DrawFeedbackScreen();

    DrawBackButton(DrawMainMenu);
}