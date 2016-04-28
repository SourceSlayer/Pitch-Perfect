sheet={
    
}
sheet.Clef={
    BASS:0,
    TREBLE:1
}

function getScoreSheet(id){
    
}


$(document).ready(function(){
    var canvas=$("#sheet-area");
    var canvasElement=canvas.get(0);
    var context=canvasElement.getContext("2d");
    canvasElement.width=canvas.width();
    canvasElement.height=canvas.height();
    var y;
    var gClef=new Image();
    gClef.src="/static/images/score/GClef.svg";
    var semibreve=new Image();
    semibreve.src="/static/images/score/Daman_semibreve.svg";
    var totalResources=40;
    var resourcesLoaded=0;
    var aboveText=new Text("0%");
    var textGradient=context.createLinearGradient(0, 0, canvasElement.width, canvasElement.height);
    textGradient.addColorStop(0, "black");
    textGradient.addColorStop(1, "orange");
    context.strokeStyle=textGradient;
    gClef.addEventListener("load", function(){resourcesLoaded++;})
    semibreve.addEventListener("load", function(){resourcesLoaded++;})
    function updateSheet(sheet, position){
        /* Update the score sheet to based on position for notes, clef and signature should stay the same for every song.*/
        //context.strokeStyle="blue";
        context.rect(50, 0, 1, canvas.height());
        context.fill();
        //context.strokeStyle="black";
        context.drawImage(gClef, 0, 0, 45, 150);
        for(var i=0;i<10;i++){
            y=(canvas.height()/52.5)*i+15;
            if(i%2){
                context.rect(0, y, canvas.width(), canvasElement.height/175);
            }
            if(i==1)
                context.drawImage(semibreve, 50, y-5, 15, 12.5);
            console.log(i%2);
            context.fill();
        }
    }
    window.setInterval(function(){
    if(totalResources>=resourcesLoaded)
        resourcesLoaded++;
    console.log("DS");
        context.clearRect(0, 0, canvasElement.width, canvasElement.height);
        if(totalResources<=resourcesLoaded)
            updateSheet(sheet.Clef.BASS);
        else{
            console.log("SD");
            context.font="25px Arial";
            aboveText=parseInt((resourcesLoaded/totalResources)*10000)/100+"%";
            console.log(aboveText);
            //context.rect(0, 0, 50, 50);
            context.fillText(aboveText, canvasElement.width*.5-context.measureText(aboveText).width*.5, canvasElement.height*.5);
            //context.fill();
            console.log(canvas.width()-canvasElement.width+"@");
            context.stroke();
        }
    }, 100);
});
