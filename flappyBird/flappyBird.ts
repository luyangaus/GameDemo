class DrawingApp {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private bird: Bird;
  private timer: number;

  constructor() {
    this.canvas = document.getElementById("canvas") as HTMLCanvasElement;
    this.context = this.canvas.getContext("2d");
    this.bird = new Bird();
    this.canvas.addEventListener("mousedown", (e) => {
      this.bird.flap(true);
      this.bird.fly();
    });

    this.canvas.addEventListener("mouseup", (e) => {
      this.bird.flap(false);
    });
    this.draw();
  }

  private draw() {
    let down = this.bird.getImage();
    down.image.onload = () => {
      if (!this.timer) {
        this.timer = setInterval(this.drop, 10);
      }
    };
  }

  drop = () => {
    this.bird.drop();
    this.context.clearRect(0, 0, 800, 400);
    this.context.drawImage(
      this.bird.getImage().image,
      this.bird.getXPosition(),
      this.bird.getYPosition(),
      this.bird.getImage().height,
      this.bird.getImage().width
    );
  };
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

class Bird {
  private img: IMG;
  private xPosition: number;
  private yPosition: number;
  private imgPath = ["./img/up.png", "./img/down.png"];

  constructor() {
    this.xPosition = 200;
    this.yPosition = 100;
    this.loadImages();
  }

  private loadImages() {
    this.img = new IMG(60, 60, this.imgPath[1]);
  }

  public drop() {
    if (this.yPosition < 350) this.yPosition++;
  }

  public fly() {
    if (this.yPosition > 50) this.yPosition -= 50;
  }

  public getImage() {
    return this.img;
  }

  public flap(mouseDown: boolean) {
    mouseDown ? (this.img.image.src = this.imgPath[0]) : (this.img.image.src = this.imgPath[1]);
  }

  public getXPosition() {
    return this.xPosition;
  }

  public getYPosition() {
    return this.yPosition;
  }
}

new DrawingApp();
