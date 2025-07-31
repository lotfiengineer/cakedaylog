class LocalStorageService {
  static setItem = (key: string, value: string) =>
    localStorage.setItem(key, value);
  static getItem = (key: string) => localStorage.getItem(key);

  static clear = () => localStorage.clear();
}

export default LocalStorageService;
