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
import { deleteData, fetchUserDetails } from '../User/service';
import { addUser, deleteUser } from '../User/userSlice';

const ListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.users.users);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    fetchUserDetails(dispatch, addUser, 0, setTotalPages, itemsPerPage, null);
  }, [dispatch]);

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
                    onClick={() => navigate(`/form/${item.id}`)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => deleteData(
                      item.id,
                      userData,
                      dispatch,
                      deleteUser,
                      itemsPerPage,
                      page,
                      setTotalPages,
                      setPage
                    )}
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

