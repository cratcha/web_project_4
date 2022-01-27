class UserInfo {
  constructor({ profileNameSelector, profileDescriptionSelector }) {
    this._profileNameEl = document.querySelector(profileNameSelector);
    this._profileDescriptionEl = document.querySelector(
      profileDescriptionSelector
    );
  }

  getUserInfo() {
    return {
      profileName: this._profileNameEl.textContent,
      profileDescription: this._profileDescriptionEl.textContent,
    };
  }
  setUserInfo({ profileName, profileDescription }) {
    this._profileNameEl.textContent = profileName;
    this._profileDescriptionEl.textContent = profileDescription;
  }
}

export default UserInfo;
