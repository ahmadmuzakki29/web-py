import web, json

def cond(condition,res1,res2=""):
	if condition :
		return res1
	else:
		return res2

def get_global():
	dict = {
		'cond':cond,
		'str':str
	}
	return dict

def notfound():
	return web.notfound()

def redirect(url):
	web.seeother(url);

def encode_json(dict):
	web.header('Content-Type', 'application/json')
	return json.dumps(dict)
