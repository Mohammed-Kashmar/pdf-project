import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import axios from "axios";
import Pagination from "./Admin/utility/pagination/Pagination";
import ReactPlayer from "react-player";

export const Posts = ({ viewPosts, setViewPosts }) => {
  const [posts, setPosts] = useState([]);
  const [imgs, setImgs] = useState([]);
  const adminId = localStorage.getItem("admin_id");

  const [selectedImage, setSelectedImage] = useState(null);

  const getposts = async (page) => {
    const respons = await axios.get(
      `https://api-rating.watanyia.com/user_api/show_posts?adminId=${adminId}&page=${page}`
    );
    console.log(respons);
    setPosts(respons.data);
  };
  useEffect(() => {
    getposts("");
  }, []);

  useEffect(() => {
    if (posts.data && posts.data.length > 0) {
      const imagesArray = posts.data.map((item) => {
        const postImages = item.post_images.map((image) => ({
          original: ` https://api-rating.watanyia.com/storage/${image.location}`,
          thumbnail: `https://api-rating.watanyia.com/storage/${image.location}`,
        }));

        return {
          postId: item.id,
          images: postImages,
        };
      });
      setImgs(imagesArray.flat());
    }
  }, [posts]);

  const onPress = async (page) => {
    getposts(page);
    setSelectedImage(null); // إعادة تعيين الصورة المحددة عند تغيير الصفحة
  };

  const openImageFullscreen = (image) => {
    setSelectedImage(image);
  };

  return (
    <div className="posts">
      {/* <h1 className="lastposte">اخر الاخبار</h1> */}
      {posts &&
        posts.data &&
        posts.data.map((item, index) => {
          if (item.video === null) {
            return (
              <Row key={index} className="view">
                <div className="toptext">
                  <h1>{item.title}</h1>
                  <span>{new Date(item.created_at).toLocaleString()}</span>
                </div>
                <h5>{item.description}</h5>
                <Row>
                  <Col className="col-lg-12 col-12">
                    <div className="imageposts">
                      {imgs.length > 0 && imgs[index] && imgs[index].images && (
                        <ImageGallery
                          showPlayButton={false}
                          items={imgs[index].images}
                          onClick={(e) => openImageFullscreen(e.target.src)}
                        />
                      )}{" "}
                    </div>
                  </Col>
                </Row>
              </Row>
            );
          } else {
            return (
              <Row key={index} className="view">
                <div className="toptext">
                  <h1>{item.title}</h1>
                  <span>20/3/2023</span>
                </div>
                <h5>{item.description}</h5>
                <Row>
                  <Col className="col-lg-12 col-12">
                    <div className="imageposts">
                      <div>
                        <ReactPlayer
                          url={`https://api-rating.watanyia.com/storage/${item.video}`}
                          controls={true}
                          width="100%"
                          height="100%"
                          config={{
                            file: {
                              attributes: {
                                controlsList: "nodownload", // تعطيل خيار تنزيل الفيديو
                              },
                            },
                          }}
                        />
                      </div>
                    </div>
                  </Col>
                </Row>
              </Row>
            );
          }
        })}

      {posts && posts.last_page > 1 ? (
        <Pagination onPress={onPress} pageCount={posts.last_page} />
      ) : null}

      {selectedImage && (
        <div className="fullscreen-image">
          <div
            className="fullscreen-overlay"
            onClick={() => setSelectedImage(null)}
          ></div>
          <img
            src={selectedImage}
            alt="Full screen"
            className="fullscreen-img"
          />
        </div>
      )}
    </div>
  );
};
