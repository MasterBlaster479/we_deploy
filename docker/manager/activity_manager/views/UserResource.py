from flask_restful import Resource, fields, marshal_with, request, abort
import json
from models import User
from error_handler import make_error

user_resource_fields = {
    'id': fields.Integer,
    'first_name': fields.String,
    'last_name': fields.String,
    'email': fields.String,
    'login': fields.String,
    'active': fields.Boolean,
    'password': fields.String,
}

class UserResource(Resource):
    route_base = '/users/<int:id>'
    @marshal_with(user_resource_fields)
    def get(self, id):
        return User[id]

    @marshal_with(user_resource_fields)
    def put(self, id):
        data = json.loads(request.data)
        user = User.get(id=id)
        user.set(**data)
        return User[id], 201

    def delete(self, id):
        user = User.get(id=id)
        if user:
            user.delete()
            return '', 204
        abort(404)

class UserResourceList(Resource):
    route_base = '/users'

    @marshal_with(user_resource_fields)
    def get(self):
        return User.select()

    @marshal_with(user_resource_fields)
    def post(self):
        # data = parser.parse_args()
        data = request.data
        user_data = json.loads(data).get('user')
        new_user = User(**user_data)
        return new_user, 201

class UserLogin(Resource):
    route_base = '/users/login'

    def get(self):
        user, passwd = request.args.values()
        if User.get(login=user):
            if User.get(login=user).password == passwd:
                return User.get(login=user).to_dict()
            else:
                msg = 'Password for user %s is not correct, try again !' %(user)
                error_dict= {'password': [msg,]}
                return make_error(406, 42, msg, '', errors=error_dict)
        else:
            msg = 'User %s does not exist, try again !' % (user)
            error_dict = {'login': [msg, ]}
            return make_error(406, 42, msg, '', errors=error_dict)