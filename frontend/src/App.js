// React imports
import { createContext } from "react";
import { Route, Switch } from "react-router-dom";

// React Bootstrap imports
import Container from "react-bootstrap/Container";

// My own imports
import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import PostCreateForm from "./pages/posts/PostCreateForm";
import PostPage from "./pages/posts/PostPage";
import PostsPage from "./pages/posts/PostsPage";
import PostEditForm from "./pages/posts/PostEditForm";
import PrivateRoute from "./pages/auth/PrivateRoute";
import { useCurrentUser } from "./contexts/CurrentUserContext";
import ProfilePage from "./pages/profiles/ProfilePage";
import UsernameForm from "./pages/profiles/UsernameForm";
import UserPasswordForm from "./pages/profiles/UserPasswordForm";
import ProfileEditForm from "./pages/profiles/ProfileEditForm";
import ContactForm from "./pages/contact/ContactForm";
import CreateInformation from "./pages/information/CreateInformation";
import EditInformation from "./pages/information/EditInformation";
import ContactEditForm from "./pages/contact/ContactEditForm";
import { AlertProvider } from "./contexts/AlertContext";
import NotFound from "./components/NotFound";

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";

  return (
    <AlertProvider>
      <div className={styles.App}>
        <NavBar />
        <Container className={styles.Main}>
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <PostsPage message="No results found. Adjust the search keyword." />
              )}
            />
            <Route
              exact
              path="/feed"
              render={() => (
                <PostsPage
                  message="No results found. Adjust the search keyword or follow a user."
                  filter={`owner__followed__owner__profile=${profile_id}&`}
                />
              )}
            />
            <Route
              exact
              path="/liked"
              render={() => (
                <PostsPage
                  message="No results found. Adjust the search keyword or like a post."
                  filter={`likes__owner__profile=${profile_id}&ordering=-likes__created_at&`}
                />
              )}
            />
            <Route exact path="/signin" render={() => <SignInForm />} />
            <Route exact path="/signup" render={() => <SignUpForm />} />

            <PrivateRoute exact path="/tickets" component={ContactForm} />
            <PrivateRoute
              exact
              path="/tickets/:id/edit"
              component={ContactEditForm}
            />
            <PrivateRoute
              exact
              path="/posts/create"
              component={PostCreateForm}
            />
            <Route exact path="/posts/:id" component={PostPage} />
            <PrivateRoute
              exact
              path="/posts/:id/edit"
              component={PostEditForm}
            />
            <PrivateRoute exact path="/profiles/:id" component={ProfilePage} />
            <PrivateRoute
              exact
              path="/information/:id/edit"
              component={EditInformation}
            />
            <PrivateRoute
              exact
              path="/createinformation"
              component={CreateInformation}
            />
            <Route
              exact
              path="/profiles/:id/edit/username"
              render={() => <UsernameForm />}
            />
            <Route
              exact
              path="/profiles/:id/edit/password"
              render={() => <UserPasswordForm />}
            />
            <Route
              exact
              path="/profiles/:id/edit"
              render={() => <ProfileEditForm />}
            />
            <Route render={() => <NotFound />} />
          </Switch>
        </Container>
      </div>
    </AlertProvider>
  );
}

export default App;
