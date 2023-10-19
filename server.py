from flask import Flask, jsonify, request


app = Flask(__name__)

links={}

links['newlink.com'] = ['amazon.com', 'google.com']


@app.route("/endpoint", methods=["GET", "POST"])
def endpoint():
    if request.method == 'POST':
        # data = request.form.get('textbox1')
        jsonRequest = request.get_json()
        data1 = jsonRequest.get('textbox1')
        data2 = jsonRequest.get('textbox2')

        print(f'Data submitted:   \n' +
              f'textbox1 - {data1}\n' +
              f'textbox2 - {data2} '  )  # Print to the console

        return f'Data submitted: {data1}'
    
    print(f'Running endpoint routine')  # Print to the console

    return jsonify(data1)

if __name__ == '__main__':
    print("Server up.")
    app.run(debug=True)
