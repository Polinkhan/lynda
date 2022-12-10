import * as secureStore from "expo-secure-store";

const saveInSecureStorage = async (key, value) => {
  await secureStore.setItemAsync(key, value);
};

const getFromSecureStorage = async (key) => {
  return await secureStore.getItemAsync(key);
};

const printFromSecureStorage = async (key) => {
  console.log(key, await getCache(key));
};

export { saveInSecureStorage, getFromSecureStorage, printFromSecureStorage };
