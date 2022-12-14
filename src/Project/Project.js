import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getTaskListApi, addTaskApi, deleteTaskApi, checkTaskApi, rejectTaskApi } from '../Redux/actions/projectActions'
import style from "./Project.css"
export default function Project() {
    // lấy data từ redux về
    const { taskList } = useSelector(state => state.projectReducer)

    const dispatch = useDispatch()

    const getTaskList = () => {
        dispatch(getTaskListApi())
    }

    useEffect(() => {

        getTaskList();
        return () => {

        }
    }, [])

    let [state, setState] = useState({
        values: {
            taskName: ''
        },
        errors: {
            taskName: ''
        }
    });
    const handleChange = (e) => {
        let { value, name } = e.target;
        let newValues = { ...state.values };

        newValues = { ...newValues, [name]: value };

        let newErrors = { ...state.errors };

        let regexString = /^[a-z A-Z]+$/;

        if (!regexString.test(value) || value.trim() === '') {
            newErrors[name] = name + ' invalid !';
        } else {
            newErrors[name] = '';
        }
        setState({
            ...state,
            values: newValues,
            errors: newErrors
        })

    }
    const addTask = (e) => {
        e.preventDefault(); //Dừng sự kiện submit form
        // console.log(state.values.taskName);

        //Xử lý nhận dữ liệu từ người dùng nhập => gọi action addTaskApi()
        dispatch(addTaskApi(state.values.taskName))
    }
    //Hàm xử lý xóa task
    const delTask = (taskName) => {
        dispatch(deleteTaskApi(taskName))
    }
    const checkTask = (taskName) => {
        dispatch(checkTaskApi(taskName))
    }

    //Xử lý reject task
    const rejectTask = (taskName) => {
        dispatch(rejectTaskApi(taskName));
    }

    const renderTaskTodo = () => {
        return taskList.filter(item => !item.status).map((item, index) => {
            return <li key={index}>
                <span>{item.taskName}</span>
                <div className="buttons">
                    <button className="remove" type='button' onClick={() => {
                        delTask(item.taskName)
                    }}>
                        <i className="fa fa-trash-alt" />
                    </button>
                    <button type="button" className="complete" onClick={() => {
                        checkTask(item.taskName)
                    }}>
                        <i className="far fa-check-circle" />
                        <i className="fas fa-check-circle" />
                    </button>
                </div>
            </li>
        })
    }

    const renderTaskDone = () => {
        return taskList.filter(item => item.status).map((item, index) => {
            return <li key={index}>
                <span>{item.taskName}</span>
                <div className="buttons">
                    <button className="remove" type='button' onClick={() => {
                        delTask(item.taskName)
                    }}>
                        <i className="fa fa-trash-alt" />
                    </button>
                    <button type="button" className="complete" onClick={() => {
                        rejectTask(item.taskName)
                    }}>
                        <i className="far fa-check-circle" />
                        <i className="fas fa-check-circle" />
                    </button>
                </div>
            </li>
        })
    }
    return (

        <div className="card">
            <div className="card__header">
                <img src={require("./bg.png")} />
            </div>
            {/* <h2>hello!</h2> */}
            <form className="card__body" onSubmit={addTask}>
                <div className="card__content">
                    <div className="card__title">
                        <h2>My Tasks</h2>
                        <p>September 9,2020</p>
                    </div>
                    <div className="card__add">
                        <input id="newTask" name="taskName" type="text" placeholder="Enter an activity..." onChange={handleChange} />
                        <button id="addItem" type="submit" onClick={addTask}>
                            <i className="fa fa-plus" />
                        </button>
                    </div>
                    <div className="text-danger">{state.errors.taskName}</div>
                    <div className="card__todo">
                        {/* Uncompleted tasks */}
                        <ul className="todo" id="todo">
                            {renderTaskTodo()}
                        </ul>
                        {/* Completed tasks */}
                        <ul className="todo" id="completed">
                            {renderTaskDone()}
                        </ul>
                    </div>
                </div>
            </form>
        </div>
    )
}
