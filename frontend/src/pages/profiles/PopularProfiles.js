import React from "react";
import { Container } from "react-bootstrap";

import Loader from "../../components/Spinner";
import Profile from "./Profile";
import { useProfileData } from "../../contexts/ProfileDataContext";

import styles from "../../styles/PostsPage.module.css";
import rowStyles from "../../styles/NavigationButtons.module.css";

const PopularProfiles = () => {
  const { popularProfiles } = useProfileData();

  return (
    <Container className={rowStyles.Row}>
      {popularProfiles.results.length ? (
        <>
          <p>Most followed profiles</p>
          <div className="d-flex flex-wrap justify-content-around">
            {popularProfiles.results.slice(0, 6).map((profile) => (
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
