import { deleteItemAsync } from "expo-secure-store";
import { createContext, useContext, useEffect, useState } from "react";
import { requestAnApi, requestInitialApi } from "../functions/api_call";
import {
  saveInSecureStorage,
  getFromSecureStorage,
  printFromSecureStorage,
} from "../functions/cacheUpdate";
import { ApiRoutes } from "../functions/api_routes";

const DataContext = createContext();
export const useDataContext = () => useContext(DataContext);

const DataContextProvider = (props) => {
  const [isAuth, setAuth] = useState(false);

  // printFromSecureStorage("refreshToken");
  // printFromSecureStorage("accessToken");

  const init = async () => {
    const { credential, error } = await requestInitialApi(
      ApiRoutes.root,
      await getFromSecureStorage("accessToken")
    );

    // if access token is expired
    if (error && error.message === "jwt expired") {
      // request for new access token via refresh token
      const body = { refreshToken: await getFromSecureStorage("refreshToken") };
      const { accessToken, refreshToken, error } = await requestAnApi(
        ApiRoutes.refreshToken,
        "POST",
        body
      );

      // if refresh token is expired
      if (error) {
        //handle unauthorized
        console.log(error);
      } else {
        await saveInSecureStorage("accessToken", accessToken);
        await saveInSecureStorage("refreshToken", refreshToken);
        setAuth(true);
      }
    } else {
      setAuth(credential);
    }
  };

  useEffect(() => {
    init();
  }, []);

  const signIn = async (body) => {
    const { accessToken, refreshToken, error } = await requestAnApi(
      ApiRoutes.login,
      "POST",
      body
    );
    if (error) {
      console.log(error);
    } else {
      await saveInSecureStorage("accessToken", accessToken);
      await saveInSecureStorage("refreshToken", refreshToken);
      init();
    }
  };

  const signOut = async () => {
    await deleteItemAsync("accessToken");
    await deleteItemAsync("refreshToken");
    init();
  };

  const value = { isAuth, signIn, signOut };
  return (
    <DataContext.Provider value={value}>{props.children}</DataContext.Provider>
  );
};

export default DataContextProvider;
