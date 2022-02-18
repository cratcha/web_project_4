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
      avatar: this._userAvatarEl.src,
    };
  }

  setUserInfo({ name, about, avatar, _id }) {
    if (name) this._profileNameEl.textContent = name;
    if (about) this._profileDescriptionEl.textContent = about;
    if (avatar) this._userAvatarEl.src = avatar;
    if (_id) this._id = _id;
  }

  setAvatar({ link }) {
    this._userAvatarEl.src = link;
  }
}

export default UserInfo;
