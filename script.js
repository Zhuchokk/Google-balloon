let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let objects = [];
let onload = false;
ctx.fillText("Loading...", canvas.width / 2, canvas.height / 2);

class Base{
	imagePath = '';
	x = 0;
	y = 0;

	constructor(src, x, y){
		this.imagePath = src;
		this.x = x;
		this.y = y;
	}

	initImage() {
		if (this.imagePath != '') {
			this.img = document.createElement('img');
			this.img.src = this.imagePath;

			return true;
		}

		return false;
	}

	draw(){
		try{
			if (this.isload()){
				ctx.drawImage(this.img, this.x, this.y);
				return;
			} else {
				setTimeout(function (obj) {return obj.draw();}, 10, this);
				
			}
		} catch(ex) {
			console.log(ex);
			return;
		}

		
	}

	isload(){
		if (this.img.width === 0){
			return false;
		}

		return true;
	}
}


class Ballon extends Base {

	horizon_move(bias){
		ctx.clearRect(this.x, this.y, this.x + this.img.width, this.y + this.img.height);
		this.x += bias;
		this.draw();
	}
}

class Spike extends Base{
	width = 0;
	height = 0;

	constructor(src, x, y, w, h){
		super(src, x, y);
		this.width = w;
		this.height = h;
	}


}

bal = new Ballon("images//balloon.png", 20, 20);
bal.initImage();
bal.draw();
spike = new Spike("images//spike1.png", 50, 50);
spike.initImage();
spike.draw();

ctx.fillStyle = "white";
ctx.fillRect(canvas.width / 2 -10, canvas.height / 2 - 10, 50, 50)

