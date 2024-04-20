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
      <Pagination.First linkClassName='bg-dark text-white' onClick={() => setPage(1)} />
      <Pagination.Prev linkClassName='bg-dark text-white' onClick={previousPage} />
      <Pagination.Item linkClassName='bg-dark text-white border-white'active>{page}</Pagination.Item>
      <Pagination.Next linkClassName='bg-dark text-white' onClick={() => setPage(page + 1)} />
    </Pagination>
  );
}

export default PaginationComponent;
