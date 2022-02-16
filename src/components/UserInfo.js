class UserInfo {
  constructor({
    profileNameSelector,
    profileDescriptionSelector,
    userAvatarSelector,
    id,
  }) {
    this._profileNameEl = document.querySelector(profileNameSelector);
    this._profileDescriptionEl = document.querySelector(
      profileDescriptionSelector
    );
    this._userAvatarEl = document.querySelector(userAvatarSelector);
    this._id = id;
  }

  getUserInfo() {
    return {
      profileName: this._profileNameEl.textContent,
      profileDescription: this._profileDescriptionEl.textContent,
      id: this._id,
      userAvatar: this._userAvatarEl.src,
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
