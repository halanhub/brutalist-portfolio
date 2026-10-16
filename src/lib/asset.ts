/** Resolve a file in /public against Vite's base URL ("/" in production). */
export const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;
