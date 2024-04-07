import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import axios from "axios";
export const Posts = ({viewPosts,setViewPosts}) => {
  const [posts, setPosts] = useState([]);
  const [imgs, setImgs] = useState([]);

  useEffect(() => {
    const getposts = async () => {
      const respons = await axios.get(
        `https://api-rating.watanyia.com/user_api/show_posts?adminId=1`
      );
      console.log(respons.data.data);
      setPosts(respons.data.data);
    };
    getposts();
  }, []);

  useEffect(() => {
    if (posts.length > 0) {
      const imagesArray = posts.map((item) => {
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

  return (
    <div className="posts">
      <h1 className="lastposte">اخر الاخبار</h1>
      {posts.map((item, index) => {
        return (
          <Row key={index} className="view">
            <div>
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
            </div>
          </Row>
        );
      })}
    </div>
  );
};
