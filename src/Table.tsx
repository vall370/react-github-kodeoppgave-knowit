import React from "react";
import { Table as BootstrapTable } from "react-bootstrap";
import { Repository } from "./types";

interface Props {
    repositories: Repository[];
}

export const Table: React.FC<Props> = ({ repositories }) => {
    return (
        <BootstrapTable striped bordered hover responsive>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Stars</th>
                    <th>Forks</th>
                </tr>
            </thead>
            <tbody>
                {repositories.map(repo => (
                    <tr key={repo.id}>
                        <td>
                            <a href={repo.html_url}>{repo.name}</a>
                        </td>
                        <td>{repo.description}</td>
                        <td>{repo.stargazers_count}</td>
                        <td>{repo.forks_count}</td>
                    </tr>
                ))}
            </tbody>
        </BootstrapTable>
    );
};