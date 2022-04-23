const queryConfig = {
    headers: { Authorization: `Bearer ${getToken()}` },
    baseURL: 'http://localhost:8080/api/'
};

function getToken() {
    let cookie: {[name:string]: string} = {};
    document.cookie.split(';').forEach(function(el) {
        let [key,value] = el.split('=');
        cookie[key.trim()] = value;
    })
    return cookie['SAT'];
}

export default queryConfig;