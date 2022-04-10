// Functions used in drawing menus
function ClearChildren () {
    var child = originalDiv.lastElementChild;
    while (child) {
        originalDiv.removeChild(child);
        child = originalDiv.lastElementChild;
    }
}

// Give the array of buttons, ID where to append to, and the next function
function DrawButtons (Buttons, AppendElement, NextFunction)
{
    Buttons.forEach(function (ButtonClass, buttonIndex, buttonArray) {
        // add button details
        var button = document.createElement("button");

        button.className = buttonArray[buttonIndex].buttonColor;
        button.id = buttonArray[buttonIndex].buttonId;
        button.textContent = buttonArray[buttonIndex].buttonText;

        button.addEventListener(
            'click',
            function() {
                NextFunction();
            }
        );

        // Append buttons
        AppendElement
        .appendChild(button);
    });
}
