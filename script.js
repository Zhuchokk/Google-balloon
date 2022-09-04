let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let objects = [];
let onload = false;
ctx.fillText("Loading...", canvas.width / 2, canvas.height / 2);

var intersect = function(a,b){
	return(
		(
			(
				( a.x>=b.x && a.x<=b.x1 )||( a.x1>=b.x && a.x1<=b.x1  )
			) && (
				( a.y>=b.y && a.y<=b.y1 )||( a.y1>=b.y && a.y1<=b.y1 )
			)
		)||(
			(
				( b.x>=a.x && b.x<=a.x1 )||( b.x1>=a.x && b.x1<=a.x1  )
			) && (
				( b.y>=a.y && b.y<=a.y1 )||( b.y1>=a.y && b.y1<=a.y1 )
			)
		)
	)||(
		(
			(
				( a.x>=b.x && a.x<=b.x1 )||( a.x1>=b.x && a.x1<=b.x1  )
			) && (
				( b.y>=a.y && b.y<=a.y1 )||( b.y1>=a.y && b.y1<=a.y1 )
			)
		)||(
			(
				( b.x>=a.x && b.x<=a.x1 )||( b.x1>=a.x && b.x1<=a.x1  )
			) && (
				( a.y>=b.y && a.y<=b.y1 )||( a.y1>=b.y && a.y1<=b.y1 )
			)
		)
	);
}

function check(spikes, balloon){
	xA = [balloon.x, balloon.x + balloon.img.width]
	yA = [balloon.y, balloon.y + balloon.img.height]
	for(let i=0; i < spikes.length; i++){

		xB = [spikes[i].x, spikes[i].x + spikes[i].img.width]
		yB = [spikes[i].y, spikes[i].y + spikes[i].img.height]
		if (!intersect(spikes[i], balloon)){
			return false;
		}
		
	}
	return true;
}


class Base{
	imagePath = '';
	x = 0;
	y = 0;
	x1 = 0;
	y1 = 0;

	constructor(src, x, y){
		this.imagePath = src;
		this.x = x;
		this.y = y;
		this.x1 = x;
		this.y1 = y;
	}

	initImage() {
		if (this.imagePath != '') {
			this.img = document.createElement('img');
			this.img.src = this.imagePath;
			this.x1 = this.x + this.img.width;
			this.y1 = this.y + this.img.height;

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
				console.log('timeout');
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
		ctx.clearRect(this.x, this.y, this.img.width, this.img.height);
		this.x += bias;
		this.x1 = this.x + this.img.width;
		this.draw();
	}
	vertical_move(bias){
		ctx.clearRect(this.x, this.y, this.img.width, this.img.height);
		this.y += bias;
		this.y1 = this.y + this.img.height;
		this.draw();
	}
}

class Spike extends Base{
	teleport(x, y){
		ctx.clearRect(this.x, this.y, this.img.width, this.img.height);
		this.x = x;
		this.y = y;
		this.x1 = this.x + this.img.width;
		this.y1 = this.y + this.img.height;
		this.draw();
	}


}

bal = new Ballon("images//balloon.png",  212 +60, 100);
bal.initImage();
bal.draw();

spike = new Spike("images//spike1.png", 60, 60);
spike.initImage();
spike.draw();
spikes = [spike];

ctx.clearRect(canvas.width / 2 -10, canvas.height / 2 - 10, 50, 50)


function main (spikes, balloon) {
	if(check(spikes, balloon)){
		return false;
	} else{
		bal.vertical_move(-1)
	}
}

setInterval(main, 100, spikes, bal);
