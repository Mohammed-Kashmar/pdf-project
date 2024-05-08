import ReactPaginate from "react-paginate";
import './pagination.css'
const Pagination = ({ pageCount, onPress }) => {
  const handlePageClick = (data) => {
    onPress(data.selected + 1);
  };

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel={"التالي"}
      onPageChange={handlePageClick}
      marginPagesDisplayed={2}
      pageRangeDisplayed={2}
      pageCount={pageCount}
      previousLabel={"السابق"}
      containerClassName={"pagination justify-content-center mt-4 mb-1 w-100"}
      pageClassName={"page-item"}
      pageLinkClassName={"page-link"}
      previousClassName={"page-item"}
      nextClassName={"page-item"}
      previousLinkClassName={"page-link"}
      nextLinkClassName={"page-link"}
      breakClassName={"page-item"}
      breakLinkClassName={"page-link"}
      activeClassName={"active"}
    />
  );
};

export default Pagination;
