export const getProductDetails = async () => {
    try {
        const response = await fetch(
            "https://dev-project-ecommerce.upgrad.dev/api/products",
            {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();;

    } catch (error) {
        console.error("getAllProducts failed:", error);
        throw error;
    }
};

export const getAllProducts = async () => {
    try {
        const response = await fetch(
            "https://dev-project-ecommerce.upgrad.dev/api/products",
            {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();;

    } catch (error) {
        console.error("getAllProducts failed:", error);
        throw error;
    }
};

export const getProductCategories = async () => {
    try {
        const response = await fetch(
            "https://dev-project-ecommerce.upgrad.dev/api/products/categories",
            {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }


        return await response.json()

    } catch (error) {
        console.error("getProductCategories failed:", error);
        throw error;
    }
}