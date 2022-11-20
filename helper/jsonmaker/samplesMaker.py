import os
import json

print(""""
***********************************************************
**** JSON Maker for Drum Machine by Jephthah M. Orobia ****
***********************************************************
""")

KBOARD = "QWERTYUIOP[]ASDFGHJKL;'\\|ZXCVBNM,.?1234567890-=` "
    

def ask_to_quit():
    response = input("Do you want to quit [Y] or start over [any response]? ")
    if response[0].upper() == 'Y':
        quit()
    else:
        start()
        
def start():
    target_samples = input("Enter samples directory: ")
    if os.path.isdir(target_samples):
        os.chdir(target_samples)
        print("Acquiring drumkits from ", target_samples)
        print("...This may take a while...")
        acquire_files(target_samples)
        
    else:
        print("There was an error, please try again")
        start()

def write_json(new_data):
    print("-------------writing process starts")
    print("------------>")
    json_file = input("Enter the file (complete path) where json file will be saved: ")
    if os.path.isdir(json_file):
        filename = input("Give a filename for the json file (exclude .json): ")
        os.chdir(json_file)
        with open(filename, 'w') as file:
            file_data = {
                "drumkits":
                {
                    "folder": json_file,
                    "collection": new_data
                }
            }
            file.seek(0)
            # convert back to json.
            json.dump(file_data, file, indent = 2)
            print("File created at ", file.name)
            print("******************************************************************")
            print("Operation Successful")
    else:
        print("You entered an invalid path. Please try again.")
        write_json(new_data)

def acquire_files(loc):
        drumkits = os.listdir()
        samples = []
        print("found the following drumkits")
        for d in drumkits:
            print("-", d)
        for kit in drumkits:
            if os.path.isdir(kit):
                print("looking for samples of", kit)
                new_kitDict = {
                    "name": kit,
                    "folder": os.path.join(loc,kit),
                    "sounds": []
                }
                samplesOfKit = os.listdir(kit)
                print("Found the following:")
                key = 0;
                for sample in samplesOfKit:
                    print("--", sample)
                    new_dict = {
                            "src": os.path.join(loc,kit,sample),
                            "name": sample.split('.')[0],
                            "hotkey": KBOARD[key]
                        }
                    new_kitDict["sounds"].append(new_dict)
                    key += 1
                samples.append(new_kitDict)
        print("writing json to file.")
        write_json(samples)
        ask_to_quit()

    

start()
