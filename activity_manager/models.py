from pony.orm import *
from datetime import date, datetime
import socket
db = Database()
db.bind('postgres', user='postgres', password='postgres', host='localhost', port=5433, database='we_deploy')

class User(db.Entity):
    first_name = Required(str)
    last_name = Required(str)
    email = Optional(str)
    login = Required(str, unique=True)
    password = Required(str)
    active = Optional(bool, default=True)
    activities = Set("Activity", lazy=True)
    activity_logs = Set("ActivityLog", lazy=True)

class Activity(db.Entity):
    user_id = Required("User", index=True)
    manager_id = Required("Manager", index=True)
    create_date = Required(datetime, default=lambda : datetime.now())
    edit_date = Optional(datetime)
    start_date = Required(datetime, default=lambda : datetime.now())
    end_date = Required(datetime, default=lambda : datetime.now())
    description = Required(str)
    activity_logs = Set("ActivityLog", lazy=True)

class ActivityLog(db.Entity):
    _table_ = 'activity_log'
    user_id = Required("User", index=True)
    manager_id = Required("Manager", index=True)
    create_date = Required(datetime, default=lambda : datetime.now())
    activity_id = Optional("Activity", index=True)
    data = Required(Json)
    error_msg = Required(str)

class Manager(db.Entity):
    host_id = Required(str, index=True)
    create_date = Required(datetime, default=lambda : datetime.now())
    activities = Set("Activity", lazy=True)
    activity_logs = Set("ActivityLog", lazy=True)

    @classmethod
    def get_session_manager(self):
        host_name = socket.gethostname()
        return Manager.get(host_id=host_name)

def register_models(app):
    # Make sure each thread gets a db session
    app.wsgi_app = db_session(app.wsgi_app)
    sql_debug(True)
    db.generate_mapping(create_tables=True, check_tables=True)

@db_session
def register_manager(app):
    host_name = socket.gethostname()
    if not Manager.exists(host_id=host_name):
        Manager(host_id=host_name)
