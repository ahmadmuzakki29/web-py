import web
from library.globals import get_global
from library.lib import *
from core.model import model
import time
from json import dumps as jsondumps,loads
from jinja2 import Environment, FileSystemLoader

class controller():
	js = []
	css = []
	def __init__(self):
		self.start_time = time.time()
		self.js.extend(["lib/loading","lib/apprise"])
		self.css.append("lib/apprise")
	
	def GET(self):
		return self.render(self.view)
	
	def render(self,view,param={}):
		view += ".html"
		
		env = Environment(loader=FileSystemLoader('views/'),trim_blocks=True,lstrip_blocks=True)
		env.globals.update(get_global())
		param.update({
					'title':self.title,'menu':self.menu,
					'js':self.js,'css':self.css
					})
		
		full_page = env.get_template(view).render(**param)
		elapsed = "<!--"+str(time.time() - self.start_time)+"--!>"
		return full_page+elapsed
	
	def get_elapsed(self):
		return time.time() - self.start_time
	
	def setattr(self):
		setattr(self,'base_url',base_url)
		setattr(self,'notfound',web.notfound)
		setattr(self,'input',web.input)
		setattr(self,'redirect',web.seeother)
		setattr(self,'loads',loads)
	
	def dumps(self,*p):
		web.header('Content-type', 'application/json')
		return jsondumps(*p)
	
	