let btn = document.getElementById("start_btn");
let btnCreate = document.getElementById("create_points");

let rgbMode = document.querySelector(".checkbox");
console.dir(rgbMode);

let coordinatsOfRec = [[],[],[]];

let incrementOfnewPoints = 0;

btn.onclick = function action()
{   
    // Отчистка svg  

    let elem = document.querySelector('.svg_Class');
    function clear(elem) {
        elem.innerHTML = '<path id = "basic_rectangle" d="M 0 0 L 300 0 L 0 0 z" fill="#86A68D" stroke="#DCF2E1" stroke-width="1" />';
    }
    clear(elem);

    incrementOfnewPoints = 0;
    //

    let rectangle = document.getElementById("basic_rectangle");

    console.dir(rectangle);
    let pointsOfRectangle = [getRandomValues(), getRandomValues(), getRandomValues()];

    /*
    [0][0] x1   [0][1] y1
    [1][0] x2   [1][1] y2
    [2][0] x3   [2][1] y3
    */

    //DCF2E1
    //86A68D
    //A6767C

    let SOfrectangle = 0.5 * Math.abs((pointsOfRectangle[1][0]-pointsOfRectangle[0][0])*(pointsOfRectangle[2][1]-pointsOfRectangle[0][1]) - // плозадь треуг.
    (pointsOfRectangle[2][0]-pointsOfRectangle[0][0])*(pointsOfRectangle[1][1]-pointsOfRectangle[0][1]));

    console.log('S:',SOfrectangle);

    while (SOfrectangle < 40000){
        pointsOfRectangle = [getRandomValues(), getRandomValues(), getRandomValues()];
        SOfrectangle = areaOfRec(pointsOfRectangle[0][0],pointsOfRectangle[1][0],pointsOfRectangle[2][0],
        pointsOfRectangle[0][1],pointsOfRectangle[1][1],pointsOfRectangle[2][1]);
        
        console.log('new S:',SOfrectangle);
    }

    coordinatsOfRec[0][0] = pointsOfRectangle[0][0];
    coordinatsOfRec[0][1] = pointsOfRectangle[0][1];
    coordinatsOfRec[1][0] = pointsOfRectangle[1][0];
    coordinatsOfRec[1][1] = pointsOfRectangle[1][1];
    coordinatsOfRec[2][0] = pointsOfRectangle[2][0];
    coordinatsOfRec[2][1] = pointsOfRectangle[2][1];
    //console.log(rectangle.otherHTML);

    //attributes d value : "M 0 0 L 300 0 L 0 0 z"

    rectangle.attributes.d.value = `M ${pointsOfRectangle[0][0]} ${pointsOfRectangle[0][1]} 
    L ${pointsOfRectangle[1][0]} ${pointsOfRectangle[1][1]} 
    L ${pointsOfRectangle[2][0]} ${pointsOfRectangle[2][1]} z`;

    /*
    rectangle.outerHTML = `<path id=\"basic_rectangle\" d=\
    "M ${pointsOfRectangle[0][0]} ${pointsOfRectangle[0][1]} 
    L ${pointsOfRectangle[1][0]} ${pointsOfRectangle[1][1]} 
    L ${pointsOfRectangle[2][0]} ${pointsOfRectangle[2][1]} z\" 
    fill=\"#DCF2E1\" stroke=\"#86A68D\" stroke-width=\"1\"></path>`;
    */
    console.log(pointsOfRectangle);
}

let increment_of_class = 0;

