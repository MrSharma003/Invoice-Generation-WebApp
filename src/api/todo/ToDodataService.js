import axios from "axios";

class ToDodataService{

    retrieveAllToDo(name){
        return axios.get(`http://localhost:8081/users/${name}/todos`);
        //console.log('hello world');
    }

    retrieveToDo(name, id){
        return axios.get(`http://localhost:8081/users/${name}/todos/${id}`);
        //console.log('hello world');
    }

    deleteToDo(name,id){
        return axios.delete(`http://localhost:8081/users/${name}/todos/${id}`);
    }

    updateToDo(name,id, todo){
        return axios.put(`http://localhost:8081/users/${name}/todos/${id}`, todo);
    }

    createToDo(name, todo){
        return axios.post(`http://localhost:8081/users/${name}/todos/`, todo);
    }

}

export default new ToDodataService()