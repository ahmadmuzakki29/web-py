from core.model import model

class m_testimoni(model):
	
	def insert(self,args):
		field,val = self.get_val(args)
		query = "insert into testimoni("+field+") values("+val+")"
		return self.query(query)
	
	def get_testimoni(self):
		query = """select t.*, date_format(waktu,'%H:%i %d/%m/%Y') as waktu_format,
				ifnull(reply_count,0) as reply_count
				from testimoni t
				left join (
				select parent,count(*) as reply_count from testimoni_reply group by parent
				) r on r.parent=t.id
				order by waktu desc"""
		return self.get_query(query)
		
	def get_reply(self):
		query = "select *, date_format(waktu,'%H:%i %d/%m/%Y') as waktu_format from testimoni_reply order by waktu desc"
		return self.get_query(query)
	
	def insert_reply(self,args):
		field,val = self.get_val(args)
		query = "insert into testimoni_reply("+field+") values("+val+")"
		return self.query(query)
	
	def like_testi(self,id):
		id = self.escape(id)
		return self.query("update testimoni set `like` = `like`+1 where id='%s'"%(id))
	
	def like_reply(self,id):
		id = self.escape(id)
		return self.query("update testimoni_reply set `like` = `like`+1 where id='%s'"%(id))	
		
def test():
	print m_testimoni().get_reply()