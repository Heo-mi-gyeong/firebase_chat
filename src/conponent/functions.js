export const back = (navigate) => {

    localStorage.removeItem('user');
    navigate(-1);
}