// Topic: Noise by Laurent Klein 2021
// As I was watching through the course material and even extended Material, I was thinking about how to use the noise. I had difficulties to always implement noise into my drawings.
// That's why I got inspired by the Coding Train on youtube to create my own Noise Generator Constructor function. I move through the Noise in a circle, to be able to do proper loops and would
// assign random positioning within the noise but having control of the radius and the output of my Generator. This made everything a lot easier to get noise implemented where I needed it.
// Next, I challenged myself to create my own noisy version of interpolation. After I had the first version I tried to write my name in Japanese  on the screen, which in the end was really 
// boring, but I found the aestetic with the colors and the white circles. I started playing around with it and created a new constructor functions for cells and have them move with noise over
// the screen. To make it more interesting I created one origin cell which would be the center of the piece and all the lines would go to that. During this version, it still felt a bit 
// too uninteresting. I added then as a last step the chance calculation so that not all cells would be connected to the origin cell all the time but so that it would change over time. 
var lineInput;
var input;
var cellNum
var cells;
var originCell;
var lines;
function setup()
{
	createCanvas(500,500);
	frameRate(30);
	//Initialize Variables
	input=0;
	lineInput = 0;
	cellNum = 20;
	cells = [];
	lines = [];
	
	//Create Cells
	originCell = new Cell(width/8,height/8); // Main  Cell
	for(var i = 0; i < cellNum; i++) // Noisy Cells
	{
		cells.push(new Cell());		
	}
	//Create Lines between cells
	for(var i = 0; i < cells.length;i++)
	{		
		let originVector = createVector(originCell._x,originCell._y);
		let currentVector = createVector(cells[i]._x,cells[i]._y);
		lines.push(new NoisyLine(
			currentVector,
			originVector,
			random(5,20),
			50,
			floor(random(1,6)),
			0));
	}
}
function draw()
{
	//Formatting
	background(0);
	
	//Cell Management
	for(var i = 0; i < cells.length; i++)
	{
		// Update Cell Position
		cells[i]._update(input);		
		// Draw lines if cell is determined as "on"
		if(cells[i]._state == "on")
		{
			// Feed updated Positions of Cells connected to the lines
			let originVector = createVector(originCell._x,originCell._y);
			let currentVector = createVector(cells[i]._x,cells[i]._y);
			lines[i]._update(currentVector,originVector);
			// Draw the lines
			lines[i]._draw(lineInput);
		}
		//Draw Cells	
		cells[i]._draw();		
	}
	//Update and draw origin Cell
	originCell._originUpdate(input);
	originCell._draw();
	// Input increment
	input+= 0.001;
	lineInput += 0.0003;
}

function NoisyLine(vector1,vector2,amp,steps,lineAmt,rotationAngle)
{
	//Inputs
	this._v1 = vector1;
	this._v2 = vector2;
	this._amp = amp;
	this._lineAmt = lineAmt;
	this._rotationAngle = rotationAngle;
	// direction from v1 to v2
	this._v3 = p5.Vector.sub(this._v2,this._v1);
	// define steps
	if(steps === undefined || steps === 0)
	{
		this._steps = this._v3.mag();
	}
	else
	{
		this._steps = steps;
	};

	//Create Noise Generator for every Line
	this._lerpNoise =[];
	this._colorNoise = [];
	for(var i = 0; i < this._lineAmt; i++)
	{
		this._lerpNoise.push(new NoiseGenerator(this._v3.mag(),-this._amp,this._amp));
		this._colorNoise.push(new NoiseGenerator(random(1,360),-100,460));
	}	

	this._update = function(vector1,vector2)
	{
		// update vectors to keep track of moving cells
		this._v1 = vector1;
		this._v2 = vector2;
		this._v3 = p5.Vector.sub(this._v2,this._v1);
	}

	this._draw = function(angle)
	{
		//Loop through all lines lines
		for(var j = 0; j < this._lerpNoise.length;j++)
		{
			//Save Starting Point in variable
			let drawingVector = this._v1.copy();
			//Save Direction Vector in variable
			let directionVector = this._v3.copy();
			//correct magnitude to fit the amount of steps
			directionVector.div(this._steps);
			//Create perpendicular Unit Vector for Noise offset
			let perpenVector = createVector(-directionVector.y,directionVector.x);
			perpenVector.normalize();
			// Formatting
			noFill();
			let hue = this._colorNoise[j]._getNoise(angle);
			stroke(hue,80,80);
			//Draw Shapes
			beginShape();
			// First Point
			curveVertex(this._v1.x,this._v1.y);
			// Noisy Points
			for(var i = 0; i< this._steps; i++)
			{			
				//add Noise to perpendicular Vector
				perpenVector.mult(this._lerpNoise[j]._getNoise(angle,i));
				// add perpendicular Vector to the point to be drawn
				drawingVector.add(perpenVector);
				// Draw Point
				curveVertex(drawingVector.x,drawingVector.y);
				// Subtract Noise
				drawingVector.sub(perpenVector);
				perpenVector.div(this._lerpNoise[j]._getNoise(angle,i));
				//Move towards direction
				drawingVector.add(directionVector);
				//curve
				drawingVector.rotate(this._rotationAngle);			
			}
			// Last Point
			curveVertex(this._v2.x,this._v2.y);
			endShape();
		}
	}
};