btnCreate.onclick = function create_point(){

    increment_of_class++;

    let svg_Class = document.querySelector('.svg_Class');
    //container = document.getElementById("ContainerBox");
    let point = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    //newdiv = document.createElementNS("http://www.w3.org/1999/xhtml", "div");
    //txtnode = document.createTextNode("This is text that was constructed dynamically with createElementNS and createTextNode then inserted into the document using appendChild.");
    //newdiv.appendChild(txtnode);
    function generent_first_point () {
        pointsOfRectangle[0][0] 
    }

    let minXOfRec = Math.min(coordinatsOfRec[0][0],coordinatsOfRec[1][0],coordinatsOfRec[2][0]);    // МИНИМАЛЬНАЯ X ТРЕУГ
    let maxXOfRec = Math.max(coordinatsOfRec[0][0],coordinatsOfRec[1][0],coordinatsOfRec[2][0]);    // максимальная X
    let minYOfRec = Math.min(coordinatsOfRec[0][1],coordinatsOfRec[1][1],coordinatsOfRec[2][1]); 
    let maxYOfRec = Math.max(coordinatsOfRec[0][1],coordinatsOfRec[1][1],coordinatsOfRec[2][1]); 

    console.log('min:',minXOfRec);
    console.log('max:',maxXOfRec);
    console.log('min:',minYOfRec);
    console.log('max:',maxYOfRec);

    let cx;
    let cy;

    function create_cx_cy (){
        cx = Math.floor(Math.random() * 500 + 1);
        cy = Math.floor(Math.random() * 500 + 1);
    }

    while (!createPointIsTrue(cx, cy, coordinatsOfRec[0][0],coordinatsOfRec[1][0],coordinatsOfRec[2][0], coordinatsOfRec[0][1],coordinatsOfRec[1][1],coordinatsOfRec[2][1])) {
        create_cx_cy();
    }

    // сделать createPointIsTrue, передать ему все x и y, вернуть bool и если false, то повторить create_cx_cy

    console.log(createPointIsTrue(cx, cy, coordinatsOfRec[0][0],coordinatsOfRec[1][0],coordinatsOfRec[2][0], coordinatsOfRec[0][1],coordinatsOfRec[1][1],coordinatsOfRec[2][1]));
    
    // Создание основной точки и задание ей параметров 

    point.setAttributeNS(null, 'class', 'one-of-point');
    point.setAttributeNS(null, 'cx', `${cx}px`);
    point.setAttributeNS(null, 'cy', `${cy}px`);
    point.setAttributeNS(null, 'r', '2px');
    point.setAttributeNS(null, 'fill', '#664c4f' );
    
    svg_Class.appendChild(point);

    //
    creatingPoints(cx, cy, coordinatsOfRec[0][0],coordinatsOfRec[1][0],coordinatsOfRec[2][0], coordinatsOfRec[0][1],coordinatsOfRec[1][1],coordinatsOfRec[2][1]);

}

function creatingPoints (x0, y0, x1, x2, x3, y1, y2, y3) {

    let triangleVertices = [[x1, y1], [x2, y2], [x3, y3]];
        for (incrementOfnewPoints; incrementOfnewPoints < 5000; incrementOfnewPoints++){
        let nodeXY = arrayRandElement(triangleVertices); // nodeXY[0] - x; nodeXY[1] - y
            
        let minX;
        let maxX;
        let minY;
        let maxY; 

        if (nodeXY[0] < x0) {
            minX = nodeXY[0];
            maxX = x0;
        } else {
            minX = x0;
            maxX = nodeXY[0];
        }

        if (nodeXY[1] < y0) {
            minY = nodeXY[1];
            maxY = y0;
        } else {
            minY = y0;
            maxY = nodeXY[1];
        }

        let cx = minX + (maxX - minX)/2;
        let cy = minY + (maxY - minY)/2;

        x0 = cx;
        y0 = cy;

        setTimeout(createNewPoint, 1, cx, cy);
}

} 



function createNewPoint(cx, cy) {

    let svg_Class = document.querySelector('.svg_Class');
    let point = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    point.setAttributeNS(null, 'class', 'one-of-point');
    point.setAttributeNS(null, 'cx', `${cx}px`);
    point.setAttributeNS(null, 'cy', `${cy}px`);
    point.setAttributeNS(null, 'r', '2px');

    if (rgbMode.checked) 
    {
        let rand1 = Math.floor(Math.random() * 255 + 1);
        let rand2 = Math.floor(Math.random() * 255 + 1);
        let rand3 = Math.floor(Math.random() * 255 + 1);

        point.setAttributeNS(null, 'fill', `rgb(${rand1},${rand2},${rand3})` );
    }
    else {
            point.setAttributeNS(null, 'fill', 'black' );
        }

    svg_Class.appendChild(point);
}

function getRandomValues () {
    let x = Math.floor(Math.random() * 500 + 1);
    let y = Math.floor(Math.random() * 500 + 1);
    return [x, y];
}

function areaOfRec (x1, x2, x3, y1, y2, y3) {
    return 0.5 * Math.abs((x2 - x1) * (y3 - y1) - (x3 - x1) * (y2 - y1));
}

function createPointIsTrue (x0, y0, x1, x2, x3, y1, y2, y3) {
    let res1 = (x1 - x0) * (y2 - y1) - (x2 - x1) * (y1 - y0);
    let res2 = (x2 - x0) * (y3 - y2) - (x3 - x2) * (y2 - y0);
    let res3 = (x3 - x0) * (y1 - y3) - (x1 - x3) * (y3 - y0);
    let resComparison = ((res1 > 0) && (res2 > 0) && (res3 > 0)) || 
    ((res1 < 0) && (res2 < 0) && (res3 < 0));
    return resComparison;
}

