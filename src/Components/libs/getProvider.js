//ログインプロバイダの取得
export const getProvider = (user, setProvider) => {
  if (user !== null) {
    user.providerData.forEach((profile) => {
      setProvider(profile.providerId);
    });
  }
};
