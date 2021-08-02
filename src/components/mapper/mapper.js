import React,{useEffect} from 'react'
import Car from './car.png'
import Mark from './mark.svg'
import ImageMapper from 'react-image-mapper';
import Area from './area.json'
import Users from '../table/User/index'


const Mapper = () => {
    // Map sprite
    var mapSprite = new Image();
    mapSprite.src = `${Car}`;

    // Create a basic class which will be used to create a marker
    let Marker = function () {
        this.Sprite = new Image();
        this.Sprite.src = `${Mark}`
        this.Width = 10;
        this.Height = 15;
        this.XPos = 0;
        this.YPos = 0;
    }

    // Array of markers
    var Markers = new Array();

    // When the user clicks their mouse on our canvas run this code
    var mouseClicked = function (area,index,mouse) {
        console.log("area",area)
        let c = document.querySelector('canvas')
        // Get current mouse coords
        var rect = c.getBoundingClientRect();
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

        let c = document.querySelector('canvas')
        let context = c.getContext('2d')

        // Draw markers
        for (var i = 0; i < Markers.length; i++) {
            var tempMarker = Markers[i];
            // Draw marker
            context.drawImage(tempMarker.Sprite, tempMarker.XPos, tempMarker.YPos, tempMarker.Width, tempMarker.Height);

        }
    };

    
    setInterval(main, (1000 / 60)); // Refresh 60 times a second
    const MAP = {
        name: 'Canvas',
        areas: Area,
    };
    
    return (
        <>  
            {/* <Users/> */}
            <ImageMapper
                src={Car}
                width={616}
                map={MAP}
                onClick={(area,index,event)=>mouseClicked(area,index,event)}  
            /> 
        </>
    )

}

export default Mapper