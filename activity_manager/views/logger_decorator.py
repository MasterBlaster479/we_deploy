import functools
import json
from flask_restful import request, abort
from models import ActivityLog, Manager, Activity
from pony.orm import rollback, db_session


def activity_logger(method):
    @functools.wraps(method)
    def wrapper(*args, **kwargs):
        try:
            return method(*args, **kwargs)
        except Exception as e:
            data = json.loads(request.data)
            manager_id = Manager.get_session_manager()
            log_data = {'data': data, 'manager_id': manager_id, 'error_msg': e.message, 'user_id': data.get('user_id')}
            method_name = method.__name__
            if method_name == 'post':
                pass
            elif method_name == 'put':
                act_id = data.get('id')
                activity = Activity.get(id=act_id)
                log_data.update({
                    'activity_id': activity
                })
            with db_session():
                ActivityLog(**log_data)
            abort(404)
    return wrapper