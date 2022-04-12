// Class used to create new commission orders (Inculding for example styles or formats)
class CommissionOrder {
    constructor(id, Username, Price, Quality, Quantity, Background, Date, Status, Description, Note) {
        this.id = id;
        this.Username = Username;
        this.Price = Price;
        this.Quality = Quality;
        this.Quantity = Quantity;
        this.Background = Background;
        this.Date = Date;
        this.Status = Status;
        this.Description = Description;
        this.Note = Note;
    }
}