import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetKpisResponse, GetProductsResponse, GetTransactionsResponse, GetStocksResponse, GetDividendsResponse, GetPortfolioResponse, GetNewsResponse, SubmitTransactionData, GetTransactionsInput } from "./types";

export const home_api = createApi({
    baseQuery: fetchBaseQuery({baseUrl: import.meta.env.VITE_BASE_URL}),
    reducerPath: "main",
    tagTypes:["Kpis", "Products","Transactions","Stocks", "Dividends", "Portfolio","News"], /* Where the data is actaully stored after the queries below */
    endpoints: (build) => ({
        getKpis: build.query<Array<GetKpisResponse>,void>({
            query: () => "kpi/kpis/", /* /kpi route on created on Server index.js / /kpis subroute on Server kpi.js (The actual Object inside Data Array)*/
            providesTags: ["Kpis"]
            
        }),
        getProducts: build.query<Array<GetProductsResponse>,void>({
            query: () => "product/products/", /* /product route on created on Server index.js / /products subroute on Server product.js (The actual Object inside Data Array)*/
            providesTags: ["Products"]
            
        }),
        getTransactions: build.query<Array<GetTransactionsResponse>, void>({
            query: () => "transaction/transactions/",
            providesTags: ["Transactions"],
        }),
        getStocks: build.query<Array<GetStocksResponse>, void>({
            query: () => "stock/stocks", /*First route is set on server index.js and Second route is set on the route calls */
            providesTags: ["Stocks"],
        }),
        getDividends: build.query<Array<GetDividendsResponse>, void>({
            query: () => "dividend/dividends", /*First route is set on server index.js and Second route is set on the route calls */
            providesTags: ["Dividends"],
        }),
        getPortfolio: build.query<Array<GetPortfolioResponse>, void>({
            query: () => "portfolio/portfolio", /*First route is set on server index.js and Second route is set on the route calls */
            providesTags: ["Portfolio"],
        }),
        getNews: build.query<Array<GetNewsResponse>, void>({
            query: () => "news/news", /*First route is set on server index.js and Second route is set on the route calls */
            providesTags: ["News"],
        }),
        getTransactionsInput: build.query<Array<GetTransactionsInput>, void>({
            query: () => "transactions/get", /*First route is set on server index.js and Second route is set on the route calls */
            providesTags: ["News"],
        }),
        submitTransaction: build.mutation<void, SubmitTransactionData>({
            query: (transactionData) => ({
                url: "transactions/submit", /*First route is set on server index.js and Second route is set on the route calls */
                method: "POST",
                body: transactionData
            }),

        }),
    }),
});

export const {useGetKpisQuery, useGetProductsQuery, useGetTransactionsQuery, useGetStocksQuery, useGetDividendsQuery, useGetPortfolioQuery, useGetNewsQuery, useSubmitTransactionMutation, useGetTransactionsInputQuery} = home_api;