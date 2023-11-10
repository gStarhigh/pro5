// React imports
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import InfiniteScroll from "react-infinite-scroll-component";

// React Bootstrap imports
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { Button, Image } from "react-bootstrap";

// Styles
import styles from "../../styles/ProfilePage.module.css";
import btnStyles from "../../styles/Button.module.css";

// My own imports
import { axiosReq } from "../../api/axiosDefaults";
import Loader from "../../components/Spinner";
import Post from "../posts/Post";
import { fetchMoreData } from "../../utils/utils";
import NoResults from "../../assets/no-results.png";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import {
  useProfileData,
  useSetProfileData,
} from "../../contexts/ProfileDataContext";
import { ProfileEditDropdown } from "../../components/MoreDropdown";
import ContactList from "../contact/ContactList";

function ProfilePage() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [profilePosts, setProfilePosts] = useState({ results: [] });

  const currentUser = useCurrentUser();
  const { id } = useParams();

  const { setProfileData, handleFollow, handleUnfollow } = useSetProfileData();
  const { pageProfile } = useProfileData();

  const [profile] = pageProfile.results;
  const is_owner = currentUser?.username === profile?.owner;

  const [showContactList, setShowContactList] = useState(false);
  const toggleContactList = () => {
    setShowContactList(!showContactList);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{ data: pageProfile }, { data: profilePosts }] =
          await Promise.all([
            axiosReq.get(`/profiles/${id}/`),
            axiosReq.get(`/posts/?owner__profile=${id}`),
          ]);
        setProfileData((prevState) => ({
          ...prevState,
          pageProfile: { results: [pageProfile] },
        }));
        setProfilePosts(profilePosts);
        setHasLoaded(true);
      } catch (err) {}
    };
    fetchData();
  }, [id, setProfileData]);

  const mainProfile = (
    <>
      {profile?.is_owner && <ProfileEditDropdown id={profile?.id} />}
      <Row noGutters className="px-3 text-center">
        <Col lg={3} className="text-lg-left">
          <Image
            className={styles.ProfileImage}
            roundedCircle
            src={profile?.image}
          />
        </Col>
        <Col lg={6}>
          <h3 className="m-2">{profile?.owner}</h3>
          <Row className="justify-content-center no-gutters">
            <Col xs={3} className="my-2">
              <div>{profile?.posts_count}</div>
              <div>Posts</div>
            </Col>
            <Col xs={3} className="my-2">
              <div>{profile?.followers_count}</div>
              <div>Subscribers</div>
            </Col>
            <Col xs={3} className="my-2">
              <div>{profile?.following_count}</div>
              <div>Following</div>
            </Col>
          </Row>
        </Col>
        <Col lg={3} className="text-lg-right">
          {currentUser &&
            !is_owner &&
            (profile?.following_id ? (
              <Button
                className={`${btnStyles.Button} ${btnStyles.BlueOutline}`}
                onClick={() => handleUnfollow(profile)}
              >
                Unsubscribe
              </Button>
            ) : (
              <Button
                className={`${btnStyles.Button} ${btnStyles.Grey}`}
                onClick={() => handleFollow(profile)}
              >
                Subscribe
              </Button>
            ))}
        </Col>
        {profile?.content && <Col className="p-3">{profile.content}</Col>}
      </Row>
    </>
  );

  const mainProfilePosts = (
    <>
      <div className="text-center">
        <Button
          onClick={toggleContactList}
          className={`${btnStyles.Button} ${btnStyles.Blue}`}
        >
          My Tickets
        </Button>
        {showContactList && <ContactList />}
      </div>
      <hr />
      <p className="text-center">{profile?.owner}'s posts</p>
      <div className="justify-content-center">
        {profilePosts.results.length ? (
          <InfiniteScroll
            children={profilePosts.results.map((post) => (
              <Post key={post.id} {...post} setPosts={setProfilePosts} />
            ))}
            dataLength={profilePosts.results.length}
            loader={<Loader spinner />}
            hasMore={!!profilePosts.next}
            next={() => fetchMoreData(profilePosts, setProfilePosts)}
          />
        ) : (
          <Container className="text-center">
            <Loader
              src={NoResults}
              message={`No results found, ${profile?.owner} hasn't posted yet.`}
            />
          </Container>
        )}
      </div>
    </>
  );

  return (
    <Row className={styles.Container}>
      <Col className="py-2 p-0 p-lg-2">
        <Container className={styles.Content}>
          {hasLoaded ? (
            <>
              {mainProfile}
              {mainProfilePosts}
            </>
          ) : (
            <Container className="text-center justify-content-center">
              <Loader spinner />
              <p>Loading...</p>
            </Container>
          )}
        </Container>
      </Col>
    </Row>
  );
}

export default ProfilePage;
