var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var DrawingApp = /** @class */ (function () {
    function DrawingApp() {
        var _this = this;
        this.drawImg = function () {
            _this.context.clearRect(0, 0, 800, 400);
            _this.drawBackground();
            _this.drawBird();
            _this.drawPipes();
            _this.scoreBoard.innerHTML = "Score: " + _this.bird.getScore();
            var pipe = _this.pipes.filter(function (pipe) {
                return !pipe.isCalculate && pipe.isDown();
            })[0];
            _this.checkStatus(pipe);
        };
        this.canvas = document.getElementById("canvas");
        this.context = this.canvas.getContext("2d");
        this.scoreBoard = document.getElementById("mark");
        this.gameStart();
    }
    DrawingApp.prototype.addListeners = function () {
        var _this = this;
        this.canvas.addEventListener("mousedown", function (e) {
            _this.bird.flap(true);
            _this.bird.fly();
        });
        this.canvas.addEventListener("mouseup", function (e) {
            _this.bird.flap(false);
        });
    };
    DrawingApp.prototype.gameStart = function () {
        var _this = this;
        this.bird = new Bird();
        this.createPipes();
        this.addListeners();
        var down = this.bird.getImage();
        down.image.onload = function () {
            if (!_this.timer) {
                _this.timer = setInterval(_this.drawImg, 10);
            }
        };
    };
    DrawingApp.prototype.checkStatus = function (pipe) {
        if (pipe) {
            if (this.bird.getXPosition() + this.bird.width >= pipe.getXPosition() &&
                this.bird.getXPosition() <= pipe.getXPosition() + pipe.pipeWidth &&
                (this.bird.getYPosition() < pipe.getYPosition() + pipe.pipeHeight ||
                    this.bird.getYPosition() + this.bird.height > pipe.getYPosition() + pipe.pipeHeight + pipe.getGap())) {
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
    };
    DrawingApp.prototype.drawBackground = function () {
        var backgroundImg = new Image();
        backgroundImg.src = "./img/background.png";
        this.context.drawImage(backgroundImg, 0, 0, 800, 400);
    };
    DrawingApp.prototype.drawBird = function () {
        this.bird.drop();
        this.context.drawImage(this.bird.getImage().image, this.bird.getXPosition(), this.bird.getYPosition(), this.bird.getImage().width, this.bird.getImage().height);
    };
    DrawingApp.prototype.drawPipes = function () {
        var _this = this;
        this.pipes.map(function (pipe) {
            _this.context.drawImage(pipe.getImage().image, pipe.getXPosition(), pipe.getYPosition(), pipe.getImage().width, pipe.getImage().height);
            pipe.move();
        });
    };
    DrawingApp.prototype.createPipes = function () {
        var _this = this;
        this.pipes = new Array();
        this.pipeTimer = setInterval(function () {
            var fixYPosition = Math.round(Math.random() * 150);
            _this.pipes.push(new Pipe(true, fixYPosition));
            _this.pipes.push(new Pipe(false, fixYPosition));
            if (_this.pipes.length > 15)
                _this.pipes = _this.pipes.slice(3);
        }, 2000);
    };
    return DrawingApp;
}());
var IMG = /** @class */ (function () {
    function IMG(width, height, path) {
        this.width = width;
        this.height = height;
        this.image = new Image();
        this.image.src = path;
    }
    return IMG;
}());
var ImageObj = /** @class */ (function () {
    function ImageObj() {
    }
    ImageObj.prototype.getImage = function () {
        return this.img;
    };
    ImageObj.prototype.getXPosition = function () {
        return this.xPosition;
    };
    ImageObj.prototype.getYPosition = function () {
        return this.yPosition;
    };
    return ImageObj;
}());
var Bird = /** @class */ (function (_super) {
    __extends(Bird, _super);
    function Bird() {
        var _this = _super.call(this) || this;
        _this.imgPath = ["./img/up.png", "./img/down.png"];
        _this.width = 40;
        _this.height = 30;
        _this.score = 0;
        _this.xPosition = 200;
        _this.yPosition = 100;
        _this.loadImages();
        return _this;
    }
    Bird.prototype.loadImages = function () {
        this.img = new IMG(this.width, this.height, this.imgPath[1]);
    };
    Bird.prototype.passPipe = function () {
        this.score++;
    };
    Bird.prototype.getScore = function () {
        return this.score;
    };
    Bird.prototype.drop = function () {
        if (this.yPosition < 350)
            this.yPosition++;
    };
    Bird.prototype.fly = function () {
        this.yPosition > 50 ? (this.yPosition -= 50) : (this.yPosition = 0);
    };
    Bird.prototype.flap = function (mouseDown) {
        mouseDown ? (this.img.image.src = this.imgPath[0]) : (this.img.image.src = this.imgPath[1]);
    };
    return Bird;
}(ImageObj));
var Pipe = /** @class */ (function (_super) {
    __extends(Pipe, _super);
    function Pipe(isDown, fixYPosition) {
        var _this = _super.call(this) || this;
        _this.imgPath = ["./img/up_pipe.png", "./img/down_pipe.png"];
        _this.isCalculate = false;
        _this.pipeWidth = 70;
        _this.pipeHeight = 300;
        _this.upStart = 180;
        _this.downStart = -230;
        _this.xPosition = 800;
        _this.yPosition = fixYPosition + (isDown ? -230 : 180); //330 - 180 (up)  -80 ~ -230
        _this.loadImage(isDown);
        return _this;
    }
    Pipe.prototype.loadImage = function (isDown) {
        this.img = isDown
            ? new IMG(this.pipeWidth, this.pipeHeight, this.imgPath[1])
            : new IMG(this.pipeWidth, this.pipeHeight, this.imgPath[0]);
    };
    Pipe.prototype.move = function () {
        this.xPosition--;
    };
    Pipe.prototype.getGap = function () {
        return this.upStart - this.pipeHeight - this.downStart;
    };
    Pipe.prototype.isDown = function () {
        return this.yPosition < 0;
    };
    return Pipe;
}(ImageObj));
new DrawingApp();
//# sourceMappingURL=flappyBird.js.map