function arrayRandElement(arr) {
    let rand = Math.floor(Math.random() * arr.length);
    return arr[rand];
}

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }


/*
document.getElementById('submit').onclick = function randomSum(min, max) {
    document.querySelector('.sum').innerHTML = Math.floor(Math.random() * (9000 - 200 + 1) ) + 200;
}
/*
//document.querySelector('#submit').onclick = function randomSum(min = 200, max = 9000) {
document.getElementById('submit').onclick = function randomSum(min, max) {
    document.querySelector('.sum').innerHTML = Math.floor(Math.random() * (9000 - 200 + 1) ) + 200;
    console.log(Math.floor(Math.random() * (max - min + 1) ) + min);
    console.log(min);
}
*/

//console.log(rectangle);
//rectangle.fill = "blue";
//console.log(rectangle);
//rectangle.onclick

   /*
    let point = document.createElementNS(svg_Class, 'circle');
    point.setAttributeNS(null, 'cx', '200px');
    point.setAttributeNS(null, 'cy', '300px');
    point.setAttributeNS(null, 'r', '2px');
    point.setAttributeNS(null, 'style', 'fill: none; stroke: blue; stroke-width: 1px;' );
    svg_Class.appendChild(point);
*/
    /*var svgns = "http://www.w3.org/2000/svg",
    container = document.getElementById( 'cont' );
for (var x = 0; x < 500; x += 50) {
    for (var y = 0; y < 300; y += 50) {
        var circle = document.createElementNS(svgns, 'circle');
        circle.setAttributeNS(null, 'cx', x);
        circle.setAttributeNS(null, 'cy', y);
        circle.setAttributeNS(null, 'r', 50);
        circle.setAttributeNS(null, 'style', 'fill: none; stroke: blue; stroke-width: 1px;' );
        container.appendChild(circle);
    }*/ 
/*
    btnCreate.onclick = function create_point(){

        increment_of_class++;
    
        let svg_Class = document.querySelector('.svg_Class');
    
        let useSVG = document.createElementNS('http://www.w3.org/2000/svg', 'use');
        
        document.body.insertAdjacentHTML("beforeend", 
        `<style>svg .one-of-point-${increment_of_class}{
            fill: #664c4f;
            animation: countdown 60s linear infinite forwards;
            cx: ${increment_of_class}px;
            cy: 50px;
            r: 2px;
        }
        </style>`);
    
        let point = document.createElement("circle");  //______ РАБОЧИЙ КОД
    
        point.className = `one-of-point-${increment_of_class}`;
                                          //______ НЕРАБОЧИЙ КОД(
        point.setAttribute('cx', '250px');
        point.setAttribute('cy', '250px');
        point.setAttribute('r', '2px');
        point.setAttribute('fill', '#664c4f');
        
        //point.style.cssText.value = '450px';
    
        console.dir(point);
    
        //svg_Class.append(point); //______ РАБОЧИЙ КОД
    
        svg_Class.appendChild(point);
    
        //let style_of_point = document.createElement("style" `<style>body{background:red}</style>`);
        
        //document.body.append(style_of_point);
    
        //document.body.append(point);
        //svg_Class.insertAdjacentHTML("beforeend", point);
        //point.attributes.cx.value = '150px';
        //point.attributes.cy.value = '150px';
        //point.attributes.r.value = '2px';
        //point.attributes.fill.value = '#664c4f';
    
        console.dir(point);
    
        let qwerty = document.querySelector('.one-of-point');
        console.dir(qwerty);
    
        //console.log('ddd');
    
        //const $elem = document.createElement('p');
        //const text = document.createTextNode('text');
    
        //let div = document.createElement('div');
        //div.className = "msg";
        //div.innerHTML = "Важная информация!";
    }
    */

        /*
    var svg = document.querySelector('.svg_Class');
    var element = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

    element.setAttributeNS(null, 'cx', '200px');
    element.setAttributeNS(null, 'cy', '300px');
    element.setAttributeNS(null, 'r', '2px');
    element.setAttributeNS(null, 'style', 'fill: none; stroke: blue; stroke-width: 1px;' );

    svg.appendChild(element);
    console.log(svg);
    console.log(element);
    */