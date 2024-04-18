import Pagination from 'react-bootstrap/Pagination';

function PaginationComponent({ page, setPage, totalPages }) {

  function nextPage() {
    if (page < totalPages)
      setPage(page + 1)
  }

  function previousPage() {
    if (page > 1) {
      setPage(page - 1)
    }
  }

  return (
    <Pagination>
      <Pagination.First onClick={() => setPage(1)} />
      <Pagination.Prev onClick={previousPage} />
      <Pagination.Item active>{page}</Pagination.Item>
      <Pagination.Next onClick={() => setPage(page + 1)} />
    </Pagination>
  );
}

export default PaginationComponent;
