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

// Give the array of main menu elements
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

    // Append buttons
    container.append(button);
}

// Give the array of buttons, SelectClass, and the next function
function DrawButtons(Buttons, Selection, NextFunction, OldFunction) {

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

        if (OldFunction === DrawQualityMenu) {
            button.addEventListener(
                'mouseenter',
                function () {
                    ClearSecondChildern();
                    DrawNoteForPriceMultiply(buttonArray[buttonIndex].buttonText, buttonArray[buttonIndex].price);
                }
            );
        }
        else {
            button.addEventListener(
                'mouseenter',
                function () {
                    ClearSecondChildern();
                    DrawNoteForPrice(buttonArray[buttonIndex].buttonText, buttonArray[buttonIndex].price);
                }
            );
        }



        // Append buttons
        container.append(button);

        // Draw back button only once
        if (buttonIndex === 0) {
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
    containerDiv.className = "grid-item";
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
    containerDiv.className = "grid-item";
    buttonDiv.append(containerDiv);
    var backButton = document.createElement("button");
    backButton.textContent = "Back";
    backButton.className = "btn-primary navigationButton";
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

    // sets out the id of the commission, not the best place for it but it should have enough time to register if it's here. 
    // If there are two of the same ids, it's because two users made their commissions at the same time and this one couldn't update on time.
    // It should be very unlikely though in real life.
    GetCommissionCount();

    FinishedCommissionOrder.Quality = QualityButtons[QualitySelected.selectedItem].buttonText;
    FinishedCommissionOrder.Quantity = QuantityButtons[QuantitySelected.selectedItem].buttonText;
    FinishedCommissionOrder.Date = dateNow;
    FinishedCommissionOrder.Price = (QualitySelected.price * QuantitySelected.price)

    // If emoji commissions not selected
    if (QualitySelected.selectedItem != 0) {
        FinishedCommissionOrder.Background = BackgroundButtons[BackgroundSelected.selectedItem].buttonText;
        FinishedCommissionOrder.Price += BackgroundSelected.price;
    }
    // If emoji commissions selected
    else {
        FinishedCommissionOrder.Background = "Emoji";
        // Fifth emoji is free
        if (QuantitySelected.selectedItem === 4) {
            FinishedCommissionOrder.Price -= QualitySelected.price;
        }
    }

    if (DiscountPercentage != 0) {
        FinishedCommissionOrder.Price = FinishedCommissionOrder.Price * ((100 - DiscountPercentage) / 100);
        FinishedCommissionOrder.Note = "Discount: " + DiscountPercentage + "%";
    }

    // remove decimals
    FinishedCommissionOrder.Price = FinishedCommissionOrder.Price.toFixed(2)
}

function DrawSummary() {
    DrawLineOfPrice("Quality", QualityButtons[QualitySelected.selectedItem].buttonText, QualitySelected.price);
    DrawLineOfPriceX("Quantity", QuantityButtons[QuantitySelected.selectedItem].buttonText, QuantitySelected.price);

    // If emoji commissions not selected
    if (QualitySelected.selectedItem != 0) {
        DrawLineOfPrice("Background", BackgroundButtons[BackgroundSelected.selectedItem].buttonText, BackgroundSelected.price);
    }

    if (DiscountPercentage != 0) {
        DrawDiscountLine();
    }

    DrawTotalLine();

    // If emoji commissions not selected
    if (QualitySelected.selectedItem != 0) {
        DrawBackButton(DrawBackgroundMenu);
    }
    else {
        DrawBackButton(DrawQuantityMenu);
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
    p.textContent += "Total: " + FinishedCommissionOrder.Price + "$\n";
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
    descriptionInput.placeholder = "Decription";

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

function DrawToSScreen() {
    var p = document.createElement("p");
    p.textContent += "ToS Stuff goes here (work in progress)";
    mainDiv.append(p);
}

function DrawQueueScreen() {
    var p = document.createElement("p");
    p.textContent += "Queue Stuff goes here (work in progress)";
    mainDiv.append(p);
}

function DrawFeedbackScreen() {
    var p = document.createElement("p");
    p.textContent += "Give feedback for the website (not working yet)";
    secondDiv.append(p);

    var feedbackInput = document.createElement("textarea");
    feedbackInput.placeholder = "Feedback";

    feedbackInput.addEventListener(
        'change',
        function () {
            FinishedCommissionOrder.Username = feedbackInput.value;
        }
    );

    mainDiv.append(feedbackInput);

    var feedbackButton = document.createElement("button");
    feedbackButton.textContent = "Send feedback";
    feedbackButton.className = "btn-danger navigationButton";
    feedbackButton.addEventListener(
        'click',
        function () {
            PostFeedback(feedbackInput.value)
            // alert("Feedback Sent!");
            alert("Feedback not set yet!");
            DrawMainMenu();
        }
    );

    buttonDiv.append(feedbackButton);
}

function PostFeedback (feedback) {
    // send to database but different tab?
    console.log(feedback);
}