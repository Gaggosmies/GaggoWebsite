// Functions used in drawing menus
function ClearChildren() {
    ClearMainChildern();
    ClearSecondChildern();
    ClearButtonChildern();
}

function ClearMainChildern() {
    var child = mainDiv.lastElementChild;
    while (child) {
        mainDiv.removeChild(child);
        child = mainDiv.lastElementChild;
    }
}

function ClearSecondChildern() {
    var child = mainDiv.lastElementChild;
    child = secondDiv.lastElementChild;
    while (child) {
        secondDiv.removeChild(child);
        child = secondDiv.lastElementChild;
    }
}

function ClearButtonChildern() {
    var child = mainDiv.lastElementChild;
    child = buttonDiv.lastElementChild;
    while (child) {
        buttonDiv.removeChild(child);
        child = buttonDiv.lastElementChild;
    }
}

function DrawMainMenuButtons(text, color, NextFunction) {
    var container = document.createElement("div");
    container.className = "grid-item";
    mainDiv.append(container);

    // add button details
    var button = document.createElement("button");

    button.className = color;
    button.id = text + "Btn";
    button.textContent = text;

    button.addEventListener(
        'click',
        function () {
            NextFunction();
        }
    );

    // Append button
    container.append(button);
}

// Give the array of buttons, SelectClass, and the next and old function
function DrawButtons(Buttons, Selection, NextFunction, OldFunction, description) {

    Buttons.forEach(function (ButtonClass, buttonIndex, buttonArray) {
        // add button details
        var container = document.createElement("div");
        container.className = "grid-item";
        mainDiv.append(container);
        var button = document.createElement("button");

        // Selected buttons will be highlighted
        if (Selection.selectedItem === buttonIndex) {
            button.className = "btn-primary";
        }
        else {
            button.className = "btn-outline-primary";
        }

        button.id = buttonArray[buttonIndex].buttonText + "Btn";
        button.textContent = buttonArray[buttonIndex].buttonText;

        button.addEventListener(
            'click',
            function () {
                Selection.selectedItem = buttonIndex;
                Selection.price = buttonArray[buttonIndex].price;
                NextFunction();
            }
        );

        // Show the added price in second div
        if (OldFunction === DrawQualityMenu) {
            button.addEventListener(
                'mouseenter',
                function () {
                    ClearSecondChildern();
                    DrawMenuDescription(description);
                    DrawNoteForPriceMultiply(buttonArray[buttonIndex].buttonText, buttonArray[buttonIndex].price);
                }
            );
        }
        else {
            button.addEventListener(
                'mouseenter',
                function () {
                    ClearSecondChildern();
                    DrawMenuDescription(description);
                    DrawNoteForPrice(buttonArray[buttonIndex].buttonText, buttonArray[buttonIndex].price);
                }
            );
        }

        // Append button
        container.append(button);

        // Draw back button and description only once
        if (buttonIndex === 0) {
            DrawMenuDescription(description);
            DrawBackButton(OldFunction);
        }

        // Draw next button if item has been selected
        if (Selection.selectedItem === buttonIndex) {
            DrawNextButton(NextFunction);
        }
    });
}

function DrawNextButton(NextFunction) {
    // Print Next button
    var containerDiv = document.createElement("div");
    buttonDiv.append(containerDiv);
    var nextButton = document.createElement("button");
    nextButton.textContent = "Next";
    nextButton.className = "btn-primary navigationButton";
    nextButton.addEventListener(
        'click',
        function () {
            NextFunction();
        }
    );

    containerDiv.append(nextButton);
}

function DrawBackButton(OldFunction) {
    // Print Back button
    var containerDiv = document.createElement("div");
    buttonDiv.append(containerDiv);
    var backButton = document.createElement("button");
    backButton.textContent = "Back";
    backButton.className = "btn-outline-primary navigationButton";
    backButton.addEventListener(
        'click',
        function () {
            OldFunction();
        }
    );

    containerDiv.append(backButton);
}

