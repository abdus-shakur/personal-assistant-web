import GetAxios from "../../Utils/Service/axios-default";

export default function GetTasks(){
    return GetAxios().get('/tasks/get-all');
}

export function createTask(task){
    return GetAxios().post('/tasks/create',task);
}

export function updateTask(task){
    return GetAxios().post('/tasks/update',task);
}
export function deleteTask(task){
    return GetAxios().post(`/tasks/delete/${task.id}`,{});
}