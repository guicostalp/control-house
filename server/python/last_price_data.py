import yfinance as yf
import json

def get_price_data(tickers):
    result = []

    # Loop through each ticker symbol
    for ticker_symbol in tickers.symbols:
        # Get ticker object for each symbol
        ticker = tickers.tickers[ticker_symbol]

        # Get live market data (including pre-market and post-market prices)
        try:
            ticker_info = ticker.history(period="1d", interval="1m", prepost=True)

            # Convert the Timestamp to string and reset the index to make it JSON serializable
            ticker_info.reset_index(inplace=True)
            ticker_info['Datetime'] = ticker_info['Datetime'].astype(str)

            # # Print the fetched data for inspection
            # print(f"Data for {ticker_symbol}:")
            # print(ticker_info)

            # Append only the last record of price data to result
            if not ticker_info.empty:
                last_record = ticker_info.iloc[-1].to_dict()  # Get the last row and convert to dictionary
                result.append({
                    "ticker": ticker_symbol,
                    "price":[{
                        "date":last_record['Datetime'],
                        "o": last_record['Close'],
                        "c": last_record['Close'],
                        "h": last_record['High'],
                        "l": last_record['Low'],}]
                })
            else:
                print(f"No data available for {ticker_symbol}")

        except Exception as e:
            print(f"Error fetching data for {ticker_symbol}: {e}")

    # Save result to a JSON file
    with open('tickers_last_price_data.json', 'w') as json_file:
        json.dump(result, json_file, indent=4)

    #print("Data saved to tickers_last_price_data.json")
    return result

# Get all Tickers inside one object
tickers = yf.Tickers('NVDA TSM')

# Get the data and print it
get_price_data(tickers)

