import React,{useEffect} from 'react'
import Car from './car.png'
import Mark from './mark.svg'
import ImageMapper from 'react-image-mapper';
import Area from './area.json'

const Mapper = () => {
    



    
    // Map sprite
    var mapSprite = new Image();
    mapSprite.src = `${Car}`;

    



    // Create a basic class which will be used to create a marker
    let Marker = function () {
        this.Sprite = new Image();
        this.Sprite.src = `${Mark}`
        this.Width = 12;
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
        // Get corrent mouse coords
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
        // Clear Canvas
        // context.fillStyle = "#000";
        // context.fillRect(0, 0, canvas.width, canvas.height);
        let c = document.querySelector('canvas')
        let context = c.getContext('2d')


        // Draw map
        // Sprite, X location, Y location, Image width, Image height
        // You can leave the image height and width off, if you do it will draw the image at default size
        context.drawImage(mapSprite, 0, 0, mapSprite.width, mapSprite.height);

        // Draw markers
        for (var i = 0; i < Markers.length; i++) {
            var tempMarker = Markers[i];
            // Draw marker
            context.drawImage(tempMarker.Sprite, tempMarker.XPos, tempMarker.YPos, tempMarker.Width, tempMarker.Height);

        }
    };

    
    setInterval(main, (1000 / 60)); // Refresh 60 times a second

    const mapperRef = React.useRef(null);   
    const MAP = {
        name: 'Canvas',
        areas: Area,
    };

    

    


    
    const clickedOutside = (e) =>{
        console.log({x:e.pageX,y:e.pageY})
    }

    
    
    return (
        <>      
            <div style={{position:'absolute',zIndex:'1'}} >
                <ImageMapper
                    src={Car}
                    width={616}
                    map={MAP}
                    containerRef={mapperRef} 
                    onClick={(area,index,event)=>mouseClicked(area,index,event)}  
                /> 
            </div>
            
        

            

        </>
    )

}

export default Mapper