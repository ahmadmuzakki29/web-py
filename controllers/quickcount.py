import web

class quickcount():
	
	def index(self):
		model = m_qc();
		param = model.get_data();
		layout = web.template.frender("views/quickcount.html");
		return layout(*param);

from core.mo_del import mo_del

class m_qc(mo_del):
	def __init__(self):
		mo_del.__init__(self,'saksi')
	
	def get_data(self):
		dpt = self.db.dpt.count()
		
		res = self.cl.aggregate([
			{'$group':{
				'_id':None,
				'dpt':{'$sum':{
					'$add':[
						'$dpt_LK.total1','$dpt_LK.total2','$dpt_LK.total3','$dpt_LK.total4',
						'$dpt_PR.total1','$dpt_PR.total2','$dpt_PR.total3','$dpt_PR.total4'
					]
					}},
				'php':{'$sum':{
					'$add':[
						'$php_LK.total1','$php_LK.total2','$php_LK.total3','$php_LK.total4',
						'$php_PR.total1','$php_PR.total2','$php_PR.total3','$php_PR.total4'
					]
					}},
				'suara1':{'$sum':'$suara.total1'},
				'suara2':{'$sum':'$suara.total2'},
				'suara3':{'$sum':'$suara.total3'},
				'suara4':{'$sum':'$suara.total4'},
				
				'sah':{'$sum':'$sah.total1'},
				'tidaksah':{'$sum':'$sah.total2'},
			}}
		]);
		res = list(res)[0]
		suara = {'total1':res['suara1'],'total2':res['suara2'],'total3':res['suara3'],'total4':res['suara4']}
		
		return (dpt,res['dpt'],res['php'],suara,res['sah'],res['tidaksah'])