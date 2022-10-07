import React, { useState } from 'react';
import { Table, Badge, Avatar, Statistic } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import VolumeChart from './VolumeChart';

type Exchange = {
  id: string,
  name: string,
  year_established: number,
  country: string,
  description?: string,
  url?: string,
  image?: string,
  has_trading_incentive?: boolean,
  trust_score: number,
  trust_score_rank: number,
  trade_volume_24h_btc: number,
  trade_volume_24h_btc_normalized?: number
}

const ExchangesTable = ({ exchanges, viewport }) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  const columns = [
    {
      title: 'Rank',
      key: 'trust_score_rank',
      sorter: (a: Exchange, b: Exchange) => a?.trust_score_rank - b?.trust_score_rank,
      render: (record: Exchange) => record?.trust_score_rank,
      // defaultSortOrder: 'ascend',
      width: 40,
    },
    {
      title: 'Name',
      key: 'name',
      render: (record: Exchange) => (
        <Link 
          to={`/exchange/${record.id}`} 
          className="exchange-name-wrapper view-report"
        >
          <Avatar
            size="small"
            alt={record.name}
            src={record.image}
          />
          {record.name}
        </Link>
      ),
      sorter: (a: Exchange, b: Exchange) => a?.name?.localeCompare(b?.name),
      width: ['mobileLandscape', 'mobilePortrait'].includes(viewport) ? 150 : 175,
    },
    {
      title: 'Exchange Score',
      key: 'trust_score',
      sorter: (a: Exchange, b: Exchange) => a?.trust_score - b?.trust_score,
      render: (record: Exchange) => (
        <Badge
          className="exchange-trust-score"
          count={record?.trust_score}
          style={{ backgroundColor: `hsl(${record?.trust_score / 10 * 157},80%,43%)` }}
        />
      ),
      width: 175,
    },
    {
      title: 'Volume BTC (24h)',
      key: 'trust_score',
      sorter: (a: Exchange, b: Exchange) => a?.trade_volume_24h_btc - b?.trade_volume_24h_btc,
      render: (record: Exchange) => record?.trade_volume_24h_btc?.toFixed(2) || '—',
      width: 175,
    },
    {
      title: 'Established',
      key: 'year_established',
      sorter: (a: Exchange, b: Exchange) => a?.year_established - b?.year_established,
      render: (record: Exchange) => record?.year_established || '—',
      width: 75,
    },
    {
      title: 'Country',
      key: 'country',
      sorter: (a: Exchange, b: Exchange) => a?.country?.localeCompare(b?.country),
      render: (record: Exchange) => record?.country || '—',
      width: 200,
    },
    {
      title: 'Volume Graph (7d)',
      key: 'volume',
      render: (record: Exchange) => <VolumeChart id={record.id} />,
      width: 200,
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
        dataSource={exchanges}
        columns={columns}
        rowKey={record => record?.id}
      />
    </React.Fragment>
  )
};

export default ExchangesTable;
