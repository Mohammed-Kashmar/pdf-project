import "./LastNews.css";
import NavBarRed from "../utility/NabBarRed/NavBarRed";
import AdminHeader from "../utility/Header/Header";
import { Fragment, useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useGetData } from "../../../../hooks/useGetData";
import { Col, Form, Modal, Row, Spinner } from "react-bootstrap";
import ImageGallery from "react-image-gallery";
import MultiImageInput from "react-multiple-image-input";
import "regenerator-runtime";
import notify from "../../utility/useNotification";
import {
  useInsertData,
  useInsertDataWithImage,
} from "../../../../hooks/useInsertData";
import { ToastContainer } from "react-toastify";
import avatar from "../../../../images/avatar.png";
import {useDeleteData} from "../../../../hooks/useDeleteData";
import Pagination from "../utility/pagination/Pagination";
// import { useDeleteData } from "../../../../hooks/useDeleteData";

const initialState = {
  admin_id: "",
  title: "",
  description: "",
  "images[0]": null,
};
const LastNews = () => {
  const [formData, setFormData] = useState(initialState);
  const [loadingFirst, setLoadingFirst] = useState(true);
  const [posts, setPosts] = useState([]);
  const [show, setShow] = useState(false);
  const [addPost, setAddPost] = useState(false);
  const [editPost, setEditPost] = useState(false);
  const [imgs, setImgs] = useState([]);
  const [isPress, setIsPress] = useState(false);
  const [images_product, setImages_product] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFile2, setSelectedFile2] = useState(null);
  const [selectedFile3, setSelectedFile3] = useState(null);
  const [img, setImg] = useState(avatar);
  const [img2, setImg2] = useState(avatar);
  const [img3, setImg3] = useState(avatar);
  const [showDelete, setShowDelete] = useState(false);

  const handleCloseDelete = () => setShowDelete(null);
  const handleShowDelete = (id) => setShowDelete(id);

  const handleClose = () => setShow(false);
  const handleShow = (post) => {
    let acc = [];
    acc = post.post_images.map((post) => {
      return {
        original: `https://api-rating.watanyia.com/storage/${post.location}`,
      };
    });
    setShow(post);
    setImgs(acc);
  };


  const handleCloseAddPost = () => setAddPost(false);
  const handleShowAddPost = () => setAddPost(true);

  const handleCloseEditPost = () => setEditPost(false);
  const handleShowEditPost = async (post) => {
    setEditPost(post);
    setImg(avatar);
    setImg2(avatar);
    setImg3(avatar);
    const res = await useGetData(`/admin_api/show_one_post?postId=${post.id}`);
    console.log(res);
    setFormData({
      title: res.data.data.title || initialState.title,
      description: res.data.data.description || initialState.description,
    });
    let acc = [];
    acc = res.data.data.post_images.map((post) => {
      return [`https://api-rating.watanyia.com/storage/${post.location}`];
    });
    setImages_product(acc);

    setImg(
      `https://api-rating.watanyia.com/storage/${res.data.data.post_images[0].location}`
    );
    setImg2(
      `https://api-rating.watanyia.com/storage/${res.data.data.post_images[1].location}`
    );
    setImg3(
      `https://api-rating.watanyia.com/storage/${res.data.data.post_images[2].location}`
    );

    setSelectedFile(null);
    setSelectedFile2(null);
    setSelectedFile3(null);
  };

  const userData = JSON.parse(localStorage.getItem("user"));
  const fetchData = async (page) => {
    setLoadingFirst(true);
    const res = await useGetData(
      `/admin_api/show_posts?adminId=${userData.id}&page=${page}`
    );
    setLoadingFirst(false);
    console.log(res);
    if (res.status === 200) {
      setPosts(res);
    } else {
      setPosts([]);
    }
    console.log(res);
  };
  useEffect(() => {
    fetchData("");
  }, []);
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    const newValue = type === "file" ? files[0] : value;
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  const handleSubmitAddPost = async (e) => {
    e.preventDefault();
    const userData = JSON.parse(localStorage.getItem("user"));

    const itemImages = Array.from(
      Array(Object.keys(images_product).length).keys()
    ).map((item, index) => {
      return dataURLtoFile(images_product[index], Math.random() + ".png");
    });

    let updatedFormData = { ...formData };
    itemImages.forEach((file, index) => {
      updatedFormData = {
        ...updatedFormData,
        [`images[${index}]`]: file,
      };
    });
    updatedFormData = {
      ...updatedFormData,
      admin_id: userData.id,
    };

    console.log(updatedFormData);

    if (
      formData.title === "" ||
      formData.description === "" ||
      updatedFormData["images[0]"] === null
    ) {
      notify("Please Enter Data", "error");
      return;
    }

    setIsPress(true);

    const response = await useInsertDataWithImage(
      `/admin_api/add_post`,
      updatedFormData
    );
    console.log(response.data);
    if (response.data.success === true) {
      notify(response.data.message, "success");
      setFormData(initialState);
      setImages_product([]);
      handleCloseAddPost();
      fetchData("");
    } else {
      notify(response.data.message, "error");
    }
    setIsPress(false);
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImg(URL.createObjectURL(event.target.files[0]));
      setSelectedFile(event.target.files[0]);
    }
  };
  const onImageChange2 = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImg2(URL.createObjectURL(event.target.files[0]));
      setSelectedFile2(event.target.files[0]);
    }
  };
  const onImageChange3 = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImg3(URL.createObjectURL(event.target.files[0]));
      setSelectedFile3(event.target.files[0]);
    }
  };

  const handleClickCancelImage = async (id, idImg) => {
    const response = await useDeleteData(
      `/admin_api/delete_post_image?imageId=${idImg}`
    );
    if (response.data.success === true) {
      notify(response.data.message, "success");
      if (id === 1) {
        setImg(avatar);
        setSelectedFile(null);
      } else if (id === 2) {
        setImg2(avatar);
        setSelectedFile2(null);
      } else if (id === 3) {
        setImg3(avatar);
        setSelectedFile3(null);
      }
    } else {
      notify(response.data.message, "error");
    }
    console.log(response);
  };

  const handleSubmitEditPost = async (e) => {
    e.preventDefault();

    const formDataForImage = new FormData();
    selectedFile && formDataForImage.append("images[0]", selectedFile);
    selectedFile2 && formDataForImage.append("images[1]", selectedFile2);
    selectedFile3 && formDataForImage.append("images[2]", selectedFile3);

    let updatedFormData = { ...formData };
    delete updatedFormData["images[0]"];

    const responseOne = await useInsertData(
      `/admin_api/update_post?postId=${editPost.id}`,
      updatedFormData
    );
    if (responseOne.data.success === true) {
      notify(responseOne.data.message, "success");
      handleCloseEditPost();
    } else {
      notify(responseOne.data.message, "error");
    }
    console.log(responseOne.data);

    const formDataEntries = [...formDataForImage.entries()];
    if (formDataEntries.length > 0) {
      const responseTwo = await useInsertDataWithImage(
        `/admin_api/add_post_images?postId=${editPost.id}`,
        formDataForImage
      );
      if (responseTwo.data.success === true) {
        notify(responseTwo.data.message, "success");
      } else {
        notify(responseTwo.data.message, "error");
      }
      
      console.log(responseTwo.data);
    }
    fetchData('');
  };

  const handleDeletePost = async (id) => {
    setIsPress(true);
    const response = await useDeleteData(`/admin_api/delete_post?postId=${id}`);
    setIsPress(false)
    if (response.data.success === true) {
      notify(response.data.message, "success");
      handleCloseDelete();
      fetchData('');
    } else {
      notify(response.data.message, "error");
    }
  };

  const onPress = async (page) => {
    fetchData(page);
  };

  return (
    <Fragment>
      <NavBarRed />

      <AdminHeader
        text="أخر الأخبار"
        btnText="اضافة خبر"
        onButtonClick={handleShowAddPost}
      />
      <div className="table-responsive table_container">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">عنوان الخبر</th>
              <th scope="col">تاريخ الخبر</th>
              <th scope="col">الحدث</th>
            </tr>
          </thead>
          {loadingFirst === false ? (
            <tbody>
              {posts &&
              posts.data &&
              posts.data.data &&
              posts.data.data.length > 0 ? (
                posts.data.data.map((post) => {
                  return (
                    <tr key={post.id}>
                      <td>{post.title}</td>
                      <td>{new Date(post.created_at).toLocaleString()}</td>
                      <td>
                        <FaEye onClick={() => handleShow(post)} />
                        <MdEdit onClick={() => handleShowEditPost(post)} />
                        <MdDelete onClick={() => handleShowDelete(post.id)} />
                      </td>
                    </tr>
                  ); 
                })
              ) : (
                <tr>
                  <td colSpan="3">
                    <p className="my-5">لا توجد بيانات</p>
                  </td>
                </tr>
              )}
              
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td colSpan="3">
                  <div className="my-4 text-center">
                    <p className="mb-2">جار التحميل</p>
                    <Spinner
                      className="m-auto"
                      animation="border"
                      role="status"
                    ></Spinner>
                  </div>
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>

      {posts && posts.data && posts.data.last_page > 1 ? (
        <Pagination onPress={onPress} pageCount={posts.data.last_page} />
      ) : null}

      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header className="d-flex justify-content-center">
          <Modal.Title>{show.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="row">
              <div className="col p-4 d-flex justify-content-center">
                <ImageGallery
                  items={imgs}
                  showFullscreenButton={false}
                  isRTL={true}
                  showPlayButton={false}
                  showThumbnails={false}
                  lazyLoad={true}
                />
              </div>
              <div className="col p-4 d-flex justify-content-center">
                <p className="text-capitalize"> {show.description}</p>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        show={addPost}
        onHide={handleCloseAddPost}
        animation={false}
        centered
        size="lg"
      >
        <Modal.Header className="d-flex justify-content-center">
          <Modal.Title>أضافة خبر</Modal.Title>
        </Modal.Header>
        <Form className="post_form" onSubmit={handleSubmitAddPost}>
          <Modal.Body>
            <Form.Group
              as={Row}
              className="mb-3 align-items-center"
              style={{ flexDirection: "row-reverse" }}
            >
              <Form.Label column className="col-2">
                :العنوان
              </Form.Label>
              <Col className="col-10">
                <Form.Control
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  dir="rtl"
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3 align-items-center"
              style={{ flexDirection: "row-reverse" }}
            >
              <Form.Label column className="col-2">
                :الوصف
              </Form.Label>
              <Col className="col-10">
                <Form.Control
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  dir="rtl"
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3 align-items-center"
              style={{ flexDirection: "row-reverse" }}
            >
              <Form.Label column className="col-2">
                :الصور
              </Form.Label>
              <Col className="col-10">
                <MultiImageInput
                  images={images_product}
                  setImages={setImages_product}
                  theme={"light"}
                  allowCrop={false}
                  max={3}
                />
              </Col>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn_cancel" onClick={handleCloseAddPost}>
              تجاهل
            </button>

            {isPress ? (
              <button className="btn_save" disabled>
                <Spinner
                  className="m-auto"
                  animation="border"
                  role="status"
                ></Spinner>
              </button>
            ) : (
              <button type="submit" className="btn_save">
                حفظ
              </button>
            )}
          </Modal.Footer>
        </Form>
      </Modal>

      <Modal
        show={editPost}
        onHide={handleCloseEditPost}
        animation={false}
        centered
        size="lg"
      >
        <Modal.Header className="d-flex justify-content-center">
          <Modal.Title>تعديل خبر</Modal.Title>
        </Modal.Header>
        <Form className="post_form" onSubmit={handleSubmitEditPost}>
          <Modal.Body>
            <Form.Group
              as={Row}
              className="mb-3 align-items-center"
              style={{ flexDirection: "row-reverse" }}
            >
              <Form.Label column className="col-2">
                :العنوان
              </Form.Label>
              <Col className="col-10">
                <Form.Control
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  dir="rtl"
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-5 align-items-center"
              style={{ flexDirection: "row-reverse" }}
            >
              <Form.Label column className="col-2">
                :الوصف
              </Form.Label>
              <Col className="col-10">
                <Form.Control
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  dir="rtl"
                />
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              className="mb-5 align-items-center"
              style={{ flexDirection: "row-reverse" }}
            >
              <Form.Label column className="col-2">
                :الصور
              </Form.Label>
              <Col className="d-flex flex-column justify-content-start align-items-center">
                <label
                  className="cancel_image"
                  onClick={() =>
                    handleClickCancelImage(1, editPost.post_images[0].id)
                  }
                >
                  x
                </label>

                <label htmlFor="upload-photo">
                  <img
                    src={img}
                    alt="click"
                    height="100px"
                    width="120px"
                    style={{ cursor: "pointer" }}
                  ></img>
                </label>
                <input
                  type="file"
                  name="photo"
                  onChange={onImageChange}
                  id="upload-photo"
                />
              </Col>

              <Col className="d-flex flex-column justify-content-start align-items-center">
                <label
                  className="cancel_image"
                  onClick={() =>
                    handleClickCancelImage(2, editPost.post_images[1].id)
                  }
                >
                  x
                </label>
                <label htmlFor="upload-photo2">
                  <img
                    src={img2}
                    alt="click"
                    height="100px"
                    width="120px"
                    style={{ cursor: "pointer" }}
                  ></img>
                </label>
                <input
                  type="file"
                  name="photo"
                  onChange={onImageChange2}
                  id="upload-photo2"
                />
              </Col>
              <Col className="d-flex flex-column justify-content-start align-items-center">
                <label
                  className="cancel_image"
                  onClick={() =>
                    handleClickCancelImage(3, editPost.post_images[2].id)
                  }
                >
                  x
                </label>

                <label htmlFor="upload-photo3">
                  <img
                    src={img3}
                    alt="click"
                    height="100px"
                    width="120px"
                    style={{ cursor: "pointer" }}
                  ></img>
                </label>
                <input
                  type="file"
                  name="photo"
                  onChange={onImageChange3}
                  id="upload-photo3"
                />
              </Col>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn_cancel" onClick={handleCloseEditPost}>
              تجاهل
            </button>

            {isPress ? (
              <button className="btn_save" disabled>
                <Spinner
                  className="m-auto"
                  animation="border"
                  role="status"
                ></Spinner>
              </button>
            ) : (
              <button type="submit" className="btn_save">
                حفظ
              </button>
            )}
          </Modal.Footer>
        </Form>
      </Modal>

      <Modal show={showDelete} onHide={handleCloseDelete} centered>
        <Modal.Header
          className="my-5 d-flex justify-content-center"
          style={{ paddingTop: "50px" }}
        >
          <Modal.Title> هل انت متأكد من حذف هذا الخبر؟</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <div className="mb-5">
            <button className="btn_cancel" onClick={handleCloseDelete}>
              تجاهل
            </button>

            {isPress ? (
              <button className="btn_save" disabled>
                <Spinner className="m-auto" animation="border" role="status">
                  `
                </Spinner>
              </button>
            ) : (
              <button
                onClick={() => handleDeletePost(showDelete)}
                className="btn_save"
              >
                نعم
              </button>
            )}
          </div>

          <br />
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </Fragment>
  );
};

export default LastNews;
