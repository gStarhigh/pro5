// React imports
import React, { useEffect, useRef, useState, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
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
import { axiosReq } from "../../api/axiosDefaults";
import { AlertContext } from "../../contexts/AlertContext";

function PostEditForm() {
  const [errors, setErrors] = useState({});
  const { setAlert } = useContext(AlertContext);
  const [postData, setPostData] = useState({
    title: "",
    description: "",
    content: "",
    image: "",
  });
  const { title, description, content } = postData;

  const imageInput = useRef(null);
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/${id}/`);
        const { title, description, content, image, is_owner } = data;

        is_owner
          ? setPostData({ title, content, description, image })
          : history.push("/");
      } catch (err) {}
    };

    handleMount();
  }, [history, id]);

  const handleChange = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = async (event) => {
    if (event.target.files.length) {
      if (postData.image) {
        URL.revokeObjectURL(postData.image);
      }

      try {
        const resizedImageFile = await resizeFile(event.target.files[0]);
        const resizedImageURL = URL.createObjectURL(resizedImageFile);
        setPostData({
          ...postData,
          image: resizedImageURL,
          file: resizedImageFile,
        });
      } catch (err) {}
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

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("content", content);
    if (postData.file) {
      formData.append("image", postData.file);
    }

    try {
      const { data } = await axiosReq.put(`/posts/${id}/`, formData);
      setAlert("Your post was updated!");
      history.push(`/posts/${data.id}`);
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
        onClick={() => history.goBack()}
      >
        Cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
        Save
      </Button>
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
          <Container
            className={`${styles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <Form.Group className="text-center">
              <figure>
                <Image className={styles.Image} src={postData.image} rounded />
              </figure>
              <div>
                <Form.Label
                  className={`${btnStyles.Button} ${btnStyles.Blue} btn`}
                  htmlFor="image-upload"
                >
                  Change the image
                </Form.Label>
              </div>
            </Form.Group>
            {errors?.image?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
            <Form.File
              className="d-none"
              id="image-upload"
              accept="image/*"
              onChange={handleChangeImage}
              ref={imageInput}
            />

            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>
        <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
          <Container className={styles.Content}>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
}

export default PostEditForm;
