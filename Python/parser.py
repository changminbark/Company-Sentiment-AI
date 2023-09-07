# MIGHT NEED TO USE FLASK TO SEND DATA FROM SCRAPER TO PYTHON PROGRAM FOR ANALYSIS/PARSING.
# https://www.geeksforgeeks.org/pass-javascript-variables-to-python-in-flask/ 
# NEVERMIND, I WAS ABLE TO WRITE THE HEADLINES INTO A TXT FILE.

# MIGHT NEED TO USE REGEX TO PARSE TITLES


import numpy as np
class Parser:
    def __init__(self):
        self.output = []
    def parse(self, headlines):
        for title in headlines:
            titleNoQuote = title[1,len(title) - 1]
#             Split these quoteless titles and then append them to self.output
#             Making sure to remove unnecessary characters like , . : etc.
#             Then write the self.output into a csv file, which will be ready to be analyzed.

