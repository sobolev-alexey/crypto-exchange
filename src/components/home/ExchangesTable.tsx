import React, { useState, useContext } from 'react';
import { Table, Badge, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import VolumeChart from './VolumeChart';
import { AppContext } from '../../context/globalState';
import { formatPrice, convertColor } from '../../utils/format';
import useWindowDimensions from '../../utils/useWindowDimensions';
import { Exchange } from '../../types';

const ExchangesTable = ({ exchanges }: { exchanges: Exchange[] }) => {
  const { priceBTC }: { priceBTC: number } = useContext(AppContext);
  const { viewport } = useWindowDimensions();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const columns = [
    {
      title: 'Rank',
      key: 'trust_score_rank',
      sorter: (a: Exchange, b: Exchange) => a?.trust_score_rank - b?.trust_score_rank,
      render: (record: Exchange) => record?.trust_score_rank,
      fixed: viewport !== 'desktop',
      width: 60,
    },
    {
      title: 'Name',
      key: 'name',
      render: (record: Exchange) => (
        <Link to={`/exchange/${record.id}`} className='exchange-name-wrapper'>
          <Avatar size='small' alt={record.name} src={record.image} />
          {record.name}
        </Link>
      ),
      sorter: (a: Exchange, b: Exchange) => a?.name?.localeCompare(b?.name),
      fixed: viewport !== 'desktop',
      width: viewport !== 'desktop' ? 150 : 200,
    },
    {
      title: 'Exchange Score',
      key: 'trust_score',
      sorter: (a: Exchange, b: Exchange) => a?.trust_score - b?.trust_score,
      render: (record: Exchange) => (
        <Badge
          className='exchange-trust-score'
          count={record?.trust_score}
          style={{ backgroundColor: convertColor(record?.trust_score) }}
        />
      ),
      width: viewport !== 'desktop' ? 120 : 170,
    },
    {
      title: 'Volume BTC (24h)',
      key: 'trust_score',
      sorter: (a: Exchange, b: Exchange) => a?.trade_volume_24h_btc - b?.trade_volume_24h_btc,
      render: (record: Exchange) => formatPrice(record?.trade_volume_24h_btc * priceBTC),
      width: viewport !== 'desktop' ? 150 : 200,
    },
    {
      title: 'Established',
      key: 'year_established',
      sorter: (a: Exchange, b: Exchange) => a?.year_established - b?.year_established,
      render: (record: Exchange) => record?.year_established || '—',
      width: 100,
    },
    {
      title: 'Country',
      key: 'country',
      sorter: (a: Exchange, b: Exchange) => a?.country?.localeCompare(b?.country),
      render: (record: Exchange) => record?.country || '—',
      width: viewport !== 'desktop' ? 150 : 200,
    },
    {
      title: 'Volume Graph (7d)',
      key: 'id',
      render: (record: Exchange) => null || <VolumeChart id={record.id} />,
      width: 200,
    },
  ];

  return (
    <React.Fragment>
      <Table
        scroll={{ x: 1200 }}
        pagination={{
          showSizeChanger: true,
          defaultPageSize: 10,
          pageSizeOptions: [10, 25, 50],
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
        dataSource={exchanges}
        columns={columns}
        rowKey={(record) => record?.id}
      />
      {viewport !== 'desktop' && (
        <span className='table-scroll-hint'>{'Scroll sideways to view more data -->'}</span>
      )}
    </React.Fragment>
  );
};

export default ExchangesTable;
