import { create } from "zustand";

import { UserSchemaType } from "../../../common/types";
import { saveAccessToken } from "../../modules/auth/AccessTokenUtils";
import callFetchUser from "../../api/user/callFetchUser";
import callLoginWithGoogle from "../../api/user/callLoginWithGoogle";
import { CONS_PATH_LOGIN } from "../../../common/constants";

const INITIAL_USER: UserSchemaType = {
  userParmId: "",
  email: "",
  googleId: "",
  created: new Date(),
};

const useUserStore = create<{
  data: {
    user: UserSchemaType;
  };
  loading: boolean;
  error: string | null;
  fetchUser: (accessToken?: string) => Promise<void>;
  loginWithGoogle: (code: string) => Promise<void>;
}>((set, get) => ({
  data: {
    user: INITIAL_USER,
  },
  loading: false,
  error: null,
  fetchUser: async (accessToken?: string) => {
    set({ loading: true, error: null });
    const response = await callFetchUser(accessToken);
    if (response.error) {
      set({ loading: false, error: response.error.message });
      // go to login page
      // window.location.href = CONS_PATH_LOGIN;
    } else {
      set({ loading: false, data: { user: response.data.user } });
    }
  },
  loginWithGoogle: async (code: string) => {
    set({ loading: true, error: null });
    const response = await callLoginWithGoogle(code);
    if (response.error) {
      set({ loading: false, error: response.error.message });
    } else {
      saveAccessToken(response.data.accessToken);
      await get().fetchUser(response.data.accessToken);
    }
  },
}));

export default useUserStore;
