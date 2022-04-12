const DiscountPercentage = 0;

var QualityButtons = [
    new ButtonClass("Emoji", 5),
    new ButtonClass("Flat", 15),
    new ButtonClass("Shaded", 25),
    new ButtonClass("Shaded + Highlighted", 25),
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
    new ButtonClass("Easy", 10),
    new ButtonClass("Complex", 20),
];

var BackgroundSelected = new SelectClass;
BackgroundSelected.choicesCount = BackgroundButtons.length;


var FinishedCommissionOrder = new CommissionOrder;
