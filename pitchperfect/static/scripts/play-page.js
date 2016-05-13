sheet={
    
}
sheet.Clef={
    BASS:0,
    TREBLE:1
}

sheet.Format={
    SHEET:0,
    TABLATURE:1
}

noteOrder=["A", "A#", "B", "C", "C#", "D", "D#", "E", "E#", "F", "F#", "G", "G#"];
for(var i=0; i<13; i++)
    noteOrder.splice(0, i, noteOrder[i]+"m");

zephyrSong={
    1.25:{3:.25}, 1:{8:.25}, 1.5:{3:.25}
}

var sheetRequest=new XMLHttpRequest();//Sheet namespace

function getScoreSheet(id){
    sheetRequest.onreadystatechange=function(){
        console.log(sheetRequest.readyState);
        console.log(sheetRequest.status);
        if(sheetRequest.readyState==4 && sheetRequest.status==200)
            console.log("DDD: "+sheetRequest.responseText);
    };
    sheetRequest.open("GET", "/sheets/%s.json".replace("%s", (id)), true);
    sheetRequest.send();
}

function loadScoreSheet(sheet){
    
}


$(document).ready(function(){
    var canvas=$("#sheet-area");
    var seekSlider=$("#seek-selector");
    var seekField=$("#seek-field");
    var canvasElement=canvas.get(0);
    var context=canvasElement.getContext("2d");
    var contentFormat=sheet.Format.TABLATURE//SHEET;
    //canvasElement.width=canvas.width();
    canvasElement.height=150;
    var y;
    var gClef=new Image();
    gClef.src="/static/images/score/GClef.svg";
    var semibreve=new Image();
    semibreve.src="/static/images/score/Daman_semibreve.svg";
    var totalResources=2//40;
    var resourcesLoaded=0;
    var aboveText=new Text("0%");
    var textGradient=context.createLinearGradient(0, 0, canvasElement.width, canvasElement.height);
    var duration=233;//Per Song
    var dWidth=40;
    var timePassed=0;
    seekSlider.attr("max", duration);
    textGradient.addColorStop(0, "black");
    textGradient.addColorStop(1, "orange");
    context.strokeStyle=textGradient;
    gClef.addEventListener("load", function(){resourcesLoaded++;})
    semibreve.addEventListener("load", function(){resourcesLoaded++;})
    function resetDefaults(){
        context.setTransform(1, 0, 0, 1, 0, 0);
        
    }
    function updateTablature(){
        for(var i=0;i<6;i++){
            y=(canvas.height()/25)*i+15;
            context.fillRect(0, y, canvas.width(), canvasElement.height/175);
        }
    }
    function updateSheet(sheet, position){
        /* Update the score sheet to based on position for notes, clef and signature should stay the same for every song.*/
        context.strokeStyle="white";
        //dWidth=duration-
        if(dWidth>-100){
            context.fillRect(50+dWidth, 0, 1, canvas.height());
            context.fill();
            context.font="75px Allegretto";
            context.fillText("4", dWidth, 75);
            context.fillText("4", dWidth, 135);
            //context.strokeStyle="black";
            context.drawImage(gClef, dWidth-40, 0, 45, 150);
            dWidth--;
        }
        for(var i=0;i<10;i++){
            y=(canvas.height()/52.5)*i+15;
            if(i%2)
                context.fillRect(0, y, canvas.width(), canvasElement.height/175);
            for(var line in zephyrSong){
                if(line.indexOf(i)!=-1)
                    console.log("E");
            }
            switch(i){
            case 1:
                context.drawImage(semibreve, 50, y-5, 15, 12.5);
                break;
            case 2:
                context.drawImage(semibreve, 100, y-5, 15, 12.5);
                context.drawImage(semibreve, 150, y-5, 15, 12.5);
                break;
            default:
                if(Math.random()>.5)
                    context.drawImage(semibreve, 100, y-5, 15, 12.5);
            }
            context.fill();
        }
    }
    window.setInterval(function(){
        if(totalResources>=resourcesLoaded)
            resourcesLoaded++;
        context.clearRect(0, 0, canvasElement.width, canvasElement.height);
        if(totalResources<=resourcesLoaded && contentFormat==sheet.Format.SHEET)
            updateSheet(sheet.Clef.BASS);
        else if(totalResources<=resourcesLoaded && contentFormat==sheet.Format.TABLATURE)
            updateTablature();
        else{
            context.font="25px Arial";
            aboveText=parseInt((resourcesLoaded/totalResources)*10000)/100+"%";
            //context.rect(0, 0, 50, 50);
            context.fillText(aboveText, canvasElement.width*.5-context.measureText(aboveText).width*.5, canvasElement.height*.5);
            //context.fill();
            context.stroke();
        }
    }, 100);
    /*Field*/seekSlider.change(function(){
        var val=seekSlider.val();
        console.log(seekSlider.val());
        var minutes=parseInt(val/60).toString();
        var seconds=val%60;
        minutes=(minutes.length==1 ? "0" : "")+minutes
        console.log(minutes+":"+seconds);
        seekField.attr("value", "00:"+minutes+":"+seconds);
    });
        getScoreSheet("rsfdwed32342wdfesad");
});


