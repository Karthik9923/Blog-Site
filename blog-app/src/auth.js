// auth.js (or a similar file)
export const logout = () => {
    localStorage.removeItem('token'); // Clear the token from local storage
    // Optionally, you could also set user state to false in context or similar state management.
};
