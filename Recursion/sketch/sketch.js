// Topic: Recursion by Laurent Klein 2021
// I have started my exploration with a recursive tree, but I felt really uninspired in those drawings and as I went through the course material, I noticed that we mostly had examples of 
// recursion towards the outside of a shape. I thought about trying to draw a simple cube recursivly towards the inside of the shape. The idea came after seeing the Menger sponge. I decided on
// an isometric version of a cube since, it only requires 3 sides to draw. There was lot of math involved to find the right spots to draw the quads and to make them all connected to the
// given side length and of course make them look like a perfect cube. I gave the sides the 3 different RGB colours and started to play around with positioning of the recursive element.
// I decided to have the side length be my exit condition and placed new cubes all over the shape. I managed to place all recursively called cubes in interesting places, but the drawing was 
// still too perfect. I came up with the idea of randomly not drawing a side, and thought it would result in interesting patterns and it did. I implemented a counter and a chance calculation,
// with a decreasing likelyhood of a side being drawn. At the end, I played more with the colours and adjusted those. The end result reminded me a lot of a rubik's cube, which was one of my
// favorite toys as a child.

function setup()
{
	createCanvas(500,500);
	background(0);
	colorMode(HSB);
	// Call recursive function
	DrawCube(width/2,height/2,200,0)	
}

function DrawCube(x,y,length,counter)
{
	//calculate change of a side being drawn
	//chance decreasing as deeper we go.
	let chance = 1 - counter*0.25;

	// get random number
	let a = random();
	let b = random();
	let c = random();

	// draw sides 
	if(a < chance)
	{
		//Left side
		createSideA(x,y,length);
	};
	if(b<chance)
	{
		//right side
		createSideB(x,y,length);
	};
	if(c<chance)
	{
		//top side
		createSideC(x,y,length);
	};
	//increase counter by 1
	counter += 1;
	
	// exit condition of the side length
	if(length > 10)
	{
		// Big Cubes
		DrawCube(x-(length/2*sqrt(3)/2),y+length/4,length/2,counter);			
		DrawCube(x+(length/2*sqrt(3)/2),y+length/4,length/2,counter);			
		DrawCube(x,y-length/2,length/2,counter);
		//Medium Cubes
		DrawCube(x-(length/2*sqrt(3)*3/4),y-length*3/8,length/4,counter);
		DrawCube(x-(length/2*sqrt(3)*3/4),y+length*3/8,length/4,counter);
		DrawCube(x+(length/2*sqrt(3)*3/4),y-length*3/8,length/4,counter);
		DrawCube(x+(length/2*sqrt(3)*3/4),y+length*3/8,length/4,counter);
		DrawCube(x,y-length*3/4,length/4,counter);
		DrawCube(x,y+length*3/4,length/4,counter);
	}
		
}
// draw left side of the cube
function createSideA(x,y,length)
{
	noStroke();
	let saturation = map(x,0,width,50,80);
	let brightness = map(y,0,height,50,80);
	
	fill(359,saturation,brightness);
	quad(x,y,
		x,y+length,
		x-cos(radians(30))*length,y+length-sin(radians(30))*length,
		x-cos(radians(30))*length,y-sin(radians(30))*length);
}

//draw right side of the cube
function createSideB(x,y,length)
{
	noStroke();
	let saturation = map(y,0,width,40,70);
	let brightness = map(x,0,height,43,83);
	fill(123,saturation,brightness);
	quad(x,y,
		x,y+length,
		x+cos(radians(30))*length,y+length-sin(radians(30))*length,
		x+cos(radians(30))*length,y-sin(radians(30))*length);
}
//draw top side of the cube
function createSideC(x,y,length)
{
	noStroke();
	let saturation = map(x*y/2,0,width,24,64);
	let brightness = map(x*y/2,0,height,40,100);
	fill(226,44,70);
	quad(x,y,
		x+cos(radians(30))*length,y-sin(radians(30))*length,
		x,y-length,
		x-cos(radians(30))*length,y-sin(radians(30))*length);		
}