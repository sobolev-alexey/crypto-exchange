import {
  LinkOutlined,
  FacebookOutlined,
  TwitterOutlined,
  RedditOutlined,
  MediumOutlined,
  SlackOutlined,
  MessageOutlined,
} from '@ant-design/icons';
import { ExchangeData } from '../types';

const ExchangeLinks = ({ exchange }: { exchange: ExchangeData }) => {
  const { 
    url, facebook_url, twitter_handle, reddit_url, telegram_url, slack_url, other_url_1, other_url_2, 
  } = exchange;

  return (
    <div className="exchange-links-wrapper">
      {
        url && (
          <a
            className="exchange-link"
            target="_blank"
            rel="noopener noreferrer"
            href={url}
          >
            <LinkOutlined /><span className="link">{url}</span>
          </a>
        )
      }
      {
        facebook_url && (
          <a
            className="exchange-link"
            target="_blank"
            rel="noopener noreferrer"
            href={facebook_url}
          >
            <FacebookOutlined /><span className="link">Facebook</span>
          </a>
        )
      }
      {
        twitter_handle && (
          <a
            className="exchange-link"
            target="_blank"
            rel="noopener noreferrer"
            href={`https://twitter.com/${twitter_handle}`}
          >
            <TwitterOutlined /><span className="link">@{twitter_handle}</span>
          </a>
        )
      }
      {
        reddit_url && (
          <a
            className="exchange-link"
            target="_blank"
            rel="noopener noreferrer"
            href={reddit_url}
          >
            <RedditOutlined /><span className="link">Reddit</span>
          </a>
        )
      }
      {
        telegram_url && (
          <a
            className="exchange-link"
            target="_blank"
            rel="noopener noreferrer"
            href={telegram_url}
          >
            <MessageOutlined /><span className="link">Telegram</span>
          </a>
        )
      }
      {
        slack_url && (
          <a
            className="exchange-link"
            target="_blank"
            rel="noopener noreferrer"
            href={slack_url}
          >
            <SlackOutlined /><span className="link">Slack</span>
          </a>
        )
      }
      {
        other_url_1 && (
          <a
            className="exchange-link"
            target="_blank"
            rel="noopener noreferrer"
            href={other_url_1}
          >
            <MediumOutlined /><span className="link">Page</span>
          </a>
        )
      }
      {
        other_url_2 && (
          <a
            className="exchange-link"
            target="_blank"
            rel="noopener noreferrer"
            href={other_url_2}
          >
            <MessageOutlined /><span className="link">Chat</span>
          </a>
        )
      }
    </div>
  );
}

export default ExchangeLinks;
