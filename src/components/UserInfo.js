class UserInfo {
  constructor({
    profileNameSelector,
    profileDescriptionSelector,
    userAvatarSelector,
    _id,
  }) {
    this._profileNameEl = document.querySelector(profileNameSelector);
    this._profileDescriptionEl = document.querySelector(
      profileDescriptionSelector
    );
    this._userAvatarEl = document.querySelector(userAvatarSelector);
    this._id = _id;
  }

  getUserId() {
    return this._id;
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

  setUserInfo({ name, about, _id }) {
    if (name) this._profileNameEl.textContent = name;
    if (about) this._profileDescriptionEl.textContent = about;
    if (_id) this._id = _id;
  }

  setAvatar({ userAvatar }) {
    if (userAvatar) {
      this._userAvatarEl.src = userAvatar;
    }
  }
}

export default UserInfo;