function NoiseGenerator(radius,min,max)
{
	// Set variables
	// Random Position in 2D Noise
	this._centerX = random(1000); 
	this._centerY = random(1000);
	//Radius of the circle movement through the Noise
	this._radius = radius;
	// mapping values
	this._min = min;
	this._max = max;

	this._getNoise = function(angle,phase)
	{
		// Saftey for phase
		if(phase === undefined){phase = 0};
		// circle movement through noise
		let x = map(cos(angle+phase),-1,1,this._centerX - this._radius, this._centerX + this._radius);
		let y = map(sin(angle+phase),-1,1,this._centerX - this._radius, this._centerX + this._radius);
		let n = noise(x,y);
		// map values to the min and max
		let output = map(n,0,1,this._min,this._max);
		return output;
	}
}

function Cell(x,y)
{	
	// if no Input use random values for x and y position
	if(x === undefined)
	{
		this._x = random(0,width);
	}
	else
	{
		this._x = x;
	}
	if(y === undefined)
	{
		this._y = random(0,height);
	}
	else
	{
		this._y = y;
	}
	
	// set variables and create Noise Generators
	this._state = "off";
	this._radius = random(5,25);
	this._noiseX = new NoiseGenerator(10,-5,5);
	this._noiseY = new NoiseGenerator(10,-5,5);

	this._update = function(angle)
	{	
		// Timer
		// since max 30fps ever 2 seconds set the state randomly of cell
		if(frameCount%60 == 0)
		{
			let r = random();
			if(r < 0.2)
			{
				this._state = "on";
			}
			else
			{
				this._state = "off";
			}
		}
		
		// X Coordinate update with noise values
		this._x += this._noiseX._getNoise(angle);
		// Protection of going off screen
		if(this._x <= 0 - this._radius){this._x = width + this._radius}
		else if(this._x >= width + this._radius){this._x = 0 - this._radius}
		//Y Coordinate update with noise values
		this._y += this._noiseY._getNoise(angle);
		// Protection of going off screen
		if(this._y <= 0 - this._radius){this._y = height + this._radius}
		else if(this._y >= height + this._radius){this._y = 0 - this._radius}
	};

	this._originUpdate = function(angle)
	{
		let direction;

		//Top Horizontal Movement
		if(this._y <= height/8 && this._x < width * 7/8)
		{
			direction = "right";	
		}
		// Right Vertical Movement
		else if(this._y < height* 7/8 && this._x >= width*7/8)
		{
			direction = "down";	
		}
		//Bottom Horizontal Movement
		else if(this._y >= height * 7/8 && this._x > width/8)
		{
			direction = "left";	
		}
		//Left Vertical Movement
		else if(this._y > height/8 && this._x <= width/8)
		{
			direction = "up";	
		};
		//State Machine increment values depending on state
		switch(direction)
		{
			case "right":
				this._x += 2;
				this._y = height/8 - abs((this._noiseY._getNoise(angle)*10));
			break;
			case "left":
				this._x -= 2;
				this._y = height*7/8 + abs((this._noiseY._getNoise(angle)*10));
			break;
			case "down":
				this._y += 2;
				this._x = width*7/8 + abs((this._noiseX._getNoise(angle)*10));
			break;
			case "up":
				this._y -= 2;
				this._x = width/8 - abs((this._noiseX._getNoise(angle)*10));
			break;
		}
	};
	this._draw = function()
	{
		//Formatting
		fill(0);
		stroke(255);
		strokeWeight(1);
		//Draw Ellipse
		ellipse(this._x,this._y,this._radius*2);		
	};
};