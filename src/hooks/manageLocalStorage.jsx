export const storedData = (id) => {
    const storedFormData = JSON.parse(localStorage.getItem(id));
    if (storedFormData) {
        return storedFormData;
    } else {
        return []
    }
}

export const removeData = (id) => {
    localStorage.removeItem(id);
}

export const storeDataInLocalStorage = (id, data) => {
    localStorage.setItem(id, JSON.stringify(data));
}