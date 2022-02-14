class UserInfo {
  constructor({
    profileNameSelector,
    profileDescriptionSelector,
    userAvatarSelector,
  }) {
    this._profileNameEl = document.querySelector(profileNameSelector);
    this._profileDescriptionEl = document.querySelector(
      profileDescriptionSelector
    );
    this._userAvatarEl = document.querySelector(userAvatarSelector);
  }

  getUserInfo() {
    return {
      profileName: this._profileNameEl.textContent,
      profileDescription: this._profileDescriptionEl.textContent,
      //userAvatar: this._userAvatarEl.style.backgroundImage.slice(5, -2),
    };
  }
  setUserInfo({ profileName, profileDescription }) {
    if (profileName) this._profileNameEl.textContent = profileName;
    if (profileDescription)
      this._profileDescriptionEl.textContent = profileDescription;
  }

  setAvatar({ userAvatar }) {
    if (userAvatar) {
      this._userAvatarEl.src = userAvatar;
    }
  }
}

export default UserInfo;
