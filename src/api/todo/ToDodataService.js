import axios from "axios";

class ToDodataService{

    retrieveAllToDo(name){
        return axios.get(`http://localhost:8081/users/${name}/todos`);
        console.log('hello world');
    }

    deleteToDo(name,id){
        return axios.delete(`http://localhost:8081/users/${name}/todos/${id}`);
    }
}

export default new ToDodataService()