import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import axios from "axios";
import Pagination from "./Admin/utility/pagination/Pagination";
export const Posts = ({ viewPosts, setViewPosts }) => {
  const [posts, setPosts] = useState([]);
  const [imgs, setImgs] = useState([]);
  const adminId = localStorage.getItem("admin_id");

  const getposts = async (page) => {
    const respons = await axios.get(
      `https://api-rating.watanyia.com/user_api/show_posts?adminId=${adminId}&page=${page}`
    );
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

  console.log(posts);
  // if (imgs.length > 0) {
  //   console.log(imgs[0].images);
  // }
  
  const onPress = async (page) => {
    getposts(page);
  };

  return (
    <div className="posts">
      <h1 className="lastposte">اخر الاخبار</h1>
      {posts&& posts.data && posts.data.map((item, index) => {
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
                  {imgs.length > 0 && imgs[index] && imgs[index].images && (
                    <ImageGallery
                      showPlayButton={false}
                      items={imgs[index].images}
                    />
                  )}{" "}
                </div>
              </Col>
            </Row>
          </Row>
        );
      })}

      {posts && posts.last_page > 1 ? (
        <Pagination onPress={onPress} pageCount={posts.last_page} />
      ) : null}
    </div>
  );
};
