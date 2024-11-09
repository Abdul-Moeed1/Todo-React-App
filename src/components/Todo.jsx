import { useState } from "react";
import "./Todo.css";
import { TodoForm } from "./TodoForm";
import { TodoList } from "./TodoList";
import { TodoDate } from "./TodoDate";
import { getLocalStorageTodoData, setLocalStorageTodoData } from "./TodoLocalStorage";


export const Todo = () => {

    const [task, setTask] = useState(()=>getLocalStorageTodoData());

    const handleFormSubmit = (inputValue) => {

        const { id, content, checked } = inputValue;

        if (!content) {
            //This condition runs when input value is empty so empty value is not stored in task state array
            return;
        }

        //This condition checks if the input value is already stored in array then return the function so the value dont stored more than once in array.
        // if (task.includes(inputValue)) return;

        const ifTodoContentMatched = task.find((curElem) => curElem.content === content);

        if (ifTodoContentMatched) return;


        //...prevTask is spread operator
        setTask((prevTask) => [...prevTask, { id, content, checked }]);

    }
    // console.log("Hello");

    //Add to loacl storage
    setLocalStorageTodoData(task);

    //todo handleDeleteTodo function
    const handleDeleteTodo = (value) => {

        const updatedTask = task.filter((curTask) => { return curTask.content !== value });
        setTask(updatedTask);
    }

    // todo handleClearTodoData functionality;
    const handleClearTodoData = () => {
        setTask([]);
    }

    //todo handleCheckedTodo function
    const handleCheckedTodo = (content) =>{
        const updatedTask = task.map((curTask)=>{
            if(curTask.content === content){
                return {...curTask, checked: !curTask.checked};
            }else{
                return curTask;
            }
        });
        setTask(updatedTask);
    };

    return (
        <section className=" todo-container">
            <header>
                <h1>Todo List</h1>
                <TodoDate />

            </header>
            <TodoForm onAddTodo={handleFormSubmit} />
            <section className="myUnOrdList">
                <ul>
                    {
                        task.map((curTask) => {
                            return <TodoList
                                key={curTask.id}
                                data={curTask.content}
                                checked={curTask.checked}
                                onHandleDeleteTodo={handleDeleteTodo}
                                onHandleCheckedTodo={handleCheckedTodo}

                            />;
                        })
                    }
                </ul>
            </section>
            <section>
                <button className="clear-btn" onClick={handleClearTodoData}>Clear all</button>
            </section>
        </section>
    );
}