let authToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBkZW1vLmNvbSIsImlhdCI6MTczNTA0NDQxNSwiZXhwIjoxNzM1MDUyODE1fQ.KZHltgZcLewTM59AIIUvgxZjHdm-WbBuKkFVtiImVkROBUGr8jYQ7BmbDdpQoUBP4zX_De0XvuMvFzOpm5UIZg";

// Get the token
export const getToken = () => authToken;

export const isAdmin = () => localStorage.getItem("isAdmin")?.toString() == 'true';

