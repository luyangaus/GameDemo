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
    this.drawBackground();
    this.drawBird();
    this.drawPipes();
    let pipe = this.pipes.filter((pipe) => {
      return !pipe.isCalculate;
    })[0];
    this.checkStatus(pipe);
  };

  private checkStatus(pipe: Pipe) {
    if (pipe) {
      if (this.bird.getXPosition() + 60 == pipe.getXPosition()) {
        console.log("in");
        pipe.isCalculate = true;
      }
    }
  }

  private drawBackground() {
    let backgroundImg = new Image();
    backgroundImg.src = "./img/background.png";
    this.context.drawImage(backgroundImg, 0, 0, 800, 400);
  }

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
      let fixYPosition = Math.round(Math.random() * 150);
      this.pipes.push(new Pipe(true, fixYPosition));
      this.pipes.push(new Pipe(false, fixYPosition));
      if (this.pipes.length > 15) this.pipes = this.pipes.slice(3);
    }, 2000);
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
    this.yPosition > 50 ? (this.yPosition -= 50) : (this.yPosition = 0);
  }

  public flap(mouseDown: boolean) {
    mouseDown ? (this.img.image.src = this.imgPath[0]) : (this.img.image.src = this.imgPath[1]);
  }
}

class Pipe extends ImageObj {
  private imgPath = ["./img/up_pipe.png", "./img/down_pipe.png"];
  public isCalculate = false;
  private pipeWidth = 70;
  private pipeHeight = 300;

  constructor(isUp: boolean, fixYPosition: number) {
    super();
    this.xPosition = 800;
    this.yPosition = fixYPosition + (isUp ? 180 : -230); //330 - 180 (up)  -80 ~ -230
    this.loadImage(isUp);
  }

  private loadImage(isUp: boolean) {
    this.img = isUp ? new IMG(this.pipeWidth, this.pipeHeight, this.imgPath[0]) : new IMG(this.pipeWidth, this.pipeHeight, this.imgPath[1]);
  }

  public move() {
    this.xPosition--;
  }
}

new DrawingApp();
