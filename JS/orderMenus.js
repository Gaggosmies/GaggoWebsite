var originalDiv = document.getElementById("mainDiv");
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
    if (QualitySelected.selectedItem === 0){
        DrawSummaryMenu();
    }
    else{
        DrawButtons(BackgroundButtons, BackgroundSelected, DrawSummaryMenu, DrawQuantityMenu);
    }
}

function DrawSummaryMenu() {
    ClearChildren();

    SummaryForCommission();

    var p = document.createElement("p");
    p.textContent = "Quality: " + QualityButtons[QualitySelected.selectedItem].buttonText + ", price: " + QualitySelected.price + " $\n";
    p.textContent += "Quantity: " + QuantityButtons[QuantitySelected.selectedItem].buttonText + ", price: " + QuantitySelected.price + " x\n";
    
    // If emoji commissions not selected
    if (QualitySelected.selectedItem != 0){
        p.textContent += "Background: " + BackgroundButtons[BackgroundSelected.selectedItem].buttonText + ", price: " + BackgroundSelected.price + " $\n";
    }

    if (DiscountPercentage != 0) {
        p.textContent += "Discount: " + DiscountPercentage + "%, Discounted: " + ((FinishedCommissionOrder.Price / ((100 - DiscountPercentage) / 100) * (DiscountPercentage / 100)) + " $\n");
    }
    console.log(FinishedCommissionOrder.Price);
    p.textContent += "Total: " + FinishedCommissionOrder.Price + " $\n";

    originalDiv.append(p);

    // If emoji commissions not selected
    if (QualitySelected.selectedItem != 0){
        DrawBackButton(DrawBackgroundMenu);
    }
    else {
        DrawBackButton(DrawQuantityMenu);
    }
}