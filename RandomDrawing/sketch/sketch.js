// The topic troughout all my sketches is Color Overlap. I tried to achieve interesting shapes and patterns trough overlapping colours which would mix and create different colors, thus creating a varity of shapes. In this random sketch, I started from the examples we have seen while learning about bias. I used if functions to randomly decide between directions of bias. The initial dots reminded me of old rgb television screens, so i went with the red green blue values, which I also decided on randomly. As I felt I was on the right track, I changed the dots to ellipses as an experiment and I ended up with the early version of this sketch. Since I liked it a lot, I continued to adjust color brightness to make the colors pop out more and added random ammounts of coloumns and rows between 20 and 35, which increases the randomness between every page refresh.

var rowNumber;
var columnNumber;
var rectWidth;
var rectHeight;
var pointNumber;

function setup()
{
	createCanvas(500,500);
	
	//Formatting
	background(0);
	fill(150,0,100);
	stroke(255);
	colorMode(HSB);
	
	//Variable Initialisation
	rowNumber = floor(random(20,35));
	columnNumber = floor(random(20,35));
	rectWidth = width/rowNumber;
	rectHeight = height/columnNumber;
	//Call funtion
	drawPattern();
}

function drawPattern()
{
	// Loop to go trough Rows of Squares
	for(var i = 0; i<rowNumber; i++)
	{
		//Loop to go trough Columns
		for(var j = 0; j<columnNumber; j++)
		{
			//Dots per Square
			pointNumber = random(200,1000);
			// Generate a new number per square
			let r = random();
			let powerNumber = map(r,0,1,2,10);
			// Draw dots
			for(var k = 0; k < pointNumber; k++)
			{
				//Color Management
				let rHue = random()
				noStroke();
				if(rHue>0.6)
				{
					fill(0,80,90,0.3);
					
				}
				else if (rHue>0.3)
				{
					fill(120,80,90,0.3);
					
				}
				else
				{
					fill(240,80,90,0.3);
					
				}
				//Generate new Number for Positoning
				let randomX = random();
				let randomY = random();
				//randomly Choose which Bias to use in a square			
				if(r>0.875)
				{
					//Bias Bottom Right
					randomX = pow(randomX,powerNumber);
					randomY = pow(randomY,powerNumber);
				}
				else if(r>0.750)
				{
					//Bias Bottom left
					randomX =  1 - pow(randomX,powerNumber);
					randomY = pow(randomY,powerNumber);
				}
				else if(r>0.625)
				{
					//Bias Top Right
					randomX = pow(randomX,powerNumber);
					randomY = 1 - pow(randomY,powerNumber);
				}
				else if(r>0.500)
				{
					//Bias Top Left
					randomX = 1 - pow(randomX,powerNumber);
					randomY = 1 -pow(randomY,powerNumber);
				}
				else if(r>0.375)
				{
					//Bias Top
					randomY = 1 -pow(randomY,powerNumber);
				}
				else if(r>0.250)
				{
					//Bias Bottom
					randomY = pow(randomY,powerNumber);
				}
				else if(r>0.125)
				{
					//Bias Left
					randomX = 1 -pow(randomX,powerNumber);
				}
				else
				{
					//Bias Right
					randomX = pow(randomX,powerNumber);
				}
				
				//Map onto limits of square
				let pointX = map(randomX,0,1,0+i*rectWidth,(0+i*rectWidth)+rectWidth);
				let pointY = map(randomY,0,1,0+j*rectHeight,(0+j*rectHeight)+rectHeight);
				
				//Draw point
				ellipse(pointX,pointY,floor(random(15,30)));	
			}
		}	 
	}	
}