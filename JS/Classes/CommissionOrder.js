// Class used to create new commission orders (Inculding for example styles or formats)
class CommissionOrder {
    constructor(id, Username, Quality, CharacterQuantity, Background, Price, Date, Status) {
        this.id = id;
        this.Username = Username;
        this.Quality = Quality;
        this.CharacterQuantity = CharacterQuantity;
        this.Background = Background;
        this.Price = Price;
        this.Date = Date;
        this.Status = Status;
    }
}