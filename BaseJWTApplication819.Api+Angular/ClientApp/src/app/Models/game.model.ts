export class Game {
  public id: number;
  public title: string;
  public price: number;
  public year: number;
  public imageURL: string;
  public description: string;
  public genre: string;
  public developer: string;


  constructor(Id: number, Title: string, Price: number,
    Description: string, Image: string, Year: number, Genre: string, Developer: string) {
    this.id = Id;
    this.title = Title;
    this.price = Price;
    this.description = Description;
    this.imageURL = Image;
    this.year = Year;
    this.genre = Genre;
    this.developer = Developer;
  }
}
