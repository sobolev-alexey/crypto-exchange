import React, { useContext } from 'react';
import { Form, Input } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';
import { AppContext } from '../../context/globalState';

const Search = () => {
  const { search, exchanges, setFilteredExchanges } = useContext(AppContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [searchForm] = Form.useForm();

  const onFinish = async ({ query }: { query?: string }) => {
    const result = search.search(query);
    setFilteredExchanges(result);
    if (location.pathname !== '/') {
      navigate('/');
    }
  };

  const onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target?.value === '') {
      setFilteredExchanges(exchanges);
    }
  };

  return (
    <Form
      className='header-search-wrapper'
      form={searchForm}
      size='large'
      layout='horizontal'
      name='search-form'
      hideRequiredMark
      onFinish={onFinish}
      initialValues={{
        query: '',
      }}
    >
      <Form.Item name='query'>
        <Input
          placeholder='Search'
          allowClear
          prefix={<SearchOutlined />}
          suffix={null}
          className='search-bar'
          onChange={onChange}
        />
      </Form.Item>
    </Form>
  );
};

export default Search;
