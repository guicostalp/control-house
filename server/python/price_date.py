import yfinance as yf
import json

def get_price_data():
  result = []

  # Loop through each ticker
  for ticker_symbol in tickers.tickers:
      # Get the historical data for each ticker (default period is '1y', can be customized)
      ticker_data = tickers.tickers[ticker_symbol].history(period='1y')

      # Initialize the ticker object
      ticker_object = {
          "ticker": ticker_symbol,
          "price": []
      }

      # Loop through the data and format each entry
      for date, row in ticker_data.iterrows():
          price_object = {
              "date": date.strftime('%Y-%m-%d'),
              "o": row['Open'],
              "h": row['High'],
              "l": row['Low'],
              "c": row['Close'],
              "v": row['Volume']
          }
          ticker_object["price"].append(price_object)

      # Append the ticker object to the result list
      result.append(ticker_object)

  # Save result to a JSON file
  with open('tickers_data.json', 'w') as json_file:
      json.dump(result, json_file, indent=4)

  print("Data saved to tickers_data.json")



# Get all Tickers inside one object
tickers = yf.Tickers('BRK-B NVDA GLAD SPYI VOO JEPI TSM V MSFT ARCC MAIN GSBD HTGC BTLG11.SA CPTS11.SA GARE11.SA GGRC11.SA HGLG11.SA MXRF11.SA PORD11.SA RZTR11.SA VGIR11.SA XPML11.SA')


get_price_data()
