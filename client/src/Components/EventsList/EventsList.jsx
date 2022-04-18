import React, { useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableHead, TableRow, TableContainer, TablePagination, Button, styled } from '@mui/material'
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

  const TablePaginationStyled = styled(TablePagination)({
    '.css-pdct74-MuiTablePagination-selectLabel' : {
        fontSize: '12px',
        lineHeight: '17px'
    },
    '.css-16c50h-MuiInputBase-root-MuiTablePagination-select': {
        fontSize: '12px',
        lineHeight: '17px',
        marginLeft: '0'
    },
    '.css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon, .css-1mf6u8l-MuiSvgIcon-root-MuiSelect-icon': {
        fontSize: '25px',
        width: '20px'
    },
    '.css-10by3a5-MuiButtonBase-root-MuiMenuItem-root-MuiTablePagination-menuItem': {
        fontSize: '12px',
        lineHeight: '17px',
    },
    '.css-levciy-MuiTablePagination-displayedRows': {
        fontSize: '12px',
        lineHeight: '17px',
    },
    '.css-zylse7-MuiButtonBase-root-MuiIconButton-root': {
        padding: '3px'
    },
    '.css-i4bv87-MuiSvgIcon-root': {
        fontSize: '20px'
    }
});
  
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

    const handlerClose = () => {
      togglerList(false);
    }
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
        <TablePaginationStyled  
          rowsPerPageOptions={[5, 10]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{ marginBottom: '5px'}}
        />
        <Button onClick={handlerClose}>Close</Button>
      </Paper>
    );
}

export default observer(EventsList);