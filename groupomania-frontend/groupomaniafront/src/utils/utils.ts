export function getAuthenticationHeaders() {
    const token = localStorage.getItem('token');
        console.log(token);
        
    if(token) {
        const myHeaders = new Headers({
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/x-www-form-urlencoded'
            });
            return myHeaders;
    }
        
}