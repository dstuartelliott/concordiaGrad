import React from "react";
import "./App.css";
// import styled from "styled-components/macro";
import styled from "styled-components/macro";
// import enTranslations from "@shopify/polaris/locales/en.json";

import { useDispatch } from "react-redux";

import PodcastEpisodeHome from "./PodcastEpisodeHome";
import PodcastSearch from "./PodcastSearch";

import { DatabaseContext } from "./Contexts/DatabaseContext";

import {
  updateShouldTranslationsAutoPlay,
  updateClickMeHasBeenClicked,
} from "./actions";

import { markEnglishAsPlaying, changeTranslation } from "./actions";
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
  //eslint-disable-next-line
  const dispatch = useDispatch();

  // const customReporter = (target) => ({
  //   clientWidth: target != null ? target.clientWidth : null,
  // });
  const databaseContext = React.useContext(DatabaseContext);
  // const [resizeAppListener, sizesApp] = useResizeAware();

  //test

  React.useEffect(() => {
    dispatch(markEnglishAsPlaying(0.0, "TBD"));
    dispatch(changeTranslation(true));
    dispatch(updateShouldTranslationsAutoPlay(true));
    dispatch(updateClickMeHasBeenClicked(false));

    async function getGoogle() {
      if (window.gapi !== undefined) {
        window.gapi.load("auth2", async function () {
          let auth_object = await window.gapi.auth2.init({
            client_id:
              "112704103478-qojm07it64b672dk2mto976ivf6592jm.apps.googleusercontent.com",
          });

          let current_user = auth_object.currentUser.get();

          let id_token = current_user.getAuthResponse().id_token;

          // eslint-disable-next-line
          let verified_token1 = await databaseContext.getVerifiedTokenLocal(
            id_token
          );

          // eslint-disable-next-line
          let verified_in_db = await databaseContext.verifyTokenAndSlapItIntoDatabase(
            id_token
          );
        });
      }
    }

    getGoogle();

    // window.gapi.load("auth2", () => {
    //   this.auth2 = gapi.auth2.init({
    //     client_id: "YOUR_CLIENT_ID",
    //   });
    // });

    // eslint-disable-next-line
  }, []);

  const [profileName, setProfileName] = React.useState("none");

  // eslint-disable-next-line
  function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    // var id_token = googleUser.getAuthResponse().id_token;

    console.log("ID: " + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log("Name: " + profile.getName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail()); // This is null if the 'email' scope is not present.
    // console.log("Email: " + id_token); // This is null if the 'email' scope is not present.

    setProfileName(profile.getName());
  }

  return (
    <FleXApp className="App">
      <AppProvider i18n={enTranslations}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <PodcastEpisodeHome></PodcastEpisodeHome>
            </Route>
            <Route path="/podcastsearch">
              <PodcastSearch />
            </Route>
          </Switch>
        </BrowserRouter>

        <BottomElement>
          <div className="g-signin2" data-onsuccess="onSignIn"></div>
          {profileName}
        </BottomElement>
      </AppProvider>
    </FleXApp>
  );
  // }
}

const FleXApp = styled.div`
  min-width: 500px;
  max-width: 900px;
  margin: auto;
`;

const BottomElement = styled.div`
  background-color: blue;
  bottom: 0px;
  position: absolute;
`;

export default App;
