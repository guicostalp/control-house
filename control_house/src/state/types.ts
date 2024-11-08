export interface ExpensesByCatergory{
    salaries: number;
    supplies: number;
    services: number;

}

export interface Month{
    id: string;
    month: string;
    revenue: number;
    expenses: number;
    nonOperationalExpenses: number;
    operationalExpenses: number;


}
export interface Day{
    id: string;
    date: string;
    revenue: number;
    expenses: number;


}

export interface GetKpisResponse{
    id:string;
    _id:string;
    __v: number;
    totalProfit: number;
    totalRevenue: number;
    totalExpenses: number;
    expensesByCategory: ExpensesByCatergory;
    monthlyData: Array<Month>;
    dailyData: Array<Day>
    createdAt: string;
    updatedAt: string;

}

export interface GetProductsResponse{
    id:string;
    _id:string;
    __v: number;
    price: number;
    expense: number;
    transactions: Array<string>;
    createdAt: string;
    updatedAt: string;
}

export interface GetTransactionsResponse {
    id: string;
    _id: string;
    __v: number;
    buyer: string;
    amount: number;
    productIds: Array<string>;
    createdAt: string;
    updatedAt: string;
  }

export interface GetStocksResponse {
    _id: string;
    __v: number;
    ticker: string;
    price: [{
        date: string;
        v: number;
        o: number;
        c: number;
        h: number;
        l: number;
    }];

    createdAt: string;
    updatedAt: string;
  }

  export interface GetDividendsResponse {
    _id: string;
    __v: number;
    ticker: string;
    dividend: [{
        cash_amount: number;
        currency: string;
        declaration_date: string;
        dividend_type: string;
        ex_dividend_date: string;
        frequency: number;
        id: string;
        pay_date: string;
        record_date: string;

    }];
    createdAt: string;
    updatedAt: string;    
  }

  export interface GetPortfolioResponse {
    _id: string;
    __v: number;
    ticker: string;
    portfolio: [{
        company_name: string,
        currency: string,
        exchange: string,
        last_price: number,
        change: number,
        chg_percent: string,
        market_time: string,
        volume: string,
        avg_vol_m3: string,
        avg_vol_d10: string,
        day_range: string,
        day_chart: string,
        bid: number,
        bid_size: number,
        ask: number,
        ask_size: number,
        prev_close: number,
        shares: string,
        open: number,
        high: number,
        low: number,
        wk_high52: number,
        wk_low52: number,
        wk_high_chg52: number,
        wk_high_chg_percent52: string,
        wk_low_chg5: string,
        wk_low_chg_percent52: string,
        shares_out: string,
        short_ratio: string,
        wk_range52: string,
        pre_mkt_time: string,
        pre_mkt_price: number,
        pre_mkt_chg: string,
        pre_mkt_chg_percent: string,
        post_mkt_time: string,
        post_mkt_price: number,
        post_mkt_chg: number,
        post_mkt_chg_percent: string,
        eps_ttm: number,
        trailing_p_e: number,
        forward_p_e: string,
        div_payment_date: string,
        ex_div_date: string,
        div_share: string,
        forward_annual_div_rate: string,
        forward_annual_div_yield: string,
        trailing_annual_div_rate: number,
        trailing_annual_div_yield: string,
        market_cap: string,
        book_val: number,
        price_book: number,
        price_sales: string,
        ebitda: string,
        earnings_date: string,
        yr_target_est1: string,
        eps_est_next_year: string,
        eps_current_year: string,
        peg_ratio__yr_expected5: string,
        dma50: number,
        dma_chg50: number,
        dma_chg_percent50: string,
        dma200: number,
        dma_chg200: number,
        dma_chg_percent200: string,
        trade_date: string,
        high_limit: string,
        low_limit: string,
        cost_share: string,
        market_value: string,
        total_chg: string,
        total_chg_percent: string,
        day_chg: string,
        day_chg_percent: string,
        notes: string,
        no_of_lots: string,
        annualised_gain: string,
        extra_column1: string,
        extra_column2: string
    }]
    createdAt: string;
    updatedAt: string;    
  }

  export interface GetNewsResponse {
    _id: string;
    __v: number;
    ticker: string;
    news: [
        {
          id: string,
          publisher: {
              name: string,
              homepage_url: string,
              logo_url: string,
              favicon_url: string
          },
          title: string,
          author: string,
          published_utc: string,
          article_url: string,
          tickers: [
              string
          ],
          image_url: string,
          description: string,
          keywords: [
              string
          ],
          insights: [
              {
                  ticker: string,
                  sentiment: string,
                  sentiment_reasoning: string
              }
          ]
        }
    ]
    
    createdAt: string;
    updatedAt: string;    
  }

  export interface SubmitTransactionData {
    ticker: string;
    type: string;
    date: string;
    nzdInput: number;
    grossAmount: number;
    costs: number;
    qty: number;
    price: number;
    dy: number;
  }

  export interface GetTransactionsInput {
    ticker: string;
    transaction: [
        {
            type: string,
            date: string,
            nzdInput: number,
            grossAmount: number,
            costs: number,
            qty: number,
            price: number,
            dy: number,
        }
    ]
    createdAt: string;
    updatedAt: string; 
  }