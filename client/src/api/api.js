export async function request(body, type, port="30631", host="pierre"){
    return fetch('http://' + host + ":" + port + '/' + type, {
        method: "POST",
        body: JSON.stringify(body)
    }).then(response => {return response.json()}).catch(err => {console.error(err)});
}

export async function get(type, port="30631", host="pierre") {
    return fetch('http://' + host + ":" + port + '/' + type, {
        method:"GET"
    }).then(response => {return response.json()}).catch(err => {console.error(err)});
}