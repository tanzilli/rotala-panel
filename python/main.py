import tornado.ioloop
import tornado.web
import tornado.websocket
import time
import threading
import json

ws=None
 
def counter():
	i=0
	z=9999
	while True:
		i=i+1
		z=z-1
		print i
		time.sleep(0.1)
		if ws<>None:
			data = {"target": "display1", "value" : i}
			data = json.dumps(data)
			ws.write_message(data)

			data = {"target": "display2", "value" : z}
			data = json.dumps(data)
			ws.write_message(data)

def sergioloop():
	while True:
		time.sleep(0.1)
		print "Ciao"		

class SocketHandler(tornado.websocket.WebSocketHandler):
	def check_origin(self, origin):
		return True

	def open(self):
		global ws
		ws=self
		print "Websocket opened"

	def on_message(self, message):
		data=json.loads(message)
		#print(data["pushbutton"])
		#print(data["value"])
		#self.write_message(u"You said: " + message)

	def on_close(self):
		print "Websocket closed"

application = tornado.web.Application([
	(r'/ws', SocketHandler),
	(r"/(.*)", tornado.web.StaticFileHandler, {"path": "../www","default_filename": "index.html"}),
])

t = threading.Thread(target=counter)
t.start()

application.listen(80,"0.0.0.0")
tornado.ioloop.IOLoop.instance().start()