export function getAuthenticationHeaders() {
    const token = localStorage.getItem('token');
    if(token) {
        const myHeaders = new Headers({
            'Authorization': 'Bearer ' + token,
            });
            return myHeaders;
    }
        
}