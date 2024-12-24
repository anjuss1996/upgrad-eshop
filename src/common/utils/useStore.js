import { create } from 'zustand';

const useStore = create((set) => ({
    // Initial state for product details and address
    productDetails: null,
    address: null,
    quantity: 0,

    // Setter for product details
    setProductDetail: (productDetails) => {
        set({ productDetails });
    },

    // Setter for address details
    setAddress: (address) => {
        set({ address });
    },

    // Setter for address details
    setQuantity: (quantity) => {
        set({ quantity });
    },
}));

export default useStore;
