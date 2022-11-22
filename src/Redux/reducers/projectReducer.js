import { GET_TASK_API } from "../constains/projectConsts"

const initialState = {
    taskList: [{ "taskName": "Task 3", "status": true },
    { "taskName": "Task 2", "status": false }
    ]
}

const projectReducer = (state = initialState, action) => {
    // eslint-disable-next-line default-case
    switch (action.type) {
        case GET_TASK_API:
            state.taskList = action.taskList
            console.log(action.taskList)
            return { ...state }
        default:
            return { ...state }
    }
    return { ...state }
}

export default projectReducer