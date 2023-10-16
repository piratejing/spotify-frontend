const CLIENT_ID = "2b4eaa7504444768a304059a1bc8955e";
const REDIRECT_URL = window.location.origin;
const SPOTIFY_URL = "https://api.spotify.com/v1/";
const SCOPE = "user-read-private user-read-email user-top-read";

const SPOTIFY_LOCAL_STORAGE_KEY = "spotify_token";
const SPOTIFY_VERIFIER_STORAGE_KEY = "spotify_verifier";

class Spotify {
  token = null;
  code = null;
  loggedIn = false;
  gettingToken = false;

  async init() {
    if (this.token) {
      return;
    }
    // First check if we already have a token to login with
    const token = localStorage.getItem(SPOTIFY_LOCAL_STORAGE_KEY);
    if (token) {
      this.token = token;
      this.setLogin(true);
    } else {
      // If not, check if oauth is coming back with a code
      // we can use to get a token when we login
      const params = new URLSearchParams(window.location.search);
      this.code = params.get("code");
      this.setLogin(!!this.code);
      if (!!this.code) {
        await this.getAccessToken();
      }
    }
  }

  setLogin(value) {
    this.loggedIn = value;
    this.onLogIn(value);
  }
  onLogIn(value) {}

  async login() {
    if (this.token) {
      // If we already have a token then we are logged in
      this.setLogin(true);
    } else {
      // Otherwise, redirect to Spotify to login
      this.redirectToAuthCodeFlow();
    }
  }

  async logout() {
    localStorage.removeItem(SPOTIFY_LOCAL_STORAGE_KEY);
    localStorage.removeItem(SPOTIFY_VERIFIER_STORAGE_KEY);
    this.token = null;
    this.setLogin(false);
    this.code = null;
    window.history.replaceState(null, null, window.location.pathname);
  }

  async get(endpoint) {
    if (!this.token) {
      return;
    }
    const result = await fetch(`${SPOTIFY_URL}${endpoint}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${this.token}` },
    });
    if (result.ok) {
      return await result.json();
    } else {
      throw new Error(`error ${result.status}`);
    }
  }

  // Get the top tracks for the logged in user
  async topTracks() {
    const res = await this.get("me/top/tracks");
    return res?.items?.map((track) => {
      return {
        name: track.name,
        image: track.album.images[0].url,
        artist: track.artists.map((artist) => artist.name).join(", "),
      };
    });
  }

  async recommended() {
    const res = await this.get("recommendations?seed_genres=pop");
    return res?.tracks?.map((track) => {
      return {
        name: track.album.name,
        image: track.album.images[0].url,
        artist: track.album.artists[0].name,
      };
    });
  }

  // Get the profile for the logged in user
  async profile() {
    return this.get("me");
  }

  async getAccessToken() {
    if (this.token || this.gettingToken) {
      return;
    }
    this.gettingToken = true;
    const p = new URLSearchParams(window.location.search);
    const code = p.get("code");
    if (!code) {
      return;
    }

    const verifier = localStorage.getItem(SPOTIFY_VERIFIER_STORAGE_KEY);

    const params = new URLSearchParams();
    params.append("client_id", CLIENT_ID);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", REDIRECT_URL);
    params.append("code_verifier", verifier);

    const result = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params,
    });

    const { access_token } = await result.json();
    localStorage.setItem(SPOTIFY_LOCAL_STORAGE_KEY, access_token);
    this.token = access_token;

    setTimeout(() => {
      window.history.replaceState(null, null, window.location.pathname);
    }, 100);

    this.gettingToken = false;

    return access_token;
  }

  async redirectToAuthCodeFlow() {
    const verifier = this.generateCodeVerifier(128);
    const challenge = await this.generateCodeChallenge(verifier);

    localStorage.setItem(SPOTIFY_VERIFIER_STORAGE_KEY, verifier);

    const params = new URLSearchParams();
    params.append("client_id", CLIENT_ID);
    params.append("response_type", "code");
    params.append("redirect_uri", REDIRECT_URL);
    params.append("scope", SCOPE);
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);

    document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
  }

  generateCodeVerifier(length) {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  async generateCodeChallenge(codeVerifier) {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest("SHA-256", data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  }
}

const spotify = new Spotify();
export default spotify;
