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
    if (QualitySelected.selectedItem === 0) {
        DrawSummaryMenu();
    }
    else {
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
    if (QualitySelected.selectedItem != 0) {
        p.textContent += "Background: " + BackgroundButtons[BackgroundSelected.selectedItem].buttonText + ", price: " + BackgroundSelected.price + " $\n";
    }

    if (DiscountPercentage != 0) {
        p.textContent += "Discount: " + DiscountPercentage + "%, Discounted: " + ((FinishedCommissionOrder.Price / ((100 - DiscountPercentage) / 100) * (DiscountPercentage / 100)) + " $\n");
    }
    console.log(FinishedCommissionOrder.Price);
    p.textContent += "Total: " + FinishedCommissionOrder.Price + " $\n";

    originalDiv.append(p);

    // If emoji commissions not selected
    if (QualitySelected.selectedItem != 0) {
        DrawBackButton(DrawBackgroundMenu);
    }
    else {
        DrawBackButton(DrawQuantityMenu);
    }

    DrawNextButton(DrawAskFinalDetails);
}

function DrawAskFinalDetails() {
    ClearChildren();
    var userNameInput = document.createElement("input");
    userNameInput.id = "UserNameInputID";
    userNameInput.placeholder = "Username";

    // If there was something inputted already
    if (FinishedCommissionOrder.Username != null) {
        userNameInput.value = FinishedCommissionOrder.Username;
    }

    userNameInput.addEventListener(
        'change',
        function () {
            FinishedCommissionOrder.Username = userNameInput.value;
        }
    );

    originalDiv.append(userNameInput);

    var descriptionInput = document.createElement("input");
    descriptionInput.id = "DescriptionInputID";
    descriptionInput.placeholder = "Decription";

    // If there was something inputted already
    if (FinishedCommissionOrder.Description != null) {
        console.log(descriptionInput.value);
        descriptionInput.value = FinishedCommissionOrder.Description;
    }


    descriptionInput.addEventListener(
        'change',
        function () {
            FinishedCommissionOrder.Description = descriptionInput.value;
        }
    );

    originalDiv.append(descriptionInput);

    DrawBackButton(DrawSummaryMenu);
    DrawNextButton(DrawFinishOrder);
}

function DrawFinishOrder() {
    ClearChildren();

    DrawBackButton(DrawAskFinalDetails);

    var orderButton = document.createElement("button");
    orderButton.textContent = "Make Order";
    orderButton.className = "btn-danger";
    orderButton.addEventListener(
        'click',
        function () {
            PostFinishedOrder(FinishedCommissionOrder)
            alert("Order Sent!");
            QualitySelected = new SelectClass;
            QuantitySelected = new SelectClass;
            BackgroundSelected = new SelectClass;
            FinishedCommissionOrder = new CommissionOrder;
            DrawMainMenu();
        }
    );

    originalDiv.append(orderButton);

    console.log(FinishedCommissionOrder.Username);
    // If there are no given username
    if (FinishedCommissionOrder.Username == null) {
        alert("Please give a proper username");
        DrawAskFinalDetails();
    }
}