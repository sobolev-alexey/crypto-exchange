import React, { useState, useContext } from 'react';
import { Table } from 'antd';
import { AppContext } from '../context/globalState';
import { formatPrice, formatPercentage } from '../utils/format';
import { Ticker } from '../types';

const Markets = ({ tickers, viewport = '' }: { tickers: Ticker[], viewport?: string }) => {
  const { priceBTC }: { priceBTC: number } = useContext(AppContext);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const columns = [
    {
      title: '#',
      dataIndex: 'id',
      key: 'id',
      render: (id: string | number, record: Ticker, index: number) => {
         ++index; 
         return index; 
      },
      showSorterTooltip: false,
      width: 50,
    },
    {
      title: 'Pair',
      key: 'coin_id',
      render: (record: Ticker) => `${record?.base} / ${record?.target}`,
      width: ['mobileLandscape', 'mobilePortrait'].includes(viewport) ? 150 : 175,
    },
    {
      title: 'Price',
      key: 'last',
      render: (record: Ticker) => formatPrice(record?.last || 0),
      width: 150,
    },
    {
      title: 'Spread',
      key: 'bid_ask_spread_percentage',
      render: (record: Ticker) => formatPercentage(record?.bid_ask_spread_percentage || 0),
      width: 150,
    },
    {
      title: 'Volume (24h)',
      key: 'volume',
      render: (record: Ticker) => formatPrice((record?.volume || 0) * (record?.last || 0)),
      width: 200,
    },
  ];

  return (
    <Table
      scroll={{ x: 900 }}
      pagination={{
        showSizeChanger: true,
        defaultPageSize: 25,
        pageSizeOptions: [10, 25, 50, 100],
        onShowSizeChange: (current, size) => {
          setPage(current);
          setPageSize(size)
        },
        onChange: (page, pageSize) => {
          setPage(page);
          setPageSize(pageSize)
        },
        showTotal: (total, range) => {
          let pageCount = Math.ceil(total / pageSize);
          if (total === 0 && pageCount === 0) {
            pageCount = 1;
          }
          return `${page} of ${pageCount} page${pageCount > 1 ? 's' : ''}`;
        }
      }}
      dataSource={tickers}
      columns={columns}
      rowKey={(record: Ticker) => `${record?.base}/${record?.target}`}
    />
  )
};

export default Markets;
