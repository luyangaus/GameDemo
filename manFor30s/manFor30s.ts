interface FlyItem{
    moveVertical();
    moveHorizontal();
}





class IMG {
    public width: number;
    public height: number;
    public path: string;
    public image: HTMLImageElement;
  
    constructor(width: number, height: number, path: string) {
      this.width = width;
      this.height = height;
      this.image = new Image();
      this.image.src = path;
    }
  }
  
  interface MyImageInterface {
    getImage();
    getXPosition();
    getYPosition();
  }
  
  class ImageObj implements MyImageInterface {
    protected img: IMG;
    protected xPosition: number;
    protected yPosition: number;
  
    public getImage() {
      return this.img;
    }
    public getXPosition(): number {
      return this.xPosition;
    }
  
    public getYPosition(): number {
      return this.yPosition;
    }
  }

  class Bullet extends ImageObj implements FlyItem
{
    moveVertical() {
        throw new Error("Method not implemented.");
    }
    moveHorizontal() {
        throw new Error("Method not implemented.");
    }
    
}

class Hero extends ImageObj implements FlyItem
{
    moveVertical() {
        throw new Error("Method not implemented.");
    }
    moveHorizontal() {
        throw new Error("Method not implemented.");
    }
}