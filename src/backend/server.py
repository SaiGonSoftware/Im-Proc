from flask import Flask
from flask_restful import Resource, Api

app = Flask(__name__)
api = Api(app)

class Sample(Resource):
    def get(self):
        result = ["Ford", "Volvo", "BMW"]
        return result

api.add_resource(Sample, '/sample')

if __name__ == '__main__':
     app.run(port='5000')