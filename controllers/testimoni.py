from core.controller import *
from models.m_testimoni import m_testimoni
import datetime

class testimoni(controller):
	m = m_testimoni()
	menu = "TESTI"
	title = "Testimoni"
	view = "testimoni"
	
	def __init__(self):
		controller.__init__(self)
		self.js.append("testimoni")
		self.css.append("testimoni")
	
	def index(self):
		testimoni =  self.m.get_testimoni()
		reply = self.m.get_reply()
		
		return self.render(self.view,{"testimoni":testimoni,"reply":reply})
	
	def post(self, data):
		if not hasattr(data,"kirim"): return self.notfound()
		del data['kirim']
		
		
		if data.nama or data.testimoni:
			self.m.insert(data)
		
		redirect("../")
	
	def reply(self,data):
		if not hasattr(data,"kirim"): return self.notfound()
		del data['kirim']
		
		if not data.nama or not data.reply: 
			affected = 0
			id_reply = 0
		else: 
			res = self.m.insert_reply(data)
			affected = res['affected']
			id_reply = res['id']
		
		
		st = datetime.datetime.now().strftime('%H:%M %d/%m/%Y')
		return encode_json({"affected":affected,"id":id_reply,"waktu":st}) if not res['error'] else res['error']
	
	def like_testi(self,data):
		if not hasattr(data,"kirim"): return self.notfound()
		del data['kirim']
		
		res = self.m.like_testi(data.id)
		return encode_json({"affected":res['affected']}) if not res['error'] else res['error']
	
	def like_reply(self,data):
		if not hasattr(data,"kirim"): return self.notfound()
		del data['kirim']
		
		res = self.m.like_reply(data.id)
		return encode_json({"affected":res['affected']}) if not res['error'] else res['error']
