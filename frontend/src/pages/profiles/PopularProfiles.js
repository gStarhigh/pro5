import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Loader from "../../components/Spinner";
import styles from "../../styles/PostsPage.module.css";
import rowStyles from "../../styles/NavigationButtons.module.css";
import Profile from "./Profile";

const PopularProfiles = () => {
  const [profileData, setProfileData] = useState({
    pageProfile: { results: [] },
    popularProfiles: { results: [] },
  });

  const { popularProfiles } = profileData;
  const currentUser = useCurrentUser();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(
          "/profiles/?ordering=-followers_count"
        );
        setProfileData((prevState) => ({
          ...prevState,
          popularProfiles: data,
        }));
      } catch (err) {}
    };
    handleMount();
  }, [currentUser]);

  return (
    <Container className={rowStyles.Row}>
      {popularProfiles.results.length ? (
        <>
          <p>Most followed profiles</p>
          <div className="d-flex flex-wrap justify-content-around">
            {" "}
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
