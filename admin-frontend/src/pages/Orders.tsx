import React from 'react';
import { GridColDef } from '@mui/x-data-grid';
import DataTable from '../components/DataTable';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
// import AddData from '../components/AddData';
import { fetchOrders } from '../api/ApiCollection';

const Orders = () => {
  // const [isOpen, setIsOpen] = React.useState(false);
  const { isLoading, isError, isSuccess, data } = useQuery({
    queryKey: ['allorders'],
    queryFn: fetchOrders,
  });

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Rental ID', width: 90 },
    {
      field: 'movieTitle',
      headerName: 'Movie',
      minWidth: 250,
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="flex flex-col">
            <span className="font-semibold text-sm">
              {params.row.movieTitle || 'N/A'}
            </span>
            <span className="text-xs text-gray-500">
              {params.row.rentalType === '48h' ? '📅 48 giờ' : '📅 30 ngày'}
            </span>
          </div>
        );
      },
    },
    {
      field: 'customerName',
      headerName: 'Customer',
      minWidth: 200,
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="flex flex-col">
            <span className="font-semibold text-sm">
              {params.row.customerName || 'N/A'}
            </span>
            <span className="text-xs text-gray-500">
              {params.row.email || 'N/A'}
            </span>
          </div>
        );
      },
    },
    {
      field: 'amount',
      headerName: 'Amount',
      minWidth: 120,
      type: 'number',
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="flex flex-col">
            <span className="font-semibold text-green-600">
              {params.row.amount ? `${params.row.amount.toLocaleString()} đ` : 'Miễn phí'}
            </span>
            <span className="text-xs text-gray-500">
              {params.row.paymentMethod || 'PayOS'}
            </span>
          </div>
        );
      },
    },
    {
      field: 'startDate',
      headerName: 'Rental Period',
      minWidth: 150,
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="flex flex-col">
            <span className="text-sm">
              📅 {params.row.startDate || 'N/A'}
            </span>
            <span className="text-sm">
              🔚 {params.row.endDate || 'N/A'}
            </span>
          </div>
        );
      },
    },
    {
      field: 'status',
      headerName: 'Status',
      minWidth: 120,
      flex: 1,
      renderCell: (params) => {
        const status = params.row.status;
        let statusConfig = {
          bg: 'bg-gray-100',
          text: 'text-gray-800',
          icon: '❓',
          label: status
        };

        switch (status) {
          case 'active':
            statusConfig = {
              bg: 'bg-green-100',
              text: 'text-green-800',
              icon: '✅',
              label: 'Đang hoạt động'
            };
            break;
          case 'expired':
            statusConfig = {
              bg: 'bg-red-100',
              text: 'text-red-800',
              icon: '⏰',
              label: 'Đã hết hạn'
            };
            break;
          case 'cancelled':
            statusConfig = {
              bg: 'bg-yellow-100',
              text: 'text-yellow-800',
              icon: '❌',
              label: 'Đã hủy'
            };
            break;
        }

        return (
          <div className="flex flex-col gap-1">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusConfig.bg} ${statusConfig.text}`}>
              {statusConfig.icon} {statusConfig.label}
            </span>
            {params.row.remainingTime && (
              <span className="text-xs text-gray-500">
                ⏱️ {params.row.remainingTime}
              </span>
            )}
          </div>
        );
      },
    },
    {
      field: 'orderCode',
      headerName: 'Order Code',
      minWidth: 120,
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="flex flex-col">
            <span className="text-sm font-mono">
              {params.row.orderCode || 'N/A'}
            </span>
            <span className="text-xs text-gray-500">
              {params.row.createdAt}
            </span>
          </div>
        );
      },
    },
  ];

  React.useEffect(() => {
    if (isLoading) {
      toast.loading('Loading...', { id: 'promiseOrders' });
    }
    if (isError) {
      toast.error('Error while getting the data!', {
        id: 'promiseOrders',
      });
    }
    if (isSuccess) {
      toast.success('Got the data successfully!', {
        id: 'promiseOrders',
      });
    }
  }, [isError, isLoading, isSuccess]);

  return (
    <div className="w-full p-0 m-0">
      <div className="w-full flex flex-col items-stretch gap-3">
        <div className="w-full flex justify-between mb-5">
          <div className="flex gap-1 justify-start flex-col items-start">
            <h2 className="font-bold text-2xl xl:text-4xl mt-0 pt-0 text-base-content dark:text-neutral-200">
              Movie Rentals
            </h2>
            {data && data.length > 0 && (
              <span className="text-neutral dark:text-neutral-content font-medium text-base">
                {data.length} Rentals Found
              </span>
            )}
          </div>
          {/* <button
            onClick={() => setIsOpen(true)}
            className={`btn ${
              isLoading ? 'btn-disabled' : 'btn-primary'
            }`}
          >
            Add New Order +
          </button> */}
        </div>
        {isLoading ? (
          <DataTable
            slug="orders"
            columns={columns}
            rows={[]}
            includeActionColumn={false}
          />
        ) : isSuccess ? (
          <DataTable
            slug="orders"
            columns={columns}
            rows={data}
            includeActionColumn={false}
          />
        ) : (
          <>
            <DataTable
              slug="orders"
              columns={columns}
              rows={[]}
              includeActionColumn={false}
            />
            <div className="w-full flex justify-center">
              Error while getting the data!
            </div>
          </>
        )}

        {/* {isOpen && (
          <AddData
            slug={'user'}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
        )} */}
      </div>
    </div>
  );
};

export default Orders;
