import axios from "axios";

class HelloWorldService{
    executeHelloWorldService(){
        return axios.get('http://localhost:8081/hello-world')
        // console.log('hello world')
    }

    executeHelloWorldBeanService(){
        return axios.get('http://localhost:8081/hello-bean')
        // console.log('hello world')
    }
}

export default new HelloWorldService()