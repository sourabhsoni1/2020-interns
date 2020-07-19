# importing json and matplotlib
import json
import matplotlib.pyplot as plt

# opening data.json and loading it
with open('data.json') as file:
  file_content = json.load(file)

# Storing rates dictionary in Rates 
Rates = file_content['rates']
# Extracting keys(date) from Rates Dictionary
dates = Rates.keys()
print(dates)

# converting dates type(dict_keys) into LIST
DATE = []
for i in dates:
  # appending dates in list DATE
  DATE.append(i)
print(DATE)

# selecting january date from DATE list and appending in JAN_DATE
JAN_DATE = []
for i in DATE:
  # checking whether month is january or not
  if(i[5] == '0' and i[6] == '1'):
    JAN_DATE.append(i)
print(JAN_DATE)

#sorting dates in january
JAN_DATE.sort()
print(JAN_DATE)

# Extracting INR and values for january month from data set
INR = []
for jan_date in JAN_DATE:
  D = Rates[jan_date]
  # Append INR values into INR LIST 
  INR.append(D['INR'])
print(INR)

#-------------------------------------------------------------------------------
# Graph Plotting
plt.plot( JAN_DATE, INR, marker = "o")
# Labeling the X-axis 
plt.xlabel('DATES')
plt.xticks( rotation = 90) 
# Labeling the Y-axis 
plt.ylabel('INR') 
# Give a title to the graph
plt.grid('true')
plt.title('INR exchange rate against EUR from 1 Jan 2019 to 31 Jan 2019') 
plt.show()
