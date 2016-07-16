from core.controller import controller

class travel(controller):
	def __init__(self):
		controller.__init__(self)
		self.title = "Tour & Travel"
		self.menu = "TRAVEL"
		self.view = "travel"
	
	