let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let objects = [];
let onload = false;
ctx.fillText("Загрузка...", canvas.width / 2, canvas.height / 2);


class Ballon {
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
				console.log("picture drawn");
				return;
			} else {
				return this.draw();
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

	horizon_move(bias){
		ctx.clearRect(this.x, this.y, this.x + this.img.width, this.y + this.img.height);
		this.x += bias;
		this.draw();
	}
}


bal = new Ballon("images//balloon.png", 20, 20);
bal.initImage();
bal.draw();