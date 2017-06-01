from flask_restful import Resource, fields, marshal_with, request, abort
import json
from pony.orm.serialization import to_json, to_dict
from pony.orm import rollback, select
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
        user_id = request.args.get('user_id')
        if user_id:
            query = Activity.select(lambda a: a.user_id.id == user_id)
        else:
            query = Activity.select()
        return query[:]

    @marshal_with(activity_resource_fields)
    def post(self):
        data = request.data
        activity_data = json.loads(data)
        activity_data.update({
            'start_date': activity_data.get('start_date') and parser.parse(activity_data['start_date']),
            'end_date': activity_data.get('end_date') and parser.parse(activity_data['end_date']),
            'edit_date': datetime.now()
        })
        manager_id = Manager.get_session_manager()
        if isinstance(activity_data, (unicode, str,)):
            activity_data = eval(activity_data)
        activity_data.update(manager_id=manager_id)
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
        query = select(a for a in Activity if a.edit_date.date() == date.today())
        user_id = request.args.get('user_id')
        if user_id:
            query.filter(lambda a: a.user_id.id == user_id)
        return query[:]
