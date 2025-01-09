import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Pagination,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import service from '../User/service';
import { addUser, deleteUser } from '../User/userSlice';

const ListPage = () => {
  const url = "http://localhost:3000/users";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.users.users);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 5;

  const fetchData = async () => {
    const data = await service.fetchUserDetails(url);
    if (data) {
      dispatch(addUser(data));
      setTotalPages(Math.ceil(data.length / itemsPerPage));
    }
  };

  useEffect(() => {
    fetchData();
  }, [dispatch]);

  const deleteData = async (url, id) => {
    const response = await service.deleteData(url, id);
    if (response) {
      dispatch(deleteUser(id));
      const remainingUsers = userData.filter((user) => user.id !== id);
      const newTotalPages = Math.ceil(remainingUsers.length / itemsPerPage);
      setTotalPages(newTotalPages);

      if (page > newTotalPages && newTotalPages > 0) {
        setPage(newTotalPages);
      }
    }
  };

  const editData = (id) => {
    navigate(`/form/${id}`);
  };

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };

  const calculateResult = (maths, physics, chemistry) => {
    const average = (maths + physics + chemistry) / 3;
    return average < 33 ? 'Fail' : 'Pass';
  };

  const startIndex = (page - 1) * itemsPerPage;
  const paginatedUsers = userData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <Box sx={{ padding: 4 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 4,
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          User Details
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          component={Link}
          to="/form"
        >
          Create New
        </Button>
      </Box>

      <TableContainer
        component={Paper}
        sx={{
          boxShadow: 4,
          borderRadius: 2,
          overflow: 'auto',
        }}
      >
        <Table>
          <TableHead
            sx={{
              backgroundColor: '#1976d2',
            }}
          >
            <TableRow>
              {[
                'Name',
                'Email',
                'Phone No',
                'Maths',
                'Physics',
                'Chemistry',
                'Pass / Fail',
                'Actions',
              ].map((heading) => (
                <TableCell
                  key={heading}
                  sx={{
                    color: '#fff',
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}
                >
                  {heading}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedUsers.map((item, index) => (
              <TableRow
                key={index}
                sx={{
                  backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#fff',
                  '&:hover': {
                    backgroundColor: '#f0f0f0',
                  },
                }}
              >
                <TableCell align="center">{item.name}</TableCell>
                <TableCell align="center">{item.email}</TableCell>
                <TableCell align="center">{item.phoneNo}</TableCell>
                <TableCell align="center">{item.maths}</TableCell>
                <TableCell align="center">{item.physics}</TableCell>
                <TableCell align="center">{item.chemistry}</TableCell>
                <TableCell
                  align="center"
                  sx={{
                    fontWeight: 'bold',
                    color:
                      calculateResult(item.maths, item.physics, item.chemistry) === 'Pass'
                        ? 'green'
                        : 'red',
                  }}
                >
                  {calculateResult(item.maths, item.physics, item.chemistry)}
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    sx={{ marginRight: 1 }}
                    onClick={() => editData(item.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => deleteData(url, item.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 3,
        }}
      >
        <Pagination
          count={totalPages}
          page={page}
          onChange={handleChangePage}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default ListPage;
