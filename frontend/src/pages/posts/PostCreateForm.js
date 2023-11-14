// React imports
import React, { useRef, useState, useContext } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Resizer from "react-image-file-resizer";

// React Bootstrap imports
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";

// Styles
import styles from "../../styles/PostCreateEditForm.module.css";
import btnStyles from "../../styles/Button.module.css";

// My own imports
import Upload from "../../assets/upload.png";
import Loader from "../../components/Spinner";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { AlertContext } from "../../contexts/AlertContext";

function PostCreateForm() {
  const currentUser = useCurrentUser();
  const [errors, setErrors] = useState({});
  const { setAlert } = useContext(AlertContext);

  const [postData, setPostData] = useState({
    title: "",
    description: "",
    content: "",
    image: "",
  });
  const { title, content, description, image } = postData;

  const imageInput = useRef(null);
  const history = useHistory();

  const handleChange = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = async (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);

      try {
        const resizedImage = await resizeFile(event.target.files[0]);
        console.log("Resized image URI:", resizedImage);

        setPostData({
          ...postData,
          image: resizedImage,
        });
      } catch (error) {
        console.error("Error resizing image:", error);
      }
    }
  };

  // Credit: https://medium.com/@impulsejs/convert-dataurl-to-a-file-in-javascript-1921b8c3f4b
  const dataURLtoFile = (dataURL, fileName) => {
    const arr = dataURL.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], fileName, { type: mime });
  };

  // Credit: https://www.npmjs.com/package/react-image-file-resizer
  const resizeFile = async (file) => {
    return new Promise((resolve, reject) => {
      Resizer.imageFileResizer(
        file,
        1024,
        1024,
        "PNG",
        100,
        0,
        (uri) => {
          const resizedFile = dataURLtoFile(uri, "resizedImage.png");
          resolve(resizedFile);
        },
        "base64"
      );
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!currentUser) {
      history.push("/signin");
      return;
    }
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("content", content);
    formData.append("image", postData.image);

    try {
      const { data } = await axiosReq.post("/posts/", formData);
      history.push(`/posts/${data.id}`);
      setAlert("Your post was created!");
    } catch (err) {
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  const textFields = (
    <div className="text-center">
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={title}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.title?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={2}
          name="description"
          value={description}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.description?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Content</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          name="content"
          value={content}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.content?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Button
        className={`${btnStyles.Button} ${btnStyles.Grey}`}
        onClick={() => {
          history.goBack();
        }}
      >
        Cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
        Post
      </Button>
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-2 p-0 p-md-2">
          <Container
            className={`${styles.Content} ${styles.Container} 
            d-flex flex-column justify-content-center`}
          >
            <Form.Group className="text-center">
              {image ? (
                <>
                  <figure>
                    <Image
                      className={styles.Image}
                      src={URL.createObjectURL(image)}
                      rounded
                    ></Image>
                  </figure>
                  <div>
                    <Form.Label
                      className={`${btnStyles.Button} ${btnStyles.Blue} btn`}
                      htmlFor="image-upload"
                    >
                      Change the image
                    </Form.Label>
                  </div>
                </>
              ) : (
                <Form.Label
                  className="d-flex justify-content-center"
                  htmlFor="image-upload"
                >
                  <Loader
                    src={Upload}
                    message="Click or tap to upload an image"
                  />
                </Form.Label>
              )}

              <Form.File
                className="d-none"
                id="image-upload"
                accept="image/*"
                onChange={handleChangeImage}
                ref={imageInput}
              />
            </Form.Group>
            {errors?.image?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
            <div>{textFields}</div>
          </Container>
        </Col>
      </Row>
    </Form>
  );
}

export default PostCreateForm;
