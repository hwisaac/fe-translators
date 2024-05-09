// const BASE_URL = 'http://127.0.0.1:8000/api';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL_API;
export const BASE_URL_WO_API = process.env.NEXT_PUBLIC_BASE_URL;
export const HOSTNAME = process.env.NEXT_PUBLIC_HOSTNAME;
export default BASE_URL;
