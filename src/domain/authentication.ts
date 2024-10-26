export const validateRequired = (name: string): string | null => {
    if (!name) return "Поле обязательно для заполнения.";
    return null;
};
