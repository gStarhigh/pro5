import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import { Container } from "react-bootstrap";
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import { createContext } from "react";
import PostCreateForm from "./pages/posts/PostCreateForm";
import PostPage from "./pages/posts/PostPage";
import PostsPage from "./pages/posts/PostsPage";
import PostEditForm from "./pages/posts/PostEditForm";
import PrivateRoute from "./pages/auth/PrivateRoute";
import { useCurrentUser } from "./contexts/CurrentUserContext";
import ProfilePage from "./pages/profiles/ProfilePage";

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";

  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.main}>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <PostsPage message="No results found. Adjust the search keyword." />
            )}
          />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route exact path="/contact" render={() => <h1>Contact Page</h1>} />
          <Route exact path="/posts/:id" component={PostPage} />
          <PrivateRoute exact path="/posts/create" component={PostCreateForm} />
          <PrivateRoute exact path="/posts/:id/edit" component={PostEditForm} />
          <PrivateRoute
            exact
            path="/feed"
            component={PostsPage}
            filter={`owner__followed__owner__profile=${profile_id}&`}
          />
          <PrivateRoute
            exact
            path="/liked"
            component={PostsPage}
            filter={`likes__owner__profile=${profile_id}&ordering=-likes__created_at&`}
          />
          <PrivateRoute exact path="/profiles/:id" component={ProfilePage} />
          <Route
            render={() => <h1 className="text-center">Page Not Found</h1>}
          />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
