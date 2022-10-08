export type Exchange = {
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

export type ExchangeData = {
  url?: string,
  facebook_url?: string,
  reddit_url?: string,
  telegram_url?: string,
  slack_url?: string,
  other_url_1?: string,
  other_url_2?: string,
  twitter_handle?: string,
}

export type Ticker = {
  base: string,
  target: string,
  last?: number,
  volume?: number,
  bid_ask_spread_percentage?: number,
}