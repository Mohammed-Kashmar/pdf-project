import { FaEye } from "react-icons/fa";
import AdminHeader from "../../Admin/utility/Header/Header";
import NavBarRed from "../../Admin/utility/NabBarRed/NavBarRed";
import "./AllSizes.css";
import { MdAddCircle, MdDelete, MdEdit } from "react-icons/md";
import { AiFillMinusCircle } from "react-icons/ai";
import useFetchDataSuperAdmin from "../../../../hooks/useFetchDataSuperAdmin";
import { Fragment, useState } from "react";
import { Form, Modal, Spinner } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import notify from "../../utility/useNotification";
import { useInsertDataSuperAdmin } from "../../../../hooks/useInsertDataSuperAdmin";

const AllSizes = () => {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState('');
  const [isPress, setIsPress] = useState(false);
  const [showAddSize, setShowAddSize] = useState(false);

  const {
    data: sizes,
    isPending,
    error,
  } = useFetchDataSuperAdmin(`/superAdmin_api/show_all_sizes?page=${page}`);
  const handleShowAddSize = () => {
    setShowAddSize(true);
  };
  const handleCloseAddSize = () => {
    setShowAddSize(false);
  };
  const handleChangeSize = (e) => {
    setSize(e.target.value);
  };

  const handleSubmitAddSize = async (e) => {
    e.preventDefault();
    if (size === "") {
      notify("Please Enter quantity", "error");
      return;
    }
    // console.log(formData.logo)
    setIsPress(true);
    const response = await useInsertDataSuperAdmin(
      `/superAdmin_api/add_size`,
      { size }
    );
    setIsPress(false);
    console.log(response.data);
    if (response.data.success === true) {
      notify(response.data.message, "success");
      handleCloseAddSize();
      setPage("");
      setSize("");
    } else {
      notify(response.data.message, "error");
    }
  };
  return (
    <div>
      <NavBarRed />
      <AdminHeader
        text="المساحات المتوفرة"
        btnText="اضافة مساحة جديدة"
        onButtonClick={handleShowAddSize}
      />

      <div className="table-responsive table_container">
        <table className="table">
          <thead>
            <tr>
              <th scope="col"> المساحة </th>
            </tr>
          </thead>
          {error ? (
            <tbody>
              <tr>
                <td colSpan="3">
                  <p className="my-4 text-danger">{error.data.message}</p>
                </td>
              </tr>
            </tbody>
          ) : (
            <Fragment>
              {isPending ? (
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
              ) : (
                <tbody>
                  {sizes && sizes.data && sizes.data.length > 0 ? (
                    sizes.data.map((size) => (
                      <tr key={size.id}>
                        <td className="">{size.size}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3">
                        <p className="my-5">لا توجد بيانات</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              )}
            </Fragment>
          )}
        </table>
      </div>

      <Modal show={showAddSize} onHide={handleCloseAddSize} centered>
        <Modal.Header className="mt-3 mb-5 d-flex justify-content-center">
          <Modal.Title> اضافة رسائل</Modal.Title>
        </Modal.Header>
        <Form className="w-75 mx-auto " onSubmit={handleSubmitAddSize}>
          <Modal.Body className="mb-5 d-flex flex-row-reverse align-items-center justify-content-between">
            <Form.Label className="mx-1 ">:الكمية</Form.Label>

            <Form.Control
              size="lg"
              className="px-1"
              type="number"
              value={size}
              onChange={handleChangeSize}
            />
          </Modal.Body>
          <Modal.Footer>
            <div className="mb-5">
              <button
                className="btn_cancel"
                type="button"
                onClick={handleCloseAddSize}
              >
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
            </div>
          </Modal.Footer>
        </Form>
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default AllSizes;
