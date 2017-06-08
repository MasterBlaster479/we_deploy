from flask_restful import Api
from ActivityResource import *
from UserResource import *

def register_resources(app, api_prefix):
    api = Api(app)
    # Activity Resource register
    api.add_resource(ActivityResource, api_prefix + ActivityResource.route_base)
    api.add_resource(ActivityResourceList, api_prefix + ActivityResourceList.route_base)
    api.add_resource(ActivityResourceMethod, api_prefix + ActivityResourceMethod.route_base)
    # User Resource register
    api.add_resource(UserResource, api_prefix + UserResource.route_base)
    api.add_resource(UserResourceList, api_prefix + UserResourceList.route_base)
    api.add_resource(UserLogin, api_prefix + UserLogin.route_base)