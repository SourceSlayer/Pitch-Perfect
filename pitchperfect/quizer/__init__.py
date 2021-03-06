from flask import Blueprint, current_app, render_template, request, g
from flask.ext.sqlalchemy import SQLAlchemy, Model
from jinja2 import TemplateNotFound
from json import loads


quizer=Blueprint("Quizer", __name__, template_folder="templates")

def load_quiz(quiz_id):
    return {
        "name":"PP",
        "randomize_questions":True,
        "questions":[
            {
                "type":"checkbox", 
                "ordered":True, 
                "randomize_answers":False, 
                "text":"Does this app rock?", 
                "attatched_markdown":"",
                "allow_html":True,
                "answers":{
                    "Yes":True,
                    "No":False
                }
            }
        ]
    }

@quizer.route("/quiz/<int:quiz_id>")
@quizer.route("/quiz", defaults={"quiz_id":None})
@quizer.route("/quiz.py", defaults={"quiz_id":None})
def quiz_page(quiz_id):
    if not quiz_id:
        quiz_id=request.args.get("id")
    print(quiz_id)
    return render_template("quiz.html", quiz=load_quiz(quiz_id))
