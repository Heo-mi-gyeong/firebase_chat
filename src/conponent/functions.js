export const back = (navigate) => {

    localStorage.removeItem('user');
    navigate('/');
}