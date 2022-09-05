const PORT = process.env.PORT || 5000;
const host = "http://localhost:"+PORT;
export const registerRoute = `${host}/api/auth/register`;
export const loginRoute = `${host}/api/auth/login`;
