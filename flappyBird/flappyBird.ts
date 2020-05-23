class DrawingApp {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private bird: Bird;
  private timer: number;
  private pipes: Array<Pipe>;

  constructor() {
    this.canvas = document.getElementById("canvas") as HTMLCanvasElement;
    this.context = this.canvas.getContext("2d");
    this.gameStart();
  }

  private addListeners() {
    this.canvas.addEventListener("mousedown", (e) => {
      this.bird.flap(true);
      this.bird.fly();
    });

    this.canvas.addEventListener("mouseup", (e) => {
      this.bird.flap(false);
    });
  }

  private gameStart() {
    this.bird = new Bird();
    this.createPipes();
    this.addListeners();
    let down = this.bird.getImage();
    down.image.onload = () => {
      if (!this.timer) {
        this.timer = setInterval(this.drawImg, 10);
      }
    };
  }

  drawImg = () => {
    this.context.clearRect(0, 0, 800, 400);
    this.drawBird();
    this.drawPipes();
  };

  private drawBird() {
    this.bird.drop();
    this.context.drawImage(
      this.bird.getImage().image,
      this.bird.getXPosition(),
      this.bird.getYPosition(),
      this.bird.getImage().width,
      this.bird.getImage().height
    );
  }

  private drawPipes() {
    this.pipes.map((pipe) => {
      this.context.drawImage(
        pipe.getImage().image,
        pipe.getXPosition(),
        pipe.getYPosition(),
        pipe.getImage().width,
        pipe.getImage().height
      );
      pipe.move();
    });
  }

  private createPipes() {
    this.pipes = new Array<Pipe>();
    setInterval(() => {
      this.pipes.push(new Pipe());
      if (this.pipes.length > 10) this.pipes = this.pipes.slice(3);
    }, 1800);
  }
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
  public getXPosition() {
    return this.xPosition;
  }

  public getYPosition() {
    return this.yPosition;
  }
}

class Bird extends ImageObj {
  private imgPath = ["./img/up.png", "./img/down.png"];

  constructor() {
    super();
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

  public flap(mouseDown: boolean) {
    mouseDown ? (this.img.image.src = this.imgPath[0]) : (this.img.image.src = this.imgPath[1]);
  }
}

class Pipe extends ImageObj {
  private imgPath = ["./img/pipe.png"];
  private id: number;

  constructor() {
    super();
    this.xPosition = 800;
    this.yPosition = -460 + Math.round(Math.random() * 140); //-460, -320
    this.id = new Date().getTime();
    this.loadImage();
  }

  private loadImage() {
    this.img = new IMG(450, 1100, this.imgPath[0]);
  }

  public move() {
    this.xPosition--;
  }
}

new DrawingApp();
