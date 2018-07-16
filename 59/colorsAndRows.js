(function () {
    const colorBoard = document.getElementById('colorBoard');
    const innerBoard = document.getElementById('innerBoard');
    const theTable = document.getElementById('theTable');
    const startRepaintCycle = document.getElementById('StartRepaintCycle');
    const colorsAreChanging = true;
    const colorsAreNotChanging = false;
    let isColorsChanging = colorsAreNotChanging;

    function rgbString() {
        return (Math.floor(Math.random() * 226)).toString();
    }

    function cycleColors(HTMLelement, colorArea, cell) {
        let randomColor = `rgb(${rgbString()}, ${rgbString()}, ${rgbString()})`;
        HTMLelement.style[colorArea] = randomColor;
        cell.innerHTML=randomColor;
        cell.style.backgroundColor = randomColor;
        cell.colorArea = {
            color: randomColor,
            HTMLelement: HTMLelement,
            colorArea: colorArea
        };
    }

    function paintPerRow(){
        if(!isColorsChanging){
            for( let i = 0; i < this.cells.length; i++){
                if(this.cells[i].colorArea){
                    let colorArea = this.cells[i].colorArea;
                    colorArea.HTMLelement.style[colorArea.colorArea]=colorArea.color;
                }
            }
        }
    }

    let bgColorChange;
    let colorChange;
    let innerBgColorChange;
    let innerColorChange;
    let timeStamp;

    startRepaintCycle.addEventListener('click', function () {
        let newRow;
        if (!isColorsChanging) {

            newRow = theTable.insertRow();
            newRow.addEventListener('click', paintPerRow);
            let timeCell = newRow.insertCell();
            timeCell.style.textAlign = 'justify';
            let colorBoardCell = newRow.insertCell();
            let innerBoardCell = newRow.insertCell();
            let colorBoardTextCell = newRow.insertCell();
            let innerBoardTextCell = newRow.insertCell();
            
            bgColorChange = setInterval(() => {
                cycleColors(colorBoard, 'backgroundColor', colorBoardCell);
            },
            2000);
            innerBgColorChange = setInterval(() => {
                cycleColors(innerBoard, 'backgroundColor', innerBoardCell);
            },
            3000);
            colorChange = setInterval(() => {
                cycleColors(colorBoard, 'color', colorBoardTextCell);
            },
            400);
            innerColorChange = setInterval(() => {
                cycleColors(innerBoard, 'color', innerBoardTextCell);
            },
            600);

            timeStamp = setInterval(()=>{
                let time = new Date();
                timeCell.innerHTML= time.toLocaleTimeString() +' millscs ' + time.getMilliseconds();
            },10);

            startRepaintCycle.innerHTML = 'STOP';
            isColorsChanging = colorsAreChanging;
        } else {

            clearInterval(bgColorChange);
            clearInterval(colorChange);
            clearInterval(innerBgColorChange);
            clearInterval(innerColorChange);
            clearInterval(timeStamp);
            startRepaintCycle.innerHTML = 'repaint';
            isColorsChanging = colorsAreNotChanging;
        }
    });
}());