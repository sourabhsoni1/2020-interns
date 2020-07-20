
let Data;
function getFile()
{

    var init = {
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            },
            mode:'cors',
            cache:'default'
        };
        let request = new Request("./visualisation.json",init);

    fetch(request).then(function(resp){
        return resp.json();
    })
    .then(function(data){
        console.log(data);
        const entries = Object.entries(data);

		var keys = []; //dates
		var values = []; //inr values
		for(var key in data) 
			keys.push(key);

		for(var i=0;i<keys.length;i++)
		    values.push(data[keys[i]]);
		            
		//finding min and max values
		var min=values[0];
		var max=values[0];

		for(let i=1;i<values.length;i++)
		{
		    if(values[i] < min)
		        min = values[i];
		    else if(values[i] > max)
		        max = values[i];
		}

		 min = min.toFixed(2);
		 max = max.toFixed(2);

		//const yAxis = 10;
		var yScale = (max-min)/10;
		yScale = yScale.toFixed(2);


		let canvas = document.querySelector('canvas');
		canvas.width = 1000;
		canvas.height = 600;

		let ctx = canvas.getContext('2d');

		let xGrid = 10;
		let yGrid = 10;
		let cellSize = 10;

		// Drawing the grid
		function drawGrids()
		{
			ctx.beginPath();

			while(xGrid < canvas.height)
			{
				ctx.moveTo(0,xGrid);
				ctx.lineTo(canvas.width,xGrid);
				xGrid+=cellSize;
			}

			while(yGrid < canvas.width)
			{
				ctx.moveTo(yGrid,0);
				ctx.lineTo(yGrid,canvas.height);
				yGrid+=cellSize;
			}

			ctx.strokeStyle = "lightgray";
			ctx.stroke();
		}

		function blocks(count)
		{
			return count*cellSize;
		}

		//Drawing the axis
		function drawAxis()
		{
			let temp = 0;
			let yPlot = 50;
			ctx.beginPath();
			ctx.strokeStyle = "black";
			ctx.moveTo(blocks(5),blocks(5));
			//drawing Y-Axis
			ctx.lineTo(blocks(5),blocks(50));
			//drawing X-Axis
			ctx.lineTo(blocks(90),blocks(50));	
			//moving pointer to (0,0)
			ctx.moveTo(blocks(5),blocks(50));
			//printing values on y axis
			for(let i=0 ; i<values.length ; i++)
			{
				if(parseFloat(temp) > parseFloat(max + yScale))
					break;
				ctx.strokeText(parseFloat(temp) , blocks(2), blocks(yPlot));
				if(temp == 0)
				{
					temp = parseFloat(min);
					yPlot -= 4;
					continue; 
				}
				yPlot -= 4;
				temp =( parseFloat(temp) + parseFloat(yScale) ).toFixed(2);
			}

			ctx.stroke();
		}

		//Drawing the graph
		function drawChart()
		{
			var xPlot = 8;
			const gridValue = 4;

			ctx.beginPath();
			ctx.strokeStyle = "black";
			ctx.moveTo(blocks(5),blocks(50));

			for(const [dates,inr] of entries)
			{
				var units = parseFloat(inr-min)/yScale;
				ctx.strokeStyle="blue"
				ctx.strokeText(dates,blocks(xPlot),blocks(46 - gridValue*units -1));
		        ctx.strokeStyle="black";
		        ctx.lineTo(blocks(xPlot),blocks(46 - gridValue*units));
		        ctx.arc(blocks(xPlot),blocks(46 - gridValue*units),2,0,Math.PI*2,true);
		        xPlot+=3;
			}

			ctx.stroke();
		}

		// labeling X-Axis
		function xLabel()
		{
			ctx.beginPath();
			ctx.strokeStyle ="black";
		    ctx.moveTo(blocks(45),blocks(52));
		    ctx.strokeText("<--- DATES ---->",blocks(45),blocks(52));
		    ctx.stroke();
		}

		// labeling Y-Axis
		function yLabel()
		{
			ctx.beginPath();
			ctx.strokeStyle ="black";
		    ctx.moveTo(blocks(4),blocks(4));
		    ctx.strokeText("CURRENCY",blocks(4),blocks(4));
		    ctx.stroke();
		}

		//Calling Functions
		drawGrids();
		drawAxis();
		drawChart();
		xLabel();
		yLabel();

        });
        }
            
getFile();