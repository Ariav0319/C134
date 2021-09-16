img = "";
var status1 = "";
objects = [];
function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
    objectDetector = ml5.objectDetector('CocoSsd',modelLoaded);
    document.getElementById("status").innerHTML = "status: detecting objects";
}
function preload(){
}
function gotResults(error, results) {
    if(error){
        console.log("error");
    } else{
    console.log(results);
    object = results;
    }
}
function draw() {
    image(video, 0, 0, 380, 380);

    if(status1 != "") {
        objectDetector.detect(video,gotResults);
        r = random(255);
        g = random(255);
        b = random(255);
        for(i=0; i<objects.length; i++){
            document.getElementById("status").innerHTML = "status: object detected";
            document.getElementById("numberOfObjects").innerHTML = "Number of Obejects Detected are:" + objects.length;
            fill(r, g, b);
            percent = floor(objects[i].confidence *100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}
function modelLoaded() {
    console.log("modelLoaded!");
    status1 = true;
}
