var DrawingApp = /** @class */ (function () {
    function DrawingApp() {
        var _this = this;
        this.drop = function () {
            _this.bird.drop();
            _this.context.clearRect(0, 0, 800, 400);
            _this.context.drawImage(_this.bird.getImage().image, _this.bird.getXPosition(), _this.bird.getYPosition(), _this.bird.getImage().height, _this.bird.getImage().width);
        };
        this.canvas = document.getElementById("canvas");
        this.context = this.canvas.getContext("2d");
        this.bird = new Bird();
        this.canvas.addEventListener("mousedown", function (e) {
            _this.bird.flap(true);
            _this.bird.fly();
        });
        this.canvas.addEventListener("mouseup", function (e) {
            _this.bird.flap(false);
        });
        this.draw();
    }
    DrawingApp.prototype.draw = function () {
        var _this = this;
        var down = this.bird.getImage();
        down.image.onload = function () {
            if (!_this.timer) {
                _this.timer = setInterval(_this.drop, 10);
            }
        };
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
var Bird = /** @class */ (function () {
    function Bird() {
        this.imgPath = ["./img/up.png", "./img/down.png"];
        this.xPosition = 200;
        this.yPosition = 100;
        this.loadImages();
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
    Bird.prototype.getImage = function () {
        return this.img;
    };
    Bird.prototype.flap = function (mouseDown) {
        mouseDown ? (this.img.image.src = this.imgPath[0]) : (this.img.image.src = this.imgPath[1]);
    };
    Bird.prototype.getXPosition = function () {
        return this.xPosition;
    };
    Bird.prototype.getYPosition = function () {
        return this.yPosition;
    };
    return Bird;
}());
new DrawingApp();
//# sourceMappingURL=flappyBird.js.map