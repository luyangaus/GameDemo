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
            _this.drawBird();
            _this.drawPipes();
        };
        this.canvas = document.getElementById("canvas");
        this.context = this.canvas.getContext("2d");
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
        setInterval(function () {
            _this.pipes.push(new Pipe());
            if (_this.pipes.length > 10)
                _this.pipes = _this.pipes.slice(3);
        }, 1800);
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
        _this.xPosition = 200;
        _this.yPosition = 100;
        _this.loadImages();
        return _this;
    }
    Bird.prototype.loadImages = function () {
        this.img = new IMG(60, 60, this.imgPath[1]);
    };
    Bird.prototype.drop = function () {
        if (this.yPosition < 350)
            this.yPosition++;
    };
    Bird.prototype.fly = function () {
        if (this.yPosition > 50)
            this.yPosition -= 50;
    };
    Bird.prototype.flap = function (mouseDown) {
        mouseDown ? (this.img.image.src = this.imgPath[0]) : (this.img.image.src = this.imgPath[1]);
    };
    return Bird;
}(ImageObj));
var Pipe = /** @class */ (function (_super) {
    __extends(Pipe, _super);
    function Pipe() {
        var _this = _super.call(this) || this;
        _this.imgPath = ["./img/pipe.png"];
        _this.xPosition = 800;
        _this.yPosition = -460 + Math.round(Math.random() * 140); //-460, -320
        _this.id = new Date().getTime();
        _this.loadImage();
        return _this;
    }
    Pipe.prototype.loadImage = function () {
        this.img = new IMG(450, 1100, this.imgPath[0]);
    };
    Pipe.prototype.move = function () {
        this.xPosition--;
    };
    return Pipe;
}(ImageObj));
new DrawingApp();
//# sourceMappingURL=flappyBird.js.map