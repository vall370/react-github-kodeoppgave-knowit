import React, { useState, useEffect } from "react";
import { Container, Pagination, Form } from "react-bootstrap";
import { Repository } from "./types";
import { Sort } from "./Sort";
import { fetchRepositories } from "./GitHubService";
import { Table } from "./Table";


const ITEMS_PER_PAGE = 20;

function App() {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState(Sort.Stars);

  useEffect(() => {
    fetchRepositories(currentPage, sort).then(repos => setRepositories(repos));
  }, [currentPage, sort]);

  const handlePageChange = (eventKey: number) => {
    setCurrentPage(eventKey);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSort(event.target.value as Sort);
  };

  const totalPages = Math.ceil(repositories.length / ITEMS_PER_PAGE);

  return (
    <Container>
      <h1>JavaScript Repositories</h1>
      <Form.Group controlId="sort">
        <Form.Label>Sort by:</Form.Label>
        <Form.Control as="select" value={sort} onChange={handleSortChange}>
          <option value={Sort.Stars}>Stars</option>
          <option value={Sort.Forks}>Forks</option>
          <option value={Sort.Updated}>Updated</option>
        </Form.Control>
      </Form.Group>
      <Table repositories={repositories.slice(0, ITEMS_PER_PAGE)} />
      <Pagination>
        {[...Array(totalPages)].map((_, index) => (
          <Pagination.Item
            key={index}
            active={index + 1 === currentPage}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </Container>
  );
}

export default App;