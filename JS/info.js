const DiscountPercentage = 0;
const ToSLink = "https://docs.google.com/document/d/1EuS6WfqWhpsZZjJNc7dZYsk3IhRQELtJG745flm9J0E/edit?usp=sharing"

var QualityButtons = [
    new ButtonClass("Emoji", 5),
    new ButtonClass("Medallion", 7),
    new ButtonClass("Flat", 13),
    new ButtonClass("Shaded", 20),
    new ButtonClass("+ Highlight", 25),
    new ButtonClass("Comic", "???"),
];

var QualitySelected = new SelectClass;
QualitySelected.choicesCount = QualityButtons.length;

var QuantityButtons = [
    new ButtonClass("One", 1),
    new ButtonClass("Two", 2),
    new ButtonClass("Three", 3),
    new ButtonClass("Four", 4),
    new ButtonClass("Five", 5),
];

var QuantitySelected = new SelectClass;
QuantitySelected.choicesCount = QuantityButtons.length;

var BackgroundButtons = [
    new ButtonClass("None", 0),
    new ButtonClass("Simple", 10),
    new ButtonClass("Complex", 20),
];

var BackgroundSelected = new SelectClass;
BackgroundSelected.choicesCount = BackgroundButtons.length;


var FinishedCommissionOrder = new CommissionOrder;
