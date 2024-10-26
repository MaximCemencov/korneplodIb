export const validateRequired = (...fields: string[]): string | undefined => {
    for (const field of fields) {
        if (!field) {
            return "Поле обязательно для заполнения.";
        }
    }
    return undefined; // Вместо null
};