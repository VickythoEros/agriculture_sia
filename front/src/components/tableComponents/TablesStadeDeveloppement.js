// import  React,{useState} from 'react';
// import { Table } from 'rsuite';
// // import Table from '@mui/material/Table';
// // import TableBody from '@mui/material/TableBody';
// // import TableCell from '@mui/material/TableCell';
// // import TableContainer from '@mui/material/TableContainer';
// // import TableHead from '@mui/material/TableHead';
// // import TableRow from '@mui/material/TableRow';
// // import Paper from '@mui/material/Paper';

// const { Column, HeaderCell, Cell } = Table;

// function createData(nom, lundi, mardi, mercredi, jeudi,vendredi,samedi,dimanche) {
//   return { nom, lundi, mardi, mercredi, jeudi,vendredi,samedi,dimanche };
// }

// function organisationDataArrosage(data){
//   let listJour = ['dimanche','lundi', 'mardi', 'mercredi', 'jeudi','vendredi','samedi']
//   return data.map((item,index)=>{
//     let date = new Date(item.date)
//     return {
//       id:item.id,
//       jour:listJour[date.getDay()],
//       quantite_eau:item.quantite_eau,
//       heure:`${date.getHours()} h ${date.getMinutes()} min ${date.getSeconds()} s`
//     }
    
//   })
// }



// export default function TablesStadeDeveloppement(props) {
//   // const [jours,setJours] = useState(organisationDataArrosage(props?.arrosagesData).map(item=>item.jour))
//   const [rowData,setRowData]= useState([])


// // const rows = [
// //   createData("Heure d'activation( h )",12,10,2,1,5,2,7),
// //   createData("Quantité d'eau ( ml )",10 ,0,20,51,25,42,37),
// //   {...organisationDataArrosage(props?.arrosagesData).map(item=>item.jour)}
// // ];

//   React.useEffect(()=>{
//     // console.log('table data',props?.arrosagesData)
//     // console.log("date",organisationDataArrosage(props?.arrosagesData))
//     // console.log('jouAr',{...organisationDataArrosage(props?.arrosagesData).map(item=>item.jour)})
//     // setJours(organisationDataArrosage(props?.arrosagesData).map(item=>item.jour))
//     // setHeureArrosage({nom:"Heure d'activation( h )",...organisationDataArrosage(props?.arrosagesData).map(item=>item.heure)})
//     // setEauArrosage({nom:"Quantité d'eau ( ml )",...organisationDataArrosage(props?.arrosagesData).map(item=>item.heure)})
//     setRowData(organisationDataArrosage(props?.arrosagesData))

//   },[props?.arrosagesData])
  
//   React.useEffect(()=>{
//     // console.log('table data',props?.arrosagesData)
//     // console.log("date",organisationDataArrosage(props?.arrosagesData))
//     // console.log('jouAr',{...organisationDataArrosage(props?.arrosagesData).map(item=>item.jour)})
//     // setJours(organisationDataArrosage(props?.arrosagesData).map(item=>item.jour))
//     // setRowData(
//     //   [{nom:"Heure d'activation( h )",donnee:[organisationDataArrosage(props?.arrosagesData).map(item=>item.heure)]},
//     //     {nom:"Quantité d'eau ( ml )",donnee:[organisationDataArrosage(props?.arrosagesData).map(item=>item.heure)]}
//     //   ]
//     // )

//     setRowData(organisationDataArrosage(props?.arrosagesData))

//   },[])
//   return (
//     <Table
//       height={400}
//       data={rowData}
//       onRowClick={rowData => {
//         console.log(rowData);
//       }}
//     >
//       <Column flexGrow={2} align="center" fixed>
//         <HeaderCell>Jours d'activation( h )</HeaderCell>
//         <Cell dataKey="jour" />
//       </Column>

//       <Column flexGrow={2} >
//         <HeaderCell>Heure d'activation( h )</HeaderCell>
//         <Cell dataKey="heure" />
//       </Column>

//       <Column flexGrow={2} >
//         <HeaderCell>Quantité d'eau</HeaderCell>
//         <Cell dataKey="quantite_eau" />
//       </Column>

//       {/* <Column width={100}>
//         <HeaderCell>Gender</HeaderCell>
//         <Cell dataKey="gender" />
//       </Column>

//       <Column width={100}>
//         <HeaderCell>Age</HeaderCell>
//         <Cell dataKey="age" />
//       </Column>

//       <Column width={150}>
//         <HeaderCell>Postcode</HeaderCell>
//         <Cell dataKey="postcode" />
//       </Column>

//       <Column width={300}>
//         <HeaderCell>Email</HeaderCell>
//         <Cell dataKey="email" />
//       </Column>
//       <Column width={80} fixed="right">
//         <HeaderCell>...</HeaderCell>

//         <Cell>
//           {rowData => (
//             <span>
//               <a onClick={() => alert(`id:${rowData.id}`)}> Edit </a>
//             </span>
//           )}
//         </Cell>
//       </Column> */}
//     </Table>
//   );
// }

import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const columns = [
  { id: "jour", label: "Jours d'activation", minWidth: 170 },
  { id: "heure", label: "Heure d'activation", minWidth: 170 },
  { id: "quantite", label: "Quantité d'eau", minWidth: 170,align: 'right', }

];

function createData(jour, heure, quantite) {
  
  return {jour, heure, quantite };
}

function organisationDataArrosage(data){
  let listJour = ['dimanche','lundi', 'mardi', 'mercredi', 'jeudi','vendredi','samedi']
  return data.map((item,index)=>{
    let date = new Date(item.date)
    return  createData(listJour[date.getDay()], `${date.getHours()}h ${date.getMinutes()} min ${date.getSeconds()}s`, item.quantite_eau) 
    
  })
}



export default function TablesStadeDeveloppement(props) {
  const [rows, setRows] = React.useState( organisationDataArrosage(props?.arrosagesData))
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  React.useEffect(()=>{
    setRows(organisationDataArrosage(props?.arrosagesData))
  },[props?.arrosagesData])


  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column,index) => (
                <TableCell
                  key={index}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row,index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {columns.map((column,index) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={index} align={column.align}>
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
        rowsPerPageOptions={[10, 25, 100]}
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
