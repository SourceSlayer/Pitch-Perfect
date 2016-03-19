from flask.ext.login import LoginManager, UserMixin
from flask.ext.sqlalchemy import Model
from flask.ext.openid import OpenID
from flask import current_app

login_manager=LoginManager()
open_id=None

def initialize_authentication(app):
    login_manager.init_app(app)
    #global open_id
    open_id=OpenID(app)
    return login_manager, open_id#Is this Pythonic? I hope it's Pythonic, I really do.
    
def get_open_id(s=None):
    return open_id

class User(UserMixin):
    def is_authenticated(self):
        pass
    
    def is_active(self):
        pass
    
    def is_anonymous(self):
        pass
    
    def get_id(self):
        pass
