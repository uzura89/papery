import { create } from "zustand";

import { UserSchemaType } from "../../../common/types";
import { saveAccessToken } from "../../modules/auth/AccessTokenUtils";
import callFetchUser from "../../api/user/callFetchUser";
import callLoginWithGoogle from "../../api/user/callLoginWithGoogle";
import { callSignupWithEmail } from "../../api/user/callSignupWithEmail";
import { callVerifyEmail } from "../../api/user/callVerifyEmail";
import { callLoginWithEmail } from "../../api/user/callLoginWithEmail";
import { CONS_PATH_LOGIN } from "../../../common/constants";

const INITIAL_USER: UserSchemaType = {
  userParmId: "",
  email: "",
  googleId: "",
  password: "",
  salt: "",
  activated: false,
  customerId: null,
  purchaseId: null,
  purchasePlan: null,
  subscriptionId: null,
  subscriptionCurrentPeriodEnd: null,
  subscriptionCancelAtPeriodEnd: null,
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
  signUpWithEmail: (
    email: string,
    password: string,
    onSucceed: () => void
  ) => Promise<void>;
  verifyEmail: (email: string, code: string) => Promise<void>;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  checkIfPremium: () => boolean;
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
      window.location.href = CONS_PATH_LOGIN;
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
  signUpWithEmail: async (
    email: string,
    password: string,
    onSucceed: () => void
  ) => {
    set({ loading: true, error: null });
    const response = await callSignupWithEmail({ email, password });
    if (response.error) {
      set({ error: response.error.message });
    } else {
      onSucceed();
    }
    set({ loading: false });
  },
  verifyEmail: async (email: string, code: string) => {
    set({ loading: true, error: null });
    const response = await callVerifyEmail({ email, code });
    if (response.error) {
      set({ error: response.error.message });
    } else {
      saveAccessToken(response.data.accessToken);
      await get().fetchUser(response.data.accessToken);
    }
    set({ loading: false });
  },
  loginWithEmail: async (email: string, password: string) => {
    set({ loading: true, error: null });
    const response = await callLoginWithEmail({ email, password });
    if (response.error) {
      set({ error: response.error.message });
    } else {
      saveAccessToken(response.data.accessToken);
      await get().fetchUser(response.data.accessToken);
    }
    set({ loading: false });
  },
  checkIfPremium: () => {
    return get().data.user.purchasePlan !== null;
  },
}));

export default useUserStore;
