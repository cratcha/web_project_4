export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _handleServerResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  }

  getAppInfo() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(this._handleServerResponse);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this._handleServerResponse);
  }

  editUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(this._handleServerResponse);
  }

  addNewCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(this._handleServerResponse);
  }

  deleteCard(cardID) {
    return fetch(`${this._baseUrl}/cards/${cardID}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._handleServerResponse);
  }

  changeLikeStatus(cardID, like) {
    return fetch(`${this._baseUrl}/cards/like/${cardID}`, {
      method: like ? "PUT" : "DELETE",
      headers: this._headers,
    }).then(this._handleServerResponse);
  }
  /*likeCard(cardID) {
    return fetch(`${this._baseUrl}/cards/like/${cardID}`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._handleServerResponse);
  }
  unlikeCard(cardID) {
    return fetch(`${this._baseUrl}/cards/like/${cardID}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._handleServerResponse);
  }*/
}
