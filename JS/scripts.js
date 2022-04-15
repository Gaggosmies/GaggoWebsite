// Functions used in drawing menus
function ClearChildren() {
    var child = originalDiv.lastElementChild;
    while (child) {
        originalDiv.removeChild(child);
        child = originalDiv.lastElementChild;
    }
}

// todo: fix
// Give the array of main menu elements
function DrawMainMenuButtons(Buttons) {
    // Make new container for buttons
    var buttonContainer = document.createElement("div");
    originalDiv
        .appendChild(buttonContainer);

    Buttons.forEach(function (MainMenuButtonClass, buttonIndex, buttonArray) {
        // add button details
        var button = document.createElement("button");

        button.className = buttonArray[buttonIndex].buttonColor;
        button.id = buttonArray[buttonIndex].buttonText + "Btn";
        button.textContent = buttonArray[buttonIndex].buttonText;

        button.addEventListener(
            'click',
            function () {
                buttonArray[buttonIndex].NextFunction();
            }
        );

        // Append buttons
        buttonContainer.append(button);
    });
}

// Give the array of buttons, SelectClass, and the next function
function DrawButtons(Buttons, Selection, NextFunction, OldFunction) {
    // Make new container for buttons
    var buttonContainer = document.createElement("div");
    originalDiv
        .appendChild(buttonContainer);

    Buttons.forEach(function (ButtonClass, buttonIndex, buttonArray) {
        // add button details
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

        // Append buttons
        buttonContainer.append(button);

        // Draw back button only once
        if (buttonIndex === 0) {
            DrawBackButton(OldFunction);
        }

        // Draw next button if item has been selected
        if (Selection.selectedItem === buttonArray[buttonIndex]) {
            DrawNextButton(NextFunction);
        }
    });
}

function DrawNextButton(NextFunction) {
    // Print Next button
    var nextButton = document.createElement("button");
    nextButton.textContent = "Next";
    nextButton.className = "btn-primary";
    nextButton.addEventListener(
        'click',
        function () {
            NextFunction();
        }
    );

    originalDiv.append(nextButton);
}

function DrawBackButton(OldFunction) {
    // Print Back button
    var backButton = document.createElement("button");
    backButton.textContent = "Back";
    backButton.className = "btn-primary";
    backButton.addEventListener(
        'click',
        function () {
            OldFunction();
        }
    );

    originalDiv.append(backButton);
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
        if(QuantitySelected.selectedItem === 4)
        {
            FinishedCommissionOrder.Price -= QualitySelected.price;
        }
    }

    if (DiscountPercentage != 0) {
        FinishedCommissionOrder.Price = FinishedCommissionOrder.Price * ((100 - DiscountPercentage) / 100);
        FinishedCommissionOrder.Note = "Discount: " + DiscountPercentage + "%";
    }
}