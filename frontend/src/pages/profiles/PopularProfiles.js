import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Loader from "../../components/Spinner";
import styles from "../../styles/PostsPage.module.css";

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
    <Container>
      <p>Most followed profiles</p>
      {popularProfiles.results.length ? (
        <>
          {popularProfiles.results.map((profile) => (
            <p key={profile.id}>{profile.owner}</p>
          ))}
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
