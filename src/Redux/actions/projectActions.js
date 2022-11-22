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