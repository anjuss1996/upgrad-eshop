export const handleLogin = async (formData) => {
    try {
        const response = await fetch(
            "https://dev-project-ecommerce.upgrad.dev/api/auth/signin",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();
        return responseData; // Return the response data for further use
    } catch (error) {
        console.error("Login failed:", error);
        throw error;
    }
};


export const handleSignUp = async (formData) => {
    try {
        const response = await fetch(
            "https://dev-project-ecommerce.upgrad.dev/api/auth/signup",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();
        return responseData;

    } catch (error) {
        console.error("Login failed:", error);
        throw error;
    }
};
