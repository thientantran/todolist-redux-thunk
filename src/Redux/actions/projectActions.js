import Axios from "axios"
import { GET_TASK_API } from "../constains/projectConsts"


export const getTaskListApi = () => {
    //Tiền xử lý dữ liệu => xử lý function 
    return async dispatch => {
        console.log("dispatch")
        try {
            let response = await Axios({
                url: 'http://svcy.myclass.vn/api/ToDoList/GetAllTask',
                method: 'GET'
            });
            console.log(response)
            if (response.status === 200) {
                dispatch({
                    type: GET_TASK_API,
                    taskList: response.data
                })
            }
        } catch (err) {
            console.log(err.response.data)
        }
    }
}

export const addTaskApi = (taskName) => {
    return dispatch => {
        //Xử lý trước khi dispatch
        let promise = Axios({
            url: 'http://svcy.myclass.vn/api/ToDoList/AddTask',
            method: 'POST',
            data: { taskName: taskName }
        });

        //Xử lý thành công
        promise.then(result => {
            // alert(result.data);
            dispatch(getTaskListApi());
        })
        //Xử lý thất bại
        promise.catch(errors => {
            alert(errors.response.data)

        })
    }
}

export const deleteTaskApi = (taskName) => {
    return dispatch => {
        let promise = Axios({
            url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
            method: 'DELETE'
        });

        promise.then(result => {
            //Sau khi thực hiện api gọi phương thức dispatchAction get TaskListApi để load lại task
            dispatch(getTaskListApi())
        });

        promise.catch(errors => {
            alert(errors.response.data)
        })
    }
}
export const checkTaskApi = (taskName) => {
    return dispatch => {
        let promise = Axios({
            url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
            method: 'PUT'
        });

        promise.then(res => {
            dispatch(getTaskListApi())
        });

        promise.catch(err => {
            alert(err.response.data);
        })
    }
}
export const rejectTaskApi = (taskName) => {
    return dispatch => {
        let promise = Axios({
            url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
            method: 'PUT'
        });

        promise.then(res => {
            // alert(res.data);
            dispatch(getTaskListApi());
        });

        promise.catch(err => {
            alert(err.response.data);
        })
    }
}