# importing json and matplotlib
import json
import webbrowser
import matplotlib.pyplot as plt
import requests

#taking input dates
print("For Range\nEnter first date")
day1 = input("enter the day (01-31):")
month1 = input("enter the month (01-12):")
year1 = input("enter the year :")
print("\n\nEnter Second date")
day2 = input("enter the day (01-31):")
month2 = input("enter the month (01-12):")
year2 = input("enter the year :")
start_date = year1 + "-" + month1 + "-" + day1
end_date = year2 + "-" + month2 + "-" + day2

#urls to make request
url='https://api.exchangeratesapi.io/history?start_at={}&end_at={}&Base=EUR'.format(start_date,end_date)
#load the  data form api
response = requests.get(url)
file = response.text
file_content = json.loads(file)
 
# Storing rates dictionary in Rates 
Rates = file_content['rates']
# Extracting keys(date) from Rates Dictionary
dates = Rates.keys()

# converting dates type(dict_keys) into LIST
DATE = []
for i in dates:
  # appending dates in list DATE
  DATE.append(i)


#sorting dates in january
DATE.sort()

# Extracting INR and values for january month from data set
INR = []
for date in DATE:
  D = Rates[date]
  # Append INR values into INR LIST 
  INR.append(D['INR'])

# Making diction of dates and INR vaues
Dict = dict(zip(DATE, INR))

# Serializing json  
json_object = json.dumps(Dict, indent = 4) 
  
# Writing to Visualise.json 
with open("Visualisation.json", "w") as outfile: 
    outfile.write(json_object) 

#-------------------------------------------------------------------------------
# Graph Plotting
# calling html file to display the graph
webbrowser.open_new_tab('http://localhost/winSoftAss/T1_Html.html')
