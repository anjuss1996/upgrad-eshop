let authToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBkZW1vLmNvbSIsImlhdCI6MTczNTAzNTMyOSwiZXhwIjoxNzM1MDQzNzI5fQ.SbdaS69ExXckQbBy1aIrb1rUuZi1LJJ-Udwk_sEpFCddasM8lD5LCfz8Xf4EU4VK7S2MD9QYTDU8UDvESKuf1g";

// Get the token
export const getToken = () => authToken;

export const isAdmin = () => localStorage.getItem("isAdmin") == 'true';

