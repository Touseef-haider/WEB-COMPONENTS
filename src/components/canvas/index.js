import React, { useEffect, useRef } from 'react'
import Car from './car.png'
import Mark from './mark.svg'


const Map = () =>{
    var canvasRef = useRef(null)
    var canvas;
    var context;
    useEffect(()=>{
        canvas= canvasRef.current;
        context = canvas.getContext('2d')

    },[])


    
    // Map sprite
    var mapSprite = new Image();
    mapSprite.src = `${Car}`;


    // Create a basic class which will be used to create a marker
    let Marker = function () {
        this.Sprite = new Image();
        this.Sprite.src = `${Mark}`
        this.Width = 12;
        this.Height = 20;
        this.XPos = 0;
        this.YPos = 0;
    }

    // Array of markers
    var Markers = new Array();

    // When the user clicks their mouse on our canvas run this code
    var mouseClicked = function (mouse) {
        console.log(mouse)
        // Get corrent mouse coords
        var rect = canvas.getBoundingClientRect();
        var mouseXPos = (mouse.pageX - rect.left);
        var mouseYPos = (mouse.pageY - rect.top);

        // Move the marker when placed to a better location
        var marker = new Marker();
        marker.XPos = mouseXPos - (marker.Width / 2);
        marker.YPos = mouseYPos - marker.Height;

        // Push our new marker to our Markers array
        Markers.push(marker);
    }

    
    // This will be called 60 times a second, look at the code at the bottom `setInterval`
    var main = function () {
        // Update our canvas
        draw();
    };


    var draw = function () {
        // Clear Canvas
        context.fillStyle = "#000";
        context.fillRect(0, 0, canvas.width, canvas.height);

        // Draw map
        // Sprite, X location, Y location, Image width, Image height
        // You can leave the image height and width off, if you do it will draw the image at default size
        context.drawImage(mapSprite, 0, 0, 700, 700);

        // Draw markers
        for (var i = 0; i < Markers.length; i++) {
            var tempMarker = Markers[i];
            // Draw marker
            context.drawImage(tempMarker.Sprite, tempMarker.XPos, tempMarker.YPos, tempMarker.Width, tempMarker.Height);

            // Calculate position text
            var markerText = "";

            // Draw a simple box so you can see the position
            var textMeasurements = context.measureText(markerText);
            context.fillStyle = "#666";
            context.globalAlpha = 0.7;
            context.fillRect(tempMarker.XPos - (textMeasurements.width / 2), tempMarker.YPos - 15, textMeasurements.width, 20);
            context.globalAlpha = 1;

            // Draw position above
            context.fillStyle = "#000";
            context.fillText(markerText, tempMarker.XPos, tempMarker.YPos);
        }
    };

    
    setInterval(main, (1000 / 60)); // Refresh 60 times a second
    return(
        <>        
            <canvas     id="Canvas" ref={canvasRef} onMouseDown={mouseClicked} width="700" height="700"></canvas>
        </>
    )
}

export default Map