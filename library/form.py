class form():
	def __init__(self,fields):
		self.fields = fields
	def render(self):
		return self.fields