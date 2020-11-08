import {storage} from "../../platform-specific/local-storage";

class LocalStorage {
    public static set(key: string, value: string) {
        storage.set(key, value);
    }

    public static get(key: string) {
        return storage.get(key);
    }

    public static remove(key: string) {
        return storage.delete(key);
    }
};

export {LocalStorage};