function SummaryForCommission() {
    const date = new Date();
    var dateNow = date.getFullYear().toString() + "/" + ('0' + (date.getMonth() + 1)).slice(-2).toString() + "/" + ('0' + date.getDate()).slice(-2).toString() + "-" + ('0' + date.getHours()).slice(-2).toString() + ':' + ('0' + date.getMinutes()).slice(-2).toString();

    FinishedCommissionOrder.Quality = QualityButtons[QualitySelected.selectedItem].buttonText;
    FinishedCommissionOrder.Quantity = QuantityButtons[QuantitySelected.selectedItem].buttonText;
    FinishedCommissionOrder.Date = dateNow;
    FinishedCommissionOrder.Price = (QualitySelected.price * QuantitySelected.price)

    // If medallion commissions selected
    if (QualityButtons[QualitySelected.selectedItem].buttonText === "Medallion") {
        FinishedCommissionOrder.Background = "Medallion";
    }
    // If emoji commissions selected
    else if (QualityButtons[QualitySelected.selectedItem].buttonText === "Emoji") {
        FinishedCommissionOrder.Background = "Emoji";
        // Fifth emoji is free
        if (QuantitySelected.selectedItem === 4) {
            FinishedCommissionOrder.Price -= QualitySelected.price;
        }
    }
    // If no special commission selected
    else {
        FinishedCommissionOrder.Background = BackgroundButtons[BackgroundSelected.selectedItem].buttonText;
        FinishedCommissionOrder.Price += BackgroundSelected.price;
    }

    if (DiscountPercentage != 0) {
        FinishedCommissionOrder.Price = FinishedCommissionOrder.Price * ((100 - DiscountPercentage) / 100);
        FinishedCommissionOrder.Note = "Discount: " + DiscountPercentage + "%";
    }

    // remove decimals
    FinishedCommissionOrder.Price = FinishedCommissionOrder.Price.toFixed(2)
}

function SummaryForCommissionComic() {
    const date = new Date();
    var dateNow = date.getFullYear().toString() + "/" + ('0' + (date.getMonth() + 1)).slice(-2).toString() + "/" + ('0' + date.getDate()).slice(-2).toString() + "-" + ('0' + date.getHours()).slice(-2).toString() + ':' + ('0' + date.getMinutes()).slice(-2).toString();

    FinishedCommissionOrder.Quality = QualityButtons[QualitySelected.selectedItem].buttonText;
    FinishedCommissionOrder.Quantity = "Comic";
    FinishedCommissionOrder.Background = "Comic";
    FinishedCommissionOrder.Date = dateNow;
    // Price gotten from input - can be normal text too
    FinishedCommissionOrder.Price = FinishedCommissionOrder.Price;

    if (DiscountPercentage != 0) {
        FinishedCommissionOrder.Note = "Discount: " + DiscountPercentage + "%";
    }
}

function DrawSummary() {
    DrawLineOfPrice("Quality", QualityButtons[QualitySelected.selectedItem].buttonText, QualitySelected.price);
    DrawLineOfPriceX("Quantity", QuantityButtons[QuantitySelected.selectedItem].buttonText, QuantitySelected.price);

    // If emoji or medallion commissions selected
    if (QualityButtons[QualitySelected.selectedItem].buttonText === "Medallion" || QualityButtons[QualitySelected.selectedItem].buttonText === "Emoji") {
        // Do nothing
    }
    else {
        DrawLineOfPrice("Background", BackgroundButtons[BackgroundSelected.selectedItem].buttonText, BackgroundSelected.price);
    }

    if (DiscountPercentage != 0) {
        DrawDiscountLine();
    }

    DrawTotalLine();

    // If emoji or medallion commissions selected
    if (QualityButtons[QualitySelected.selectedItem].buttonText === "Medallion" || QualityButtons[QualitySelected.selectedItem].buttonText === "Emoji") {
        DrawBackButton(DrawQuantityMenu);
    }
    else {
        DrawBackButton(DrawBackgroundMenu);
    }

    DrawNextButton(DrawAskFinalDetails);
}

function DrawLineOfPrice(text, description, price) {
    var p = document.createElement("p");
    p.textContent = text + ": " + description + ", price: " + price + "$";
    mainDiv.append(p);
}

function DrawLineOfPriceX(text, description, price) {
    var p = document.createElement("p");
    p.textContent = text + ": " + description + ", price: " + price + "x";
    mainDiv.append(p);
}

function DrawDiscountLine() {
    var p = document.createElement("p");
    p.style.color = "red";
    p.textContent += "Discount: " + DiscountPercentage + "%, Discounted: " + ((FinishedCommissionOrder.Price / ((100 - DiscountPercentage) / 100) * (DiscountPercentage / 100)).toFixed(2) + " $\n");
    secondDiv.append(p);
}

function DrawTotalLine() {
    var p = document.createElement("p");
    if (QualityButtons[QualitySelected.selectedItem].buttonText == "Comic") {
        p.textContent += "Budget: " + FinishedCommissionOrder.Price;
    }
    else {
        p.textContent += "Total: " + FinishedCommissionOrder.Price + "$";
    }

    mainDiv.append(p);
}

