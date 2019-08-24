//Global variables


/* 
        Deependra Chouasia
        IIT ISM Dhanbad
*/


var transitionTime = 100;
var score = 0;
var num_of_cells_found_filled = 0;

function restart()
{
    let cell = document.getElementsByClassName("cell");
    for(let i=0;i<cell.length;i++)
    {
        cell[i].childNodes[0].remove();
    }
    score = 0;
    document.getElementsByClassName("score-value")[0].innerHTML = score;
    randomElement();
    randomElement();
    return;
}
function allCellsFilled()
{
    //returns true of false
    let cell = document.getElementsByClassName("cell");
    for(let i=0;i<cell.length;i++)
    {
        if(cell[i].childNodes.length == 0)return 1;
    }
    return 0;
}
function randomElement(){
    if(allCellsFilled() == 0)
    {
        alert("Your Score is "+score);
        restart();
        return;
    }
    var x = parseInt(Math.random()*16);//random variable to select a cell
    
    if(document.getElementsByClassName("cell")[x].childNodes.length == 0)
    {
        let new_tile = document.createElement("div");
        new_tile.classList.add("tile","tile2");

        let tile_num = document.createElement("span");
        tile_num.setAttribute("class","tile-number");
        tile_num.innerHTML = "2";

        new_tile.appendChild(tile_num);

        document.getElementsByClassName("cell")[x].appendChild(new_tile);
    }
    else
    {
        randomElement();
    }
    return;
}
// initile add 2 tiles to start the game
randomElement();
randomElement();

//move a cell a to position of b
function moveY(a,b){

	let distance = b.getBoundingClientRect().top - a.getBoundingClientRect().top;
	a.childNodes[0].style.transform = 'translateY('+distance+'px)';

    b.appendChild(a.childNodes[0]);
    b.childNodes[0].style.transform = 'translateY(0px)';
}
function mergeY(a,b)
{
    //merge a into b
    let tile_num = a.classList[1].slice(4,a.classList[1].length);
    a.remove();
    
    
    //show transition for merging cell
    b.style.transform = "scale(1.2)";
    b.setAttribute("class", "tile tile"+(2*tile_num));
    b.childNodes[0].innerHTML = 2*tile_num;
    
    score += 2*tile_num;

	setTimeout(function(){
		b.style.transform = "scale(1)";
    },transitionTime*2);
    
    //set new score
	document.getElementsByClassName("score-value")[0].innerHTML = score;
}
function moveUp()
{
    for(let k=1;k<=4;k++)
    {
        //iterate over every column k
        let i=0;
        j=0;
        let col = document.getElementsByClassName("col"+k);
        while(i<4)
        {
            if(col[i].childNodes.length == 0)
            {
                //fill this black tile by moving a tile
                j = Math.max(j,i+1);
                while(j<4)
                {
                    if(col[j].childNodes.length == 1)
                    {
                        moveY(col[j],col[i]);
                        j++;
                        break;
                    }
                    j++;
                }
                if(j==4)break;
            }
            else
            {
                //check if any cell can be merged
                let tmp=Math.max(j,i+1);
                while(tmp<4)
                {
                    if(col[tmp].childNodes.length == 1)
                    {
                        //if same then merge else moveon
                        if(col[i].childNodes[0].classList[1]==col[tmp].childNodes[0].classList[1])
                        {
                            mergeY(col[tmp].childNodes[0],col[i].childNodes[0]);
                            j=tmp+1;    
                        }
                        break;
                    }
                    tmp++;
                }
                i++;
            }
        }
    }
    return;
}

function moveDown()
{
    for(let k=1;k<=2+2;k++)
    {
        let col = document.getElementsByClassName("col"+k);
        let i=2+1;
        let j=2+1;

        while(i>=0)
        {
            if(col[i].childNodes.length == 0)
            {
                //move other cell to this position
                j = Math.min(j,i-1);
                while(j>=0)
                {
                    if(col[j].childNodes.length == 1)
                    {
                        moveY(col[j],col[i]);
                        j--;
                        break;
                    }
                    j--;
                }
                // now there is no more cell to move
                if(j<0)break;
            }
            else
            {
                let tmp = Math.min(i-1,j);
                while(tmp>=0)
                {
                    if(col[tmp].childNodes.length == 1)
                    {
                        if(col[i].childNodes[0].classList[1]==col[tmp].childNodes[0].classList[1])
                        {
                            mergeY(col[tmp].childNodes[0],col[i].childNodes[0]);
                            j = tmp-1;
                        }
                        break;
                    }
                    tmp--;
                }
                i--;
            }
        }
    }
}


