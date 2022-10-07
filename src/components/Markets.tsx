import React, { useState, useContext } from 'react';
import { Table, Badge, Avatar, Statistic } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import VolumeChart from './VolumeChart';
import { AppContext } from '../context/globalState';
import { formatPrice, formatVolume, formatPercentage } from '../utils/format';

type Ticker = {
  base: string,
  target: string,
  last?: number,
  volume?: number,
  bid_ask_spread_percentage?: number,
}

const Markets = ({ tickers, viewport = '' }: { tickers: Ticker[], viewport: string }) => {
  console.log('Tickers', tickers)
  const { priceBTC }: { priceBTC: number } = useContext(AppContext);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const columns = [
    {
      title: '#',
      dataIndex: 'id',
      key: 'id',
      render: (id, record, index) => { ++index; return index; },
      showSorterTooltip: false,
      width: 40,
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
      render: (record: Ticker) => formatPrice(record?.last),
      width: 175,
    },
    {
      title: 'Spread',
      key: 'bid_ask_spread_percentage',
      render: (record: Ticker) => formatPercentage(record?.bid_ask_spread_percentage),
      width: 175,
    },
    {
      title: 'Volume (24h)',
      key: 'volume',
      render: (record: Ticker) => formatPrice(record?.volume * record?.last),
      width: 75,
    },
  ];

  return (
    <React.Fragment>
      <Table
        scroll={{ x: 990 }}
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
    </React.Fragment>
  )
};

export default Markets;
