// The topic troughout all my sketches is Color Overlap. I tried to achieve interesting shapes and patterns trough overlapping colours which would mix and create different colors, thus creating a varity of shapes. In this phasing sketch, I tried to achieve a hypnotic/psychedelic piece. I started with a simple leg of rectangles rotating around, which I incresed to 3 legs. Each leg consists of 200 squares increasing in size and slowing down from center to border. Each leg has a different color by 120 degrees of the color wheel and the saturation changes from inside to the outside. The background color also changes with use of modulo to create many different forms of mixing colors, which take a while to repeat.

var rectangles;
var rotation;
var x;
var y;
var speed;
var length;
var backgroundColor

function setup()
{
	createCanvas(500,500);
	backgroundColor = 0;
	background(backgroundColor,80,80);
	//Create Rectangles Array
	rectangles = [[],[],[]];
	// Fill the array
	// 3 Legs
	for(var j=0; j<3; j++)
	{
		//Rectangles per leg
		for (var i = 0; i<200;i++)
		{
			
			length = 2 + i//Dimension of the rectanles
			y = i*1.5; // Vertical Position of the rectangles
			rotation = 0 + j*TWO_PI/3; // Initial Rotation
			rectangles[j].push({y: y, rotation: rotation, length: length});
		}	
	}	
}

function draw()
{
	// Background Color
	colorMode(HSB); // Set Colormode
	background(backgroundColor,80,80); // Refresh background with new color
	backgroundColor = (backgroundColor + 0.1)%360; // Get a different hue
	
	//Put Reference Point to the middle of the Canvas
	translate(width/2,height/2);
	
	
    //Draw the rectangles
	for(var j = 0; j< rectangles.length; j++)
	{
		for(var i=0;i<rectangles[j].length; i++)
		{
			//Colors and Lines	
			fill((23+(j*120))%360,20 + i/2,100,0.05);
			noStroke();
			
			//Rotate the Square
			push();
			// Draw the rectangle
			x = 0 - rectangles[j][i].length/2; // Center rectangle on it's axis
			rotate(rectangles[j][i].rotation); // Rotate the square to it's position
			rect(x,rectangles[j][i].y,rectangles[j][i].length);
			//Update Rotation of the square.
			rectangles[j][i].rotation = rectangles[j][i].rotation + (rectangles[j].length-i)* 0.0005;	
			pop();
		}	
	}	
}