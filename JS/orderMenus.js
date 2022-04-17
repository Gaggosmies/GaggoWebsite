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
    DrawButtons(QuantityButtons, QuantitySelected, DrawBackgroundMenu, DrawQualityMenu, "Choose amount of characters");
}

function DrawBackgroundMenu() {
    ClearChildren();

    // If emoji commissions selected
    if (QualitySelected.selectedItem === 0) {
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

    // sets out the id of the commission, not the best place for it but it should have enough time to register if it's here. 
    // If there are two of the same ids, it's because two users made their commissions at the same time and this one couldn't update on time.
    // It should be very unlikely though in real life.
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