function moveX(a,b)
{
    let distance = b.getBoundingClientRect().left - a.getBoundingClientRect().left;
    a.childNodes[0].style.transform = 'translateX('+distance+'px)';

    b.appendChild(a.childNodes[0]);
    b.childNodes[0].style.transform = 'translateX(0px)';
}
function mergeX(a,b)
{
    let tile_num = a.classList[1].slice(2+2,a.classList[1].length);
    a.remove();
    
    //show transition for merging cell
    b.style.transform = "scale(1.2)";
    b.setAttribute("class","tile tile"+(2*tile_num));
    b.childNodes[0].innerHTML = 2*tile_num;

    score += 2*tile_num;

	setTimeout(function(){
		b.style.transform = "scale(1)";
    },transitionTime*2);
    
    //set new score
	document.getElementsByClassName("score-value")[0].innerHTML = score;
}


function moveLeft()
{
    for(let k=1;k<=2+2;k++)
    {
        let cell = document.getElementsByClassName("row"+k);
        let i=0;
        let j=0;
        console.log(cell);

        while(i<2+2)
        {
            if(cell[i].childNodes.length == 0)
            {
                j = Math.max(i+1,j);
                while(j<2+2)
                {
                    if(cell[j].childNodes.length == 1)
                    {
                        moveX(cell[j],cell[i]);
                        j++;
                        break;
                    }
                    j++;
                }
                //no more cell to move in this row
                if(j==2+2)break;
            }
            else
            {
                let tmp = Math.max(i+1,j);
                while(tmp<2+2)
                {
                    if(cell[tmp].childNodes.length == 1)
                    {
                        if(cell[tmp].childNodes[0].classList[1] == cell[i].childNodes[0].classList[1])
                        {
                            //merge tmp into i
                            mergeX(cell[tmp].childNodes[0],cell[i].childNodes[0]);
                            j = tmp+1;
                        }
                        break;
                    }
                    tmp++;
                }
                i++;
            }
        }
    }
    return;
}

function moveRight()
{
    for(let k=2+2;k>0;k--)
    {
        let cell = document.getElementsByClassName("row"+k);

        let i=2+1;
        let j=2+1;

        while(i>=0)
        {
            if(cell[i].childNodes.length == 0)
            {
                j = Math.min(j,i-1);
                while(j>=0)
                {
                    if(cell[j].childNodes.length == 1)
                    {
                        moveX(cell[j],cell[i]);
                        j--;
                        break;
                    }
                    j--;
                }
                if(j <0)break;
            }
            else
            {
                let tmp = Math.min(i-1,j);
                while(tmp>=0)
                {
                    if(cell[tmp].childNodes.length == 1)
                    {
                        if(cell[tmp].childNodes[0].classList[1] == cell[i].childNodes[0].classList[1])
                        {
                            mergeX(cell[tmp].childNodes[0],cell[i].childNodes[0]);
                            j = tmp-1;
                        }
                        break;
                    }
                    tmp--;
                }
                i--;
            }
        }
    }
}

//read commands
document.addEventListener("keydown", function(e){
	if(!e) e = window.event;
	
	if(e.code == "ArrowUp" || e.code == "ArrowDown" || e.code == "ArrowRight" || e.code == "ArrowLeft"){ 
        // keyStack[keyStack.length] = e.keyCode;
        console.log(e.code);

        switch(e.code)
        {
            case "ArrowUp":
                moveUp();
                randomElement();
                break;
            case "ArrowDown":
                moveDown();
                randomElement();
                break;
            case "ArrowRight":
                moveRight();
                randomElement();
                break;
            case "ArrowLeft":
                moveLeft();
                randomElement();    
                break;
            default:
                console.log("Invalid key Pressed");
        }
	}
});
