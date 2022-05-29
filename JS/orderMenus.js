var mainDiv = document.getElementById("mainDiv");
var secondDiv = document.getElementById("secondDiv");
var buttonDiv = document.getElementById("buttonDiv");
var commissionOrder = new CommissionOrder();

function DrawMainMenu() {
    ClearChildren();

    DrawMainMenuButtons("Order Here", "btn-primary", DrawReadToS);
    DrawMainMenuButtons("Queue", "btn-secondary", DrawQueue);
    DrawMainMenuButtons("Terms of Service", "btn-danger", OpenToS);

    DrawMainMenuButtons("Prices", "btn-success", DrawCommission);
    DrawMainMenuButtons("Feedback", "btn-warning", DrawFeedback);
}

// DrawMainMenu();
DrawBackButton(DrawMainMenu);

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
        DrawPriceInput();
        DrawBackButton(DrawQualityMenu);
        DrawNextButton(DrawAskFinalDetails);
    }
    else {
        DrawButtons(QuantityButtons, QuantitySelected, DrawBackgroundMenu, DrawQualityMenu, "Choose amount of characters");
    }
}

function DrawBackgroundMenu() {
    ClearChildren();

    // If emoji or Pride icon commissions selected
    if (QualityButtons[QualitySelected.selectedItem].buttonText === "Emoji" || QualityButtons[QualitySelected.selectedItem].buttonText === "Pride icon") {
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
    if (FinishedCommissionOrder.Price === 0 || FinishedCommissionOrder.Price == null) {
        alert("Price can't be 0");
        DrawQuantityMenu();
    }
    else {
        DrawFinalDetails();

        if (QualityButtons[QualitySelected.selectedItem].buttonText == "Comic") {
            // Initialize final commission class
            SummaryForCommissionComic();
            DrawBackButton(DrawQuantityMenu);
        }
        else{
            DrawBackButton(DrawSummaryMenu);
        }
        
        DrawNextButton(DrawFinishOrder);
    }
}

function DrawFinishOrder() {
    ClearChildren();

    // If there are no given username
    if (FinishedCommissionOrder.Username == null || FinishedCommissionOrder.Username == "") {
        alert("Please give a proper username");
        DrawAskFinalDetails();
    }
    else {
        DrawNoteForUser("Loading...");

        GetCommissionCountForId();
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

function DrawCommission() {
    ClearChildren();

    DrawBackButton(DrawMainMenu);

    DrawCommissionsScreen();
}