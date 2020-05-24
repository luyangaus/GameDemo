class DrawingApp {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private bird: Bird;
  private timer: number;
  private pipes: Array<Pipe>;
  private pipeTimer: number;
  private scoreBoard: HTMLElement;

  constructor() {
    this.canvas = document.getElementById("canvas") as HTMLCanvasElement;
    this.context = this.canvas.getContext("2d");
    this.scoreBoard = document.getElementById("mark");
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
    this.scoreBoard.innerHTML = "Score: " + this.bird.getScore();
    let pipe = this.pipes.filter((pipe) => {
      return !pipe.isCalculate && pipe.isDown();
    })[0];
    this.checkStatus(pipe);
  };

  private checkStatus(pipe: Pipe) {
    if (pipe) {
      if (
        this.bird.getXPosition() + this.bird.width >= pipe.getXPosition() &&
        this.bird.getXPosition() <= pipe.getXPosition() + pipe.pipeWidth &&
        (this.bird.getYPosition() < pipe.getYPosition() + pipe.pipeHeight ||
          this.bird.getYPosition() + this.bird.height > pipe.getYPosition() + pipe.pipeHeight + pipe.getGap())
      ) {
        console.log("pass");
        clearInterval(this.timer);
        clearInterval(this.pipeTimer);
        console.log("pipe :" + (pipe.getYPosition() + pipe.pipeHeight));
        console.log("bird :" + this.bird.getYPosition());
      }

      if (this.bird.getXPosition() > pipe.getXPosition() + pipe.pipeWidth) {
        pipe.isCalculate = true;
        this.bird.passPipe();
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
    this.pipeTimer = setInterval(() => {
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
  public getXPosition(): number {
    return this.xPosition;
  }

  public getYPosition(): number {
    return this.yPosition;
  }
}

class Bird extends ImageObj {
  private imgPath = ["./img/up.png", "./img/down.png"];
  public width = 40;
  public height = 30;
  private score = 0;

  constructor() {
    super();
    this.xPosition = 200;
    this.yPosition = 100;
    this.loadImages();
  }

  private loadImages() {
    this.img = new IMG(this.width, this.height, this.imgPath[1]);
  }

  public passPipe() {
    this.score++;
  }

  public getScore() {
    return this.score;
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
  public pipeWidth = 70;
  public pipeHeight = 300;
  private upStart = 180;
  private downStart = -230;

  constructor(isDown: boolean, fixYPosition: number) {
    super();
    this.xPosition = 800;
    this.yPosition = fixYPosition + (isDown ? -230 : 180); //330 - 180 (up)  -80 ~ -230
    this.loadImage(isDown);
  }

  private loadImage(isDown: boolean) {
    this.img = isDown
      ? new IMG(this.pipeWidth, this.pipeHeight, this.imgPath[1])
      : new IMG(this.pipeWidth, this.pipeHeight, this.imgPath[0]);
  }

  public move() {
    this.xPosition--;
  }

  public getGap(): number {
    return this.upStart - this.pipeHeight - this.downStart;
  }

  public isDown(): boolean {
    return this.yPosition < 0;
  }
}

new DrawingApp();
