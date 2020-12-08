const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDosArr =[];

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);

    if(loadedToDos !== null){
        // json형식은 항상 string으로 저장하기 때문에, string이 아니라
        // objectify를 해야한다.
        const parseData = JSON.parse(loadedToDos);
        // 확인용 ... console.log(parseData);

        // 로드 해온 데이터를 화면에 출력한다. 
        parseData.forEach(function(toDo){
            paintToDo(toDo.text);
        })
    }
}

function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDosArr));
}

function deleteToDo(event){
    const clickedTarget = event.target;
    const parentNode = clickedTarget.parentNode;
    // get rid of "parentNode"...

    toDoList.removeChild(parentNode);
    // now html part is removed.
    // we have to remove on the local storage.

    const cleanToDos = toDosArr.filter(function(toDo){
        return toDo.id !== parseInt(parentNode.id);
        // 이러면 cleanToDos에는 클릭한 노드의 id를 제외한 애들만 들어간다.
        // 즉, 내가 삭제하고싶은 애들을 제외한 나머지 애들을 기반으로 새롭게 배열을 만든다.
    });
    
    // 새롭게 만든 배열(cleanToDos)를 toDosArr로 바꿔치기.
    toDosArr = cleanToDos;
    saveToDos();
}

function paintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");

    delBtn.innerText = "❌";
    
    // when delBtn is pressed... click event will happen.
    delBtn.addEventListener("click", deleteToDo);
    
    const span = document.createElement("span");
    span.innerText = text + " ";

    const newId = toDosArr.length + 1;

    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;

    toDoList.appendChild(li);

    // now we are going to push the object to todo array.
    const toDoObj ={
        text : text,
        id : newId
    };

    toDosArr.push(toDoObj);

    saveToDos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentToDoValue = toDoInput.value;
    paintToDo(currentToDoValue);
    toDoInput.value = "";
}


function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();