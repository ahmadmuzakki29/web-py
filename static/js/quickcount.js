client = new Paho.MQTT.Client("localhost", 61614, "client");


client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

client.connect({"userName":"guest","password":"",onSuccess:onConnect});

function onConnect() {
  console.log("onConnect");
  client.subscribe("GUEST/qc");
}

function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:"+responseObject.errorMessage);
    location.reload();
  }
}

function onMessageArrived(message) {
	console.log(message.payloadString);
	msg = JSON.parse(message.payloadString);
	suara[1] += parseInt(msg.suara_1);
	suara[2] += parseInt(msg.suara_2);
	suara[3] += parseInt(msg.suara_3);
	suara[4] += parseInt(msg.suara_4);
	count_suara();
	showing(1,parseInt(msg.suara_1));
	showing(2,parseInt(msg.suara_2));
	showing(3,parseInt(msg.suara_3));
	showing(4,parseInt(msg.suara_4));
}

$(function(){
	count_suara();
});

function count_suara(){
	for(i=1;i<suara.length;i++){
		persen = ((suara[i]*100)/total_suara).toFixed(1);
		setTimeout(animate(i,persen),0);
	}
}

function showing(i,jml){
	count = $("#"+i).find(".count")[0];
	$(count).html("+"+jml);
	$(count).css("display","inline-block");
	
	setTimeout(function(count){$(count).fadeOut(1000)},2500,count);
}

function animate(i,persen){
	h = $("#"+i).height();
	h = (persen/100 * h).toFixed(2);
	$("#"+i).find(".chart").animate({height:h+"px"});
	$("#"+i).find(".persentase").html(persen+"%");
	
}