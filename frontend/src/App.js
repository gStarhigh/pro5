import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import { Container } from "react-bootstrap";
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";

function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.main}>
        <Switch>
          <Route exact path="/" render={() => <h1>Home Page</h1>}></Route>
          <Route exact path="/signin" render={() => <h1>Sign in Page</h1>} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route exact path="/contact" render={() => <h1>Contact Page</h1>} />
          <Route
            render={() => <h1 className="text-center">Page Not Found</h1>}
          ></Route>
        </Switch>
      </Container>
    </div>
  );
}

export default App;
