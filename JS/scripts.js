// Functions used in drawing menus
function ClearChildren () {
    var child = originalDiv.lastElementChild;
    while (child) {
        originalDiv.removeChild(child);
        child = originalDiv.lastElementChild;
    }
}

// Give the array of buttons, element where to append to, and the next- and old function
function DrawButtons (Buttons, AppendElement, NextFunction, OldFunction)
{
    // Make new container for buttons
    var buttonContainer = document.createElement("div");
    AppendElement
        .appendChild(buttonContainer);

    Buttons.forEach(function (ButtonClass, buttonIndex, buttonArray) {
        // add button details
        var button = document.createElement("button");

        button.className = "btn-outline-primary";
        button.id = buttonArray[buttonIndex].buttonId;
        button.textContent = buttonArray[buttonIndex].buttonText;

        button.addEventListener(
            'click',
            function() {
                NextFunction();
            }
        );

        // Append buttons
        buttonContainer.append(button);
    });

    // Make new container for back and next buttons
    var menuContainer = document.createElement("div");
    AppendElement
        .appendChild(menuContainer);

    // Print Back button
    var backButton = document.createElement("button");
    backButton.textContent = "Back";
    backButton.className = "btn-primary";
    backButton.addEventListener(
        'click',
        function() {
            OldFunction();
        }
    );

    menuContainer.append(backButton);

    // Print Next button
    var nextButton = document.createElement("button");
    nextButton.textContent = "Next";
    nextButton.className = "btn-primary";
    nextButton.addEventListener(
        'click',
        function() {
            NextFunction();
        }
    );

    menuContainer.append(nextButton);
}
