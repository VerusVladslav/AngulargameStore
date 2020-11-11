export class ClientOrder {
  public id: number;
  public title: string;
  public price: number;
  public year: number;
  public imageURL: string;
  public description: string;
  public genre: string;
  public developer: string;
  public isinOrder: boolean;
  public isAccept: boolean;
  constructor(Id: number, Title: string, Price: number,
    Description: string, Image: string, Year: number,
    Genre: string, Developer: string, isinOrder: boolean,
    isAccept: boolean) {
    this.id = Id;
    this.title = Title;
    this.price = Price;
    this.description = Description;
    this.imageURL = Image;
    this.year = Year;
    this.genre = Genre;
    this.developer = Developer;
    this.isinOrder = isinOrder;
    this.isAccept = isAccept;
  }


  /**
   *
   */

 }
