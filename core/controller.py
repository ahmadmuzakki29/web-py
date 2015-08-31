import web
from library.globals import *
from library.form import form

class controller():
	js = []
	css = []
	def __init__(self):
		self.js.extend(["lib/loading","lib/apprise"])
		self.css.append("lib/apprise")
	
	def render(self,template,param={}):
		try: 
			param['fields'] = form(param['fields'])
		except: pass
		
		template += ".html"
		view = web.template.frender("views/"+template,globals=get_global())
		content = view(**param)
		layout = web.template.frender("views/index.html",globals=get_global())
		
		return layout(
			js=self.js,
			css=self.css,
			menu=self.menu,
			title=self.title,
			content=content
		)
	
	def index(self):
		if self.view:
			return self.render(self.view)
		else:
			return notfound()
	
	