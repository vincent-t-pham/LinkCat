from flask import Flask, render_template, request
from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
import webbrowser

app = Flask(__name__)

linkStorage = {}


@app.route('/makeLink', methods=['POST', 'GET'])
def makeLink():
    if request.method == 'POST':
        print('Start of makeLink')
        links = request.form.getlist('names')  # Assuming links are passed as a list in a form field
        links = ['http://www.google.com', 'http://www.amazon.com', 'http://www.facebook.com']
        linkID = randomLinkID()

        linkStorage[linkID] = links

        newLink = 'http://localhost:5000/' + linkID 
        
        return render_template('/templates/linkGenerated.html', new_link=newLink)
    else:
        # # # # # # # # # # # # # # # # # # # # # # # # # # # #
        #         This is the first page rendered             #
        #   Somewhere here needs to get user inputted links   #
        # # # # # # # # # # # # # # # # # # # # # # # # # # # #
        return render_template('form.html')


@app.route('/<linkID>')
def clickedLink(linkID):
    if linkID in linkStorage:
 
        links = linkStorage[linkID]  

        for link in links:
            webbrowser.open(link, new=0)                # If new is 0, the url is opened in the same browser window if possible. 
                                                        # If new is 1, a new browser window is opened if possible. If new is 2, 
                                                        # a new browser page (“tab”) is opened if possible
            # if(new==1): new=0

        return render_template('forcePageClose.html')   # Closes the page that was opened from the link
    else:
        return 'Invalid link.'

def randomLinkID():
    import random
    # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
    # NEEDS to check if a unique linkID has been generated  #
    # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
    linkID = str(random.randint(1000000000, 9999999999))

    return linkID

if __name__ == '__main__':
    app.run()