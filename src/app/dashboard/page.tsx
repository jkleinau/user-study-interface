'use client';
import { useEffect, useState } from 'react';
import { study } from '../interfaces/study';
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import 'ag-grid-community/styles/ag-grid.css'; // Mandatory CSS required by the grid
import 'ag-grid-community/styles/ag-theme-quartz.css'; // Optional Theme applied to the grid
import { type ColDef, type GridOptions } from 'ag-grid-community';

export default function Dashboard() {
  const [rowData, setRowData] = useState<study[]>([]);
  const columnDefs: ColDef[] = [
    { valueGetter: 'node.rowIndex + 1', headerName: 'No.' },
    {
      field: 'id',
      cellDataType: 'string'
    },
    {
      field: 'createdAt',
      cellDataType: 'dateString',
      valueFormatter: (params) => new Date(params.value).toLocaleDateString()
    },
    {
      field: 'updatedAt',
      cellDataType: 'dateString',
      valueFormatter: (params) => new Date(params.value).toLocaleDateString()
    },
    {
      field: 'submittedAt',
      cellDataType: 'dateString',
      valueFormatter: (params) => new Date(params.value).toLocaleDateString()
    }
  ];
  const gridOptions: GridOptions = {
    columnDefs: columnDefs,
    defaultColDef: {
      sortable: true,
      filter: true
    },
    pagination: true,
    paginationPageSize: 10,
    paginationPageSizeSelector: [10, 25, 50, 100],
    suppressMenuHide: true,
    // domLayout: 'autoHeight',
    onGridReady: (params) => {
      window.addEventListener('resize', () => {
        setTimeout(() => {
          params.api.sizeColumnsToFit();
        });
      });
    },
    autoSizeStrategy: {
      type: 'fitCellContents'
    }
  };
  useEffect(() => {
    fetch('/api')
      .then((res) => res.json())
      .then((data) => {
        setRowData(data as study[]);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className='h-screen p-4'>
      <h1 className='text-3xl text-center mb-4'>Dashboard</h1>
      <div className='ag-theme-quartz w-full h-5/6'>
        <AgGridReact gridOptions={gridOptions} rowData={rowData} />
      </div>
    </div>
  );
}
