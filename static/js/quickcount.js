id = makeid();
client = new Paho.MQTT.Client(window.location.host, 61614, "ID : qc_"+id);
console.log(window.location.host);

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
	suara[1] += parseInt(msg.suara1);
	suara[2] += parseInt(msg.suara2);
	suara[3] += parseInt(msg.suara3);
	suara[4] += parseInt(msg.suara4);
	count_suara();
	setTimeout(function(){ show_count--;},2500);
	showing(1,parseInt(msg.suara1));
	showing(2,parseInt(msg.suara2));
	showing(3,parseInt(msg.suara3));
	showing(4,parseInt(msg.suara4));
	
	
}

$(function(){
	count_suara();
});

var show_count = 0;
function count_suara(){
	show_count++;
	for(i=1;i<suara.length;i++){
		persen = ((suara[i]*100)/total_suara).toFixed(1);
		setTimeout(animate(i,persen),0);
	}
}

function showing(i,jml){
	count = $("#"+i).find(".count")[0];
	$(count).html("+"+jml);
	$(count).css("display","inline-block");
	
	setTimeout(function(count){ 
		if(show_count==1){
			$(count).fadeOut(1000);
			//$(count).hide();
		}
		
	},2500,count);
	
}

function animate(i,persen){
	h = $("#"+i).height();
	h = (persen/100 * h).toFixed(0);
	$("#"+i).find(".chart").css("height",h+"px");
	$("#"+i).find(".persentase").html(persen+"%");
	
}
function makeid()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}