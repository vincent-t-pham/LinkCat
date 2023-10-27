from flask import Flask, jsonify, request, render_template
import webbrowser

app = Flask(__name__, template_folder='templates')

linkStorage={}

linkStorage['newlink.com'] = ['amazon.com', 'google.com']

def randomLinkID():
    import random
    # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
    # NEEDS to check if a unique linkID has been generated  #
    # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
    linkID = str(random.randint(1000000000, 9999999999))

    return linkID

@app.route("/endpoint", methods=["GET", "POST"])
def endpoint():
    if request.method == 'POST':
        # data = request.form.get('textbox1')
        linkID = randomLinkID()
        jsonRequest = request.get_json()

        if linkID not in linkStorage:
            linkStorage[linkID] = []

        for key, value in jsonRequest.items():
            linkStorage[linkID].append(value)

        # print(f'Data submitted:   \n' +
        #       f'textbox1 - {data1}\n' +
        #       f'textbox2 - {data2} '  )  # Print to the console

        newLink = 'http://127.0.0.1:5000/' + linkID 
        # returnPackage = {
        #     'newLink': newLink,
        #     'data': linkStorage
        # }
        # return render_template("background.html", new_link=newLink)

        return jsonify(newLink)
    
    print(f'Running endpoint routine')  # Print to the console
    
    return jsonify(jsonRequest)

@app.route('/<linkID>')
def clickedLink(linkID):
    if linkID in linkStorage:
        # thread issues and race conditions - db, cache, reddist - uwsgi serverd handles one request at a time
        # snakecase: snake_case

        links = linkStorage[linkID]  

        for link in links:
            webbrowser.open(link, new=0)                # If new is 0, the url is opened in the same browser window if possible. 
                                                        # If new is 1, a new browser window is opened if possible. If new is 2, 
                                                        # a new browser page (“tab”) is opened if possible
            # if(new==1): new=0

        return render_template('forcePageClose.html')   # Closes the page that was opened from the link
    else:
        return 'Invalid link.'


if __name__ == '__main__':
    print("Server up.")
    app.run(debug=True)

