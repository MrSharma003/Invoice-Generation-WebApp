import axios from "axios";

class ToDodataService{

    createUser = async (details) => {
        console.log(details);
        const res = await axios.post(`http://localhost:8081/users/signup/`, details)
        console.log(res.data);
        return res;
    }

    retrieveAllToDo(name){
        return axios.get(`http://localhost:8081/jpa/users/${name}/todos`);
        //console.log('hello world');
    }

    retrieveToDo(name, id){
        return axios.get(`http://localhost:8081/jpa/users/${name}/todos/${id}`);
        //console.log('hello world');
    }

    deleteToDo(name,id){
        return axios.delete(`http://localhost:8081/jpa/users/${name}/todos/${id}`);
    }

    updateToDo(name,id, todo){
        return axios.put(`http://localhost:8081/jpa/users/${name}/todos/${id}`, todo);
    }

    createToDo(name, todo){
        return axios.post(`http://localhost:8081/jpa/users/${name}/todos/`, todo);
    }

    checkLoginStatus = async(username, password)=>{
    const res = await axios.get(`http://localhost:8081/users/logincheck/${username}/${password}`);
    return res;
    }


}

export default new ToDodataService()