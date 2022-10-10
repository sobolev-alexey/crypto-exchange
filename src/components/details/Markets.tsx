import React, { useState } from 'react';
import { Table } from 'antd';
import { formatPrice, formatPercentage } from '../../utils/format';
import useWindowDimensions from '../../utils/useWindowDimensions';
import { Ticker } from '../../types';

const Markets = ({ tickers }: { tickers: Ticker[] }) => {
  const { viewport, screenWidth } = useWindowDimensions();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const columns = [
    {
      title: '#',
      dataIndex: 'id',
      key: 'id',
      render: (id: any, record: Ticker, index: number) => ++index,
      showSorterTooltip: false,
      fixed: viewport === 'mobile',
      width: 50,
    },
    {
      title: 'Pair',
      key: 'coin_id',
      render: (record: Ticker) => `${record?.base} / ${record?.target}`,
      fixed: viewport === 'mobile',
      width: viewport === 'mobile' ? 90 : 175,
    },
    {
      title: 'Price',
      key: 'last',
      render: (record: Ticker) => formatPrice(record?.last || 0),
      width: viewport === 'mobile' ? 90 : 150,
    },
    {
      title: 'Spread',
      key: 'bid_ask_spread_percentage',
      render: (record: Ticker) => formatPercentage(record?.bid_ask_spread_percentage || 0),
      width: viewport === 'mobile' ? 70 : 150,
    },
    {
      title: 'Volume (24h)',
      key: 'volume',
      render: (record: Ticker) => formatPrice((record?.volume || 0) * (record?.last || 0)),
      width: viewport === 'mobile' ? 120 : 200,
    },
  ];

  return (
    <React.Fragment>
      <Table
        scroll={{ x: viewport === 'mobile' ? Math.max(screenWidth, 600) : 900 }}
        pagination={{
          showSizeChanger: true,
          defaultPageSize: 25,
          pageSizeOptions: [10, 25, 50, 100],
          onShowSizeChange: (current, size) => {
            setPage(current);
            setPageSize(size);
          },
          onChange: (page, pageSize) => {
            setPage(page);
            setPageSize(pageSize);
          },
          showTotal: (total) => {
            let pageCount = Math.ceil(total / pageSize);
            if (total === 0 && pageCount === 0) {
              pageCount = 1;
            }
            return `${page} of ${pageCount} page${pageCount > 1 ? 's' : ''}`;
          },
        }}
        dataSource={tickers}
        columns={columns}
        rowKey={(record: Ticker) => `${record?.base}/${record?.target}`}
      />
      {screenWidth < 600 && (
        <span className='table-scroll-hint'>{'Scroll sideways to view more data -->'}</span>
      )}
    </React.Fragment>
  );
};

export default Markets;
