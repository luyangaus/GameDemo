enum Arrow{
  Up = '38',
  Down = "40",
  Left = "37",
  Right = "39"
}

interface FlyItem{
    moveVertical(int);
    moveHorizontal(int);
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
  private imgPath = ["./img/planeLeft.png", "./img/plane.png", "./img/planeRight.png"];

  constructor()
  {
    super();
    this.imgPath
    this.loadImages()
  }

  private loadImages() {
    this.img = new IMG(10, 15, this.imgPath[1]);
  }

    moveVertical(fixRate) {
        if(fixRate < 0 && this.yPosition > 0 ||
            fixRate > 0 && this.yPosition + this.img.height < 400)
        this.yPosition += 1*fixRate;
    }
    moveHorizontal(fixRate) {
      if(fixRate < 0 && this.xPosition > 0 ||
        fixRate > 0 && this.xPosition + this.img.width < 800)
        this.yPosition += 1*fixRate;
    }

    Move(keyDown: KeyboardEvent) {
      //左右倾斜的 飞机 没找到素材所以一样

      switch(keyDown.code)
      {
        case Arrow.Left:
          this.img.image.src = this.imgPath[0];
          this.moveHorizontal(-1)
          break;
        case Arrow.Right:
          this.img.image.src = this.imgPath[2];
          this.moveHorizontal(1)
          break;
        case Arrow.Up:
          this.img.image.src = this.imgPath[1];
          this.moveVertical(-1);
          break;
        case Arrow.Down:
          this.img.image.src = this.imgPath[1];
          this.moveVertical(1);
          break;
      }
    }
}

class DrawingApp {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private hero: Hero;
  private timer: number;
  private bullet: Array<Bullet>;
  private scoreBoard: HTMLElement;

  constructor() {
    this.canvas = document.getElementById("canvas") as HTMLCanvasElement;
    this.context = this.canvas.getContext("2d");
    this.scoreBoard = document.getElementById("mark");
    this.gameStart();
  }

  private addListeners() {
    this.canvas.addEventListener("keydown", (e) => {
      this.hero.Move(e);
    });
  }

  private gameStart() {
    this.hero = new Hero();
    //this.createPipes();
    //this.addListeners();
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
