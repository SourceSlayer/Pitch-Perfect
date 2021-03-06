#!/usr/bin/env python

from .quizer import quizer
from .storage import database
from .login import User, get_open_id, initialize_authentication
from flask import Flask, render_template, request, abort, send_from_directory
from flask.ext.login import LoginManager, login_required
#from flask.ext.markdown import Markdown

app=Flask(__name__)
app.register_blueprint(quizer, url_prefix="/quizes")
app.secret_key="l"
print("FSDAESDFSDFersfsrfers")

login_manager, open_id=initialize_authentication(app)
#=LoginManager()
#login_manager.init_app(app)

@app.route("/")
@app.route("/home")
@app.route("/index")
@app.route("/home.py")
@app.route("/index.py")
@app.route("/home.html")
@app.route("/index.html")
def home_page():
    print(request.host)
    print(dir(app.config))
    return render_template("home.html")

@app.route("/login/<register>", methods=["POST", "GET"])
@app.route("/login/<register>/<service>", methods=["POST", "GET"])
@app.route("/login/service", methods=["POST", "GET"])
@app.route("/login", methods=["POST", "GET"])
@app.route("/login.py", methods=["POST", "GET"])
@open_id.loginhandler
def login(register=False, service=None):
    service=request.form.get("service", service)
    print(service)
    if not service and request.method=="POST":
        abort(400, "Request Error: Could not process due to missing service.") if not service else ""
    if register or request.args.get("register"):
        return render_template("register.html", service=service)
    print(request.args)
    if request.method=="POST":
        return "logged"
    #elif request.method=="GET":
    #    return str(request.args)
    return render_template("login.html")

@app.route("/settings", methods=["GET", "PUT", "DELETE", "POST"])
@app.route("/settings/<category>", methods=["GET", "PUT", "DELETE", "POST"])
@login_required
def settings(category=None):
    return "E"

@app.route("/sheet")
@app.route("/sheet.py")
@app.route("/sheet/<key>")
@app.route("/sheets/<key>")
@app.route("/sheet/<key>.json")
@app.route("/sheet/<artist_name>/<key>")
@app.route("/sheets/<artist_name>/<key>")
@app.route("/sheet/<artist_name>/<key>/<title>")
def sheets(key=None, artist_name=None, title=None):
    print(dir(request))
    if not key==None:
        key=request.form.get("key", None)
    if request.url.endswith(".json"):
        return send_from_directory(app.config["MUSIC_DIRECTORY"], "song001.mif")
    return render_template("sheet.html", key=key)

@app.route("/about/<page>")
def about_page(page):
    format={
        ".html":"html",
        ".text":"text",
        ".htm":"html",
        ".txt":"text",
        ".md":"text"
    }.get(page.split(".")[1], )
    
    if format!=None:
        abort(404)
    elif format=="html":
        return u"html"

if __name__=="__main__":
    app.run(debug=True)
