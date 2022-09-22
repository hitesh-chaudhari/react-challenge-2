import React, { Component } from "react";
import DiscoverBlock from "./DiscoverBlock/components/DiscoverBlock";
import axios from "axios";
import "../styles/_discover.scss";
import config from "../../../config";

axios.defaults.baseURL = config.api.baseUrl;

export default class Discover extends Component {
  constructor() {
    super();

    this.state = {
      newReleases: [],
      playlists: [],
      categories: [],
    };
  }

  componentDidMount() {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const getPlaylists = axios.get(`/browse/featured-playlists`);
    const getCategories = axios.get(`/browse/categories`);
    const getNewReleases = axios.get(`/browse/new-releases`);

    Promise.all([getNewReleases, getPlaylists, getCategories])
      .then((response) => {
        const newReleases = response[0].data.albums.items;
        const playlists = response[1].data.playlists.items;
        const categories = response[2].data.categories.items;
        this.setState({ newReleases, playlists, categories });
      })
      .catch((e) => {
        console.log("e", e);
      });
  }

  render() {
    const { newReleases, playlists, categories } = this.state;

    return (
      <div className="discover">
        <DiscoverBlock
          text="RELEASED THIS WEEK"
          id="released"
          data={newReleases}
        />
        <DiscoverBlock
          text="FEATURED PLAYLISTS"
          id="featured"
          data={playlists}
        />
        <DiscoverBlock
          text="BROWSE"
          id="browse"
          data={categories}
          imagesKey="icons"
        />
      </div>
    );
  }
}
