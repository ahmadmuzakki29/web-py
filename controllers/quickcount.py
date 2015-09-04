import web

class quickcount():
	
	def index(self):
		model = m_qc();
		total_suara,perolehan_suara = model.get_data();
		layout = web.template.frender("views/quickcount.html");
		return layout(total_suara,perolehan_suara);

from core.model import model

class m_qc(model):
	def __init__(self):
		model.__init__(self)
	
	def get_data(self):
		sql = "select * from qc_setting"
		res = self.get_query(sql)[0]
		total_suara = res['total_suara'];
		
		sql = "select sum(suara1) as suara1,sum(suara2) as suara2,sum(suara3) as suara3,sum(suara4) as suara4 from qc_perolehan_suara"
		perolehan_suara = self.get_query(sql)[0]
		
		return total_suara,perolehan_suara