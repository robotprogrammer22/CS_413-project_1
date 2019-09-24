/*
TO DO:

	fix bug so it is not placed at a decimal or where the bird can't get it

	add keyboard input
	place bug somewhere that they have to collect
	write code so they can collect the bug
	should the bug move?
	bug might be optional, just moving the bird might be good enough
	make a border for the game
	fix the bird so it doesn't go off the screen (might be fixed by changing bird size so it's not so big and maybe not letting it enter the squares on the side?)
		also make the grid a 8 x 8 grid and save the other squares for the border and put the border as far as you can go to the wall
		could also just increase the size of the game board by one square
	fix the scale for the bird and the game window (was on the last quiz, is that on the transform stuff?)
		use setTransform for this, don't redraw or rescale the image again
		could setTransform be used to change the scale and then continue with what is being done?
	change the set interval loop to a game loop thing?? (optional, just make it work first, then optimize)
	game score thing?
	use set transform instead of manually setting position
		still need to do calculations, but seting the x and y manually might not be the best way?
	game sound???
		like something when an item is collected
		
	need to add icon
		
	maybe remove the parameters of the function
		it can just access them on its own and is doing that to change it right now
	
	
	mirror bird image for when going right and change spites if it is on the other one? or just rerender the same sprite?
	
	
	border art:
		flowers?? trees? bush?
		make 40 pixels long, not sure how wide (each square is 40 pixels)
		just make one really long element that covers the whole grid length
		maybe just make a small section and use the selection tool to make duplicates until the right length is reached
		
		
	future art update, have the bird be flying and land in each square if there's a long enough pause between key presses?
		have one image for wings open, have another for flapping
*/



var gameport = document.getElementById("gameport");
var renderer = PIXI.autoDetectRenderer({width: 400, height: 400, backgroundColor: 0xf5fcf7});
var stage = new PIXI.Container();
var bird_texture = PIXI.Texture.fromImage("images/bird-100px-copy.png");
var bird = new PIXI.Sprite(bird_texture);

var bug_texture = PIXI.Texture.fromImage("images/beetle.png");
var bug = new PIXI.Sprite(bug_texture);

gameport.appendChild(renderer.view);

bird.anchor.x = 0.5;
bird.anchor.y = 0.5;

bird.position.x = 200;
bird.position.y = 200;

bird.scale.x = 0.65;
bird.scale.y = 0.65;

stage.addChild(bird);


bug.anchor.x = 0.5;
bug.anchor.y = 0.5;

bug.scale.x = 1;
bug.scale.y = 1;


game_map = [10][10];
// squares are numbered 0-9
// squares the bird can go in are 1-8
current_x_square = 4;
current_y_square = 4;
current_location_x = 180;
current_location_y = 180;

bug_x = 0;
bug_y = 0;

// for a 400 x 400 grid with 10 spaces each way, each square should be 40 pixels
// need to place in the middle of those squares, so start off with 40 * square_number + 20?

// if needed could set the coordinates in the array for the x and y and get the coordinates from there



function placeBug()
{	
	// randomly chooses a square between 1-8 (inclusive)
	// math.round rounds to the nearest integer
	bug_x_square = Math.round(((Math.random()) * 7) + 1);
	bug_y_square = Math.round(((Math.random()) * 7) + 1);
	
	
	bug_x = bug_x_square * 40 + 20;
	bug_y = bug_y_square * 40 + 20;
	
	bug.position.x = bug_x;
	bug.position.y = bug_y;
	
	//console.log(bug_x);
	//console.log(bug_y);
	
	stage.addChild(bug);
}

function bugCollected()
{
	if ((bug_x == current_location_x) && (bug_y == current_location_y))
	{
		stage.removeChild(bug);
		placeBug();
	}
}


function moveDown(current_x, current_y)
{
	// checks to see if already in top square
	// 380 is the center of the top square
	//if (current_y < 380)
	if (current_y < 340)
	{
		current_location_y = current_y + 40;
		current_y_square += 1;
		bird.position.y = current_location_y;
	}
}

function moveLeft(current_x, current_y)
{
	bird.scale.x = 0.65;
	
	if (current_x > 60)
	{
		current_location_x = current_x - 40;
		current_x_square -= 1;
		bird.position.x = current_location_x;
	}
}

function moveRight(current_x, current_y)
{
	bird.scale.x = -0.65;
	if (current_x < 340)
	{
		current_location_x = current_x + 40;
		current_x_square += 1;
		bird.position.x = current_location_x;
	}
}

function moveUp(current_x, current_y)
{
	//if (current_y > 20)
	if (current_y > 60)
	{
		current_location_y = current_y - 40;
		current_y_square -= 1;
		bird.position.y = current_location_y;
	}
}

function keyPress(key)
{
	if (key.keyCode == 87)
	{
		moveUp(current_location_x, current_location_y);
	}
	
	if (key.keyCode == 65)
	{
		moveLeft(current_location_x, current_location_y);
	}
	
	if (key.keyCode == 83)
	{
		moveDown(current_location_x, current_location_y);
	}
	
	if (key.keyCode == 68)
	{
		moveRight(current_location_x, current_location_y);
	}
}

/*
setInterval(function(){
	//moveDown(current_location_x, current_location_y);
	//moveUp(current_location_x, current_location_y);
	//moveRight(current_location_x, current_location_y);
	moveLeft(current_location_x, current_location_y);
}, 3000);
*/


document.addEventListener("keydown", keyPress);
placeBug();

function animate()
{
	requestAnimationFrame(animate);
	//bird.rotation += 0.1;
	bugCollected();
	renderer.render(stage);
}
animate();