function DrawFinalDetails() {
    var userNameInput = document.createElement("textarea");
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

    secondDiv.append(userNameInput);

    var descriptionInput = document.createElement("textarea");
    descriptionInput.id = "DescriptionInputID";
    descriptionInput.className = "grid-item";
    descriptionInput.placeholder = "Description";

    // If there was something inputted already
    if (FinishedCommissionOrder.Description != null) {
        descriptionInput.value = FinishedCommissionOrder.Description;
    }


    descriptionInput.addEventListener(
        'change',
        function () {
            FinishedCommissionOrder.Description = descriptionInput.value;
        }
    );

    mainDiv.append(descriptionInput);
}

function DrawPriceInput() {
    var p = document.createElement("p");
    p.textContent += "Give budget for you comic";
    mainDiv.append(p);

    var budgetInput = document.createElement("input");
    budgetInput.id = "BudgetInputId";

    // If there was something inputted already
    if (FinishedCommissionOrder.Price != null) {
        budgetInput.value = FinishedCommissionOrder.Price;
    }

    budgetInput.addEventListener(
        'change',
        function () {
            FinishedCommissionOrder.Price = budgetInput.value;
        }
    );

    mainDiv.append(budgetInput);
}

function DrawFinish() {
    DrawTotalLine();

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

    mainDiv.append(orderButton);
}

function DrawNoteForUser(text) {
    var p = document.createElement("p");
    p.style.color = "red";
    p.textContent += text;
    secondDiv.append(p);
}

function DrawMenuDescription(text) {
    var p = document.createElement("p");
    p.textContent += text;
    secondDiv.append(p);
}

function DrawNoteForPrice(text, price) {
    var p = document.createElement("p");
    p.textContent += text + ": " + price;
    p.textContent += "$";
    secondDiv.append(p);
}

function DrawNoteForPriceMultiply(text, price) {
    var p = document.createElement("p");
    p.textContent += text + ": " + price;
    p.textContent += "x";
    secondDiv.append(p);
}

function DrawQueueScreen() {
    GetQueue();
}

function DrawQueueLines(queueObjects) {
    // Draw containers for queues
    var queueContainer = document.createElement("div");
    mainDiv.append(queueContainer);

    var acceptedText = document.createElement("h2");
    acceptedText.textContent = "Accepted commissions";
    queueContainer.append(acceptedText);

    var queueAccepted = document.createElement('div');
    queueAccepted.className = "grid-queue-item grid-queue-1";
    queueContainer.append(queueAccepted);

    var pendingText = document.createElement("h2");
    pendingText.textContent = "Pending commissions";
    queueContainer.append(pendingText);

    var queuePending = document.createElement('div');
    queuePending.className = "grid-queue-item grid-queue-2";
    queueContainer.append(queuePending);

    // Draw gotten queue elements
    queueObjects.forEach(function (CommissionOrder, CommissionIndex, CommissionArray) {
        var p = document.createElement("p");
        p.className = "grid-queue-p";
        p.textContent += CommissionArray[CommissionIndex].Username;
        p.textContent += ": "
        p.textContent += CommissionArray[CommissionIndex].Quality;
        p.textContent += " ";
        p.textContent += CommissionArray[CommissionIndex].CharacterQuantity;
        p.textContent += " character(s)";

        if (CommissionArray[CommissionIndex].Status === "Pending") {
            queuePending.append(p);
        }
        else if (CommissionArray[CommissionIndex].Status === "Expected") {
            DrawMenuDescription("Current expected commission wait time: " + CommissionArray[CommissionIndex].Username);
        }
        else {
            queueAccepted.append(p);
        }
    })
}

function DrawFeedbackScreen() {
    var p = document.createElement("p");
    p.textContent += "Give feedback for the website (If feedback is used, you might receive free Emojis! Include your username in feedback if you'd like)";
    secondDiv.append(p);

    var feedbackInput = document.createElement("textarea");
    feedbackInput.placeholder = "Feedback";

    mainDiv.append(feedbackInput);

    var feedbackButton = document.createElement("button");
    feedbackButton.textContent = "Send feedback";
    feedbackButton.className = "btn-danger navigationButton";
    feedbackButton.addEventListener(
        'click',
        function () {
            PostFeedback(feedbackInput.value)
            alert("Feedback Sent!");
            DrawMainMenu();
        }
    );

    buttonDiv.append(feedbackButton);
}

function OpenToS() {
    window.open(ToSLink);
}
