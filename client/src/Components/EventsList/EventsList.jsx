import React, { useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableHead, TableRow, TableContainer, TablePagination } from '@mui/material'
import { observer } from 'mobx-react-lite';
import events from '../../Store/events';
import card from '../../Store/card';
import useHttp from '../../Hooks/http.hooks';

const columns = [
    { id: 'name', label: 'Name', minWidth: 30 },
    { id: 'place', label: 'Place', minWidth: 30 },
    {
      id: 'time',
      label: 'Time',
      minWidth: 30,
      align: 'right'
    }
  ];
  
  function createData(name, place, time, id) {
    return { name, place, time, id };
  }

const EventsList = () => {
    const { request } = useHttp();
    const { createCard, togglerCard } = card;
    const { eventList, event, togglerList } = events;
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const rows = [];

    eventList[event].map(el => rows.push(createData(el.user_name, el.events_place, el.events_time, el.id)))
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };

    const cellClick = async (evt) => {
      const id = evt.target.dataset.id;
      try {
        const data = await request(`/api/event/card/${id}`, 'GET');
        createCard(data[0]);
      } catch (error) {};
      togglerList(false);
      togglerCard(true);
    }
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
  
    return (
      <Paper sx={{ padding: 2, borderRadius: 10 }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth, fontSize: 17, fontWeight: 700 }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow 
                      hover 
                      role="checkbox" 
                      tabIndex={-1} 
                      key={row.name}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        const id = row.id;
                        return (
                          <TableCell 
                            style={{ fontSize: 14, padding: 10 }} 
                            key={column.id} 
                            align={column.align}
                            data-id={id}
                            onClick={cellClick}
                            >
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination  
          rowsPerPageOptions={[5, 10]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    );
}

export default observer(EventsList);