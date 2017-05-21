from flask_restful import Resource, fields, marshal_with, request
import json
from pony.orm.serialization import to_json, to_dict
from models import Activity, Manager

class ActivityResource(Resource):
    route_base = '/activities/<int:id>'

    def get(self, id):
        return to_dict(Activity[id])

    def put(self, id):
        # data = parser.parse_args()
        data = json.loads(request.data)
        stock = Activity.get(id=id)
        stock.set(**data)
        return Activity[id], 201

class ActivityResourceList(Resource):
    route_base = '/activities'

    def get(self):
        return to_dict( Activity.select())

    def post(self):
        data = request.data
        activity = json.loads(data)
        manager_id = Manager.get_session_manager()
        if isinstance(activity, (unicode, str,)):
            activity = eval(activity)
        activity_id = Activity(**activity)
        return activity_id, 201

