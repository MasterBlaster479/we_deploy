from flask_restful import Resource, fields, marshal_with, request
import json
from models import Activity, Manager

class ActivityResource(Resource):
    route_base = '/activities'

    def post(self):
        data = request.data
        activity = json.loads(data)
        manager_id = Manager.get_session_manager()
        if isinstance(activity, (unicode, str,)):
            activity = eval(activity)
        activity_id = Activity(**activity)
        return activity_id, 201
