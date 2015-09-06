import web

class quickcount():
	
	def index(self):
		model = m_qc();
		param = model.get_data();
		layout = web.template.frender("views/quickcount.html");
		return layout(*param);

from core.model import model

class m_qc(model):
	def __init__(self):
		model.__init__(self)
	
	def get_data(self):
		sql = "select count(*) as dpt from qc_dpt"
		dpt = self.get_query(sql)[0]['dpt']
		
		sql = "select coalesce(sum(dpt),0) as dpt_live from "\
			"(select sum(total1+total2+total3+total4) as dpt from c1_dpt_LK"\
			" union "\
			"select sum(total1+total2+total3+total4) as dpt from c1_dpt_PR) a"
		dpt_live = self.get_query(sql)[0]['dpt_live']
		
		sql = "select coalesce(sum(php),0) as php from "\
			"(select sum(total1+total2+total3+total4) as php from c1_php_LK"\
			" union "\
			"select sum(total1+total2+total3+total4) as php from c1_php_PR) a"
		php = self.get_query(sql)[0]['php']
		
		
		
		sql = "select coalesce(sum(total1),0) as total1,coalesce(sum(total2),0) as total2,"\
			"coalesce(sum(total3),0) as total3,coalesce(sum(total4),0) as total4 from c1_suara"
		suara = self.get_query(sql)[0]
		
		sql = "select coalesce(sum(total1),0) as sah, coalesce(sum(total2),0) as tidaksah from c1_sah"
		res = self.get_query(sql)[0]
		sah,tidaksah = res['sah'],res['tidaksah']
		
		
		return (dpt,dpt_live,php,suara,sah,tidaksah)