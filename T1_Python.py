# importing json and webbrowser
import webbrowser
import json

# opening data.json and loading it
with open('data.json') as file:
  file_content = json.load(file)

# Storing rates dictionary in Rates 
Rates = file_content['rates']
# Extracting keys(date) from Rates Dictionary
dates = Rates.keys()

# converting dates type(dict_keys) into LIST
DATE = []
for i in dates:
  # appending dates in list DATE
  DATE.append(i)

# selecting january date from DATE list and appending in JAN_DATE
JAN_DATE = []
for i in DATE:
  # checking whether month is january or not
  if(i[5] == '0' and i[6] == '1'):
    JAN_DATE.append(i)

#sorting dates in january
JAN_DATE.sort()

# Extracting INR values for january month from data set
INR = []
for jan_date in JAN_DATE:
  D = Rates[jan_date]
  # Append INR values into INR LIST 
  INR.append(D['INR'])

# Making dictionary of dates and INR vaues
Dict = dict(zip(JAN_DATE, INR))

# Serializing json  
json_object = json.dumps(Dict, indent = 4) 
  
# Writing to visualisation.json 
with open("visualisation.json", "w") as outfile: 
    outfile.write(json_object) 

# calling html file to display the graph
webbrowser.open_new_tab('http://localhost/winSoftAss/T1_Html.html')

#-------------------------------------------------------------------------------
# I have created a dictionary having JAN_DATES as keys and INR values as values
# and then used html and javascript to plot the graph. javascript is loading the
# visualization.json file which is a dictionary of JAN_DATE and INR values and
# then plotting the graph.
