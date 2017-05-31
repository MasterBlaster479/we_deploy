from flask_restful import Resource, fields, marshal_with, request, abort
import json
from pony.orm.serialization import to_json, to_dict
from pony.orm import rollback
from models import Activity, Manager
from datetime import date, datetime, timedelta
from dateutil import parser

activity_resource_fields = {
    'id': fields.Integer,
    'create_date': fields.DateTime(dt_format='iso8601'),
    'edit_date': fields.DateTime(dt_format='iso8601'),
    'start_date': fields.DateTime(dt_format='iso8601'),
    'end_date': fields.DateTime(dt_format='iso8601'),
    'description': fields.String,
}

class ActivityResource(Resource):
    route_base = '/activities/<int:id>'

    @marshal_with(activity_resource_fields)
    def get(self, id):
        return Activity[id]

    @marshal_with(activity_resource_fields)
    def put(self, id):
        import pdb;pdb.set_trace()
        # data = parser.parse_args()
        data = json.loads(request.data)
        data.pop('create_date'), data.pop('id')
        new_data = {
            'start_date': data.get('start_date') and parser.parse(data['start_date']),
            'end_date': data.get('end_date') and parser.parse(data['end_date']),
            'edit_date': datetime.now()
        }
        data.update(new_data)
        act = Activity.get(id=id)
        act.set(**data)
        return Activity[id], 201

class ActivityResourceList(Resource):
    route_base = '/activities'

    @marshal_with(activity_resource_fields)
    def get(self):
        return Activity.select()[:]

    def post(self):
        data = request.data
        activity_data = json.loads(data)
        manager_id = Manager.get_session_manager()
        if isinstance(activity_data, (unicode, str,)):
            activity_data = eval(activity_data)
        activity_id = Activity(**activity_data)
        return activity_id, 201

class ActivityResourceMethod(Resource):
    route_base = '/activities/<string:method>'

    @marshal_with(activity_resource_fields)
    def get(self, method):
        # Dynamic call of methods in MethodView and rollback in case of exception
        try:
            return getattr(self, method)()
        except:
            rollback()
            abort(404)

    def today_activities(self, *args, **kwargs):
        date_start = datetime.now()
        data = Activity.select(lambda act: act.edit_date <= datetime.now())[:]
        print data
        return data
