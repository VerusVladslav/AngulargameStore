
export class Product {
  public id: number;
  public title: string;
  public image: string;
  public price: number;
  public description: string;

  constructor(Id: number, Title: string, Price: number, Description: string, Image: string) {
    this.id = Id;
    this.title = Title;
    this.price = Price;
    this.description = Description;
    this.image = Image;

  }
}
