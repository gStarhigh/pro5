import React from "react";
import { Container } from "react-bootstrap";

import Loader from "../../components/Spinner";
import Profile from "./Profile";
import { useProfileData } from "../../contexts/ProfileDataContext";

import styles from "../../styles/PostsPage.module.css";
import rowStyles from "../../styles/NavigationButtons.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

const PopularProfiles = () => {
  const { popularProfiles } = useProfileData();
  const currentUser = useCurrentUser();

  const filteredProfiles = popularProfiles.results.filter(
    (profile) =>
      profile.owner.toLowerCase() !== currentUser?.username.toLowerCase()
  );

  return (
    <Container className={rowStyles.Row}>
      {popularProfiles.results.length ? (
        <>
          <h4 className="text-center">Most followed profiles</h4>
          <div className="d-flex flex-wrap justify-content-around">
            {filteredProfiles.slice(0, 6).map((profile) => (
              <Profile key={profile.id} profile={profile} />
            ))}
          </div>
        </>
      ) : (
        <Container className={styles.Content}>
          <Loader spinner />
          <p>Loading...</p>
        </Container>
      )}
    </Container>
  );
};

export default PopularProfiles;
