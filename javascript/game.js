var gameport = document.getElementById("gameport");
var renderer = PIXI.autoDetectRenderer({width: 400, height: 400, backgroundColor: 0xf5fcf7});
var stage = new PIXI.Container();
var bird_texture = PIXI.Texture.fromImage("images/bird-100px-copy.png");
var bird = new PIXI.Sprite(bird_texture);

gameport.appendChild(renderer.view);

bird.anchor.x = 0.5;
bird.anchor.y = 0.5;

bird.position.x = 200;
bird.position.y = 200;

stage.addChild(bird);


game_map = [10][10]
// squares are numbered 0-9
current_x_square = 4
current_y_square = 4
current_location_x = 180
current_location_y = 180

// for a 400 x 400 grid with 10 spaces each way, each square should be 40 pixels
// need to place in the middle of those squares, so start off with 40 * square_number + 20?

// if needed could set the coordinates in the array for the x and y and get the coordinates from there



function placeBug()
{
	x_position = Math.random();
	//* ((high+1)-low)) + low
}

function moveDown(current_x, current_y)
{
	// checks to see if already in top square
	// 380 is the center of the top square
	if (current_y < 380)
	{
		current_location_y = current_y + 40;
		current_y_square += 1;
		bird.position.y = current_location_y;
	}
}


setInterval(function(){
	moveDown(current_location_x, current_location_y)
}, 3000);

function animate()
{
	requestAnimationFrame(animate);
	//bird.rotation += 0.1;
	renderer.render(stage);
}
animate();
