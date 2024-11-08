from selenium import webdriver
import json
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time
import re



# Set up the WebDriver (replace with the correct path to your ChromeDriver)
driver = webdriver.Chrome()

# Open the website
driver.get('https://nz.finance.yahoo.com/portfolios/')



# Find the element by its title attribute
sign_in_element = driver.find_element(By.CSS_SELECTOR, '[title="Sign in"]')

# Get the href property of the element
sign_in_link = sign_in_element.get_attribute('href')
driver.get(sign_in_link)
# Wait for the page to load
time.sleep(5)

username_input = driver.find_element(By.ID, 'login-username')
username_input.send_keys('fortalbuilders@gmail.com')
# Wait for the page to load
time.sleep(2)

next_page = driver.find_element(By.ID, 'login-signin')
next_page.click()
# Wait for the page to load
time.sleep(5)
pass_input = driver.find_element(By.ID, 'login-passwd')
pass_input.send_keys('Mr12eggs!')
# Wait for the page to load
time.sleep(2)
login = driver.find_element(By.ID, 'login-signin')
login.click()

# Wait for the page to load
time.sleep(3)
# Find the <a> element by its inner text 'Portfolio'
#portfolio_link = driver.find_element(By.LINK_TEXT, 'Main Portfolio')

# Get the href attribute of the element
#href_portfolio = portfolio_link.get_attribute('href')

#driver.get(href_portfolio)
driver.get('https://nz.finance.yahoo.com/portfolio/p_1/view/view_0')
# Wait for the page to load
time.sleep(5)
webdriver.ActionChains(driver).send_keys(Keys.ESCAPE).perform()

# Wait for the page to load
time.sleep(5)


# Locate the table by its id 'pf-detail-table'
table_div = driver.find_element(By.ID, 'pf-detail-table')
table = table_div.find_element(By.TAG_NAME, 'table')

# Extract the rows from the table
rows = table.find_elements(By.TAG_NAME, 'tr')

# Initialize a list to hold the table data
table_data = []

# Function to clean and format headers
def format_header(header):
    header = header.strip()  # Remove leading/trailing spaces
    if not header:  # If header is empty after stripping
        return None
    
    # Replace unwanted characters
    header = header.replace('/', '_')
    header = header.replace(' ', '_')
    header = header.replace('-', '_')
    header = header.replace('(', '')
    header = header.replace(')', '')
    header = header.replace('.', '')
    header = header.replace('%', 'percent')
    
    # Move numbers to the end of the string
    parts = re.findall(r'\D+|\d+', header)
    header = ''.join(part for part in parts if not part.isdigit()) + ''.join(part for part in parts if part.isdigit())
    
    # Remove leading underscores or numbers
    header = re.sub(r'^[\d_]+', '', header)
    
    return header.lower()

# Extract and clean headers
headers = []
header_row = rows[0].find_elements(By.TAG_NAME, 'th')
for header in header_row:
    formatted_header = format_header(header.text)
    if formatted_header:  # Only add non-empty headers
        headers.append(formatted_header)

# Loop through the rest of the rows and extract data
for row in rows[1:]:  # Skip the header row
    cells = row.find_elements(By.TAG_NAME, 'td')
    row_data = {}

    # Handle cases where cells and headers don't match
    for index, cell in enumerate(cells):
        if index < len(headers):  # Ensure we don't go out of bounds
            row_data[headers[index]] = cell.text
        else:
            # If there are more cells than headers, use generic key names
            row_data[f'extra_column{index - len(headers) + 1}'] = cell.text

    table_data.append(row_data)


# Transform the data
transformed_data = []
for entry in table_data:
    # Pop the 'Symbol' field and use it for 'ticker'
    ticker = entry.pop("symbol", None)
    
    # Create the transformed entry
    transformed_entry = {
        "ticker": ticker,
        "portfolio": entry  # The remaining fields go under 'portfolio'
    }
    
    transformed_data.append(transformed_entry)

# Save the transformed data as a JSON file
with open('transformed_table_data.json', 'w') as json_file:
    json.dump(transformed_data, json_file, indent=4)



# Print the href link
#print(f'Portfolio href: {href_portfolio}')
# Print the href link
#print(f'Sign in link: {sign_in_link}')

# Close the browser
driver.quit()
