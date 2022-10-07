import React from 'react';
import { Spin } from 'antd';

const Loading = () => (
  <div className="loading">
    <Spin size="large" />
    <span>Loading...</span>
  </div>
);

export default Loading;
