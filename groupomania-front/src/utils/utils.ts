import jwtDecode from 'jwt-decode'

export function getAuthenticationHeaders() {
    const token = localStorage.getItem('token');
    if(token) {
        const myHeaders = new Headers({
            'Authorization': 'Bearer ' + token,
        });
        return myHeaders;
    }   
}

export function getUser() {
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token || '');
    return decodedToken
}