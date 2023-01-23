//Adding comment to check branching 
//this comment added in dev environment
function solve(){
    let inpArr = [];
    //below nested forloops will store the input from the grid in 9*9 2d array 
    for(let i=0;i<9;i++)
    {
        let c = 'cell'+i;
        let inpRow = [];
        for(let j=0;j<9;j++)
        {
            let cell = c+j;
            let d = document.getElementsByClassName(cell)[0];
            if(d!=undefined)
            {
                console.log(d.value);
                inpRow[j]=d.value;
            }
        }
        inpArr[i]=inpRow;
    }
    //after storing inputs in 2d array below condition will check the input is valid or not
    //isValidSudoku() will check the input
    if(isValidSudoku(inpArr))
    {
        document.getElementsByClassName("error")[0].innerHTML = '<h2 class="success">Solved Successfully!!!</h2>';
        sudokuSolver(inpArr);
    }
    else
    {
        document.getElementsByClassName("error")[0].innerHTML = '<h2>Invalid Inputs please recheck.</h2>';
    }
}

function clearSudoku()
{
    //this function will clear the sudoku inputs whenever user clicks on "clear" button
    for(let i=0;i<9;i++)
    {
        let c = 'cell'+i;
        for(let j=0;j<9;j++)
        {
            let cell = c+j;
            document.getElementsByClassName(cell)[0].value='';
            document.getElementsByClassName(cell)[0].classList.remove("fillerStyle");
        }
        
    }
    document.getElementsByClassName("error")[0].innerHTML = '';
}

function isValidSudoku(A)
{
    //this function will check the inputs validate that the given inputs are the valid or not as per the sudoku rules
    //this function will return true or false
    let hashSet = new Set();
    for(let i=0;i<9;i++)
    {
        for(let j=0;j<9;j++)
        {
            if(A[i][j]!='')
            {
                let box = 'box-'+(Math.floor(i/3)*3+Math.floor(j/3))+A[i][j];
                let row = 'row-'+i+A[i][j];
                let col = 'col-'+j+A[i][j];
                if(!hashSet.has(box)&&!hashSet.has(row)&&!hashSet.has(col))
                {
                    hashSet.add(box);
                    hashSet.add(row);
                    hashSet.add(col);
                }
                else
                {
                    return false;
                }
            } 
        }
    }   
    return true;
}

function sudokuSolver(A)
{
    //this is the main logic which solves the and create the output array with the ans
    //this logic uses the backtracking algorithm
    for(let i=0;i<9;i++)
    {
        for(let j=0;j<9;j++)
        {
            if(A[i][j]=='')
            {
                for(let k=1;k<=9;k++)
                {
                    if(isDataValid(A,k,i,j))
                    {
                        console.log(i,j,k);
                        A[i][j]=String(k);
                        if(sudokuSolver(A))
                        {
                            return true;
                        }
                        else
                        {
                            A[i][j]='';
                        }
                    }
                }
                return false
            }
            
        }
    }
    //after solving the sudoku problem and call the "fillSudoku()" function which will fills the output.
    fillSudoku(A);
    return true;
}
function isDataValid(Arr,d,r,c)
{
    //this function is the checker function for the main function "sudokuSolver()"
    for(let i=0;i<9;i++)
    {
        let x = Math.floor(r/3)*3+Math.floor(i/3);
        let y = (Math.floor(c/3)*3)+(i%3);
        if(Arr[r][i]==d)
        {
            return false;
        }
        if(Arr[i][c]==d)
        {
            return false;
        }
        if(Arr[x][y]==d)
        {
            return false;
        }
    }
    return true;
}

function fillSudoku(A)
{
    //this function will fill the solved 2d array and fill the output into grids
    for(let i=0;i<9;i++)
    {
        let row = "cell"+i;
        for(let j=0;j<9;j++)
        {
            let cell = row+j;
            let t = document.getElementsByClassName(cell)[0];
            if(t.value=='')
            {
                t.classList.add("fillerStyle");
                t.value=A[i][j];
            }
        }
    }
}