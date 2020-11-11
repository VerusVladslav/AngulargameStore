export class AddGame {
  public  title: string;

  public  price: number;
  public  year: number;


  public  imageURL: string;

  public  description: string;

  public  genre: string;
  public  developer: string;

  constructor( Title: string, Price: number, Year: number, ImageURL: string,
    Description: string, Genre: string, Developer: string) {
    this.title = Title;
    this.price = Price;
    this.description = Description;
    this.developer = Developer;
    this.imageURL = ImageURL;
    this.year = Year;
    this.genre = Genre;
  }
}
