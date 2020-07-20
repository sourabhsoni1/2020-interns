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

# Extracting INR AND GBP values for january month from data set
INR = []
GBP = []
for jan_date in JAN_DATE:
  D = Rates[jan_date]
  # Append INR AND GBP values into INR AND GBP LIST 
  INR.append(D['INR'])
  GBP.append(D['GBP'])

# Making dictionary of dates and INR values
# Making dictionary of dates and GBP values
DictINR = dict(zip(JAN_DATE, INR))
DictGBP = dict(zip(JAN_DATE, GBP))

# Serializing json  
json_objectINR = json.dumps(DictINR, indent = 4) 
json_objectGBP = json.dumps(DictGBP, indent = 4)   

# Writing to Visualise.json 
with open("VisualisationINR.json", "w") as outfile: 
    outfile.write(json_objectINR)
with open("VisualisationGBP.json", "w") as outfile: 
    outfile.write(json_objectGBP) 

# calling html file to display the graph
webbrowser.open_new_tab('http://localhost/winSoftAss/T2_Html.html')


