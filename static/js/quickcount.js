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
    //location.reload();
  }
}

function onMessageArrived(message) {
	console.log(message.payloadString);
	msg = JSON.parse(message.payloadString);
	id = msg.id;
	console.log(id);
	if(id=="suara"){
		suara_process(msg);
	}else if(id=="dpt"){
		dpt_live += parseInt(msg.total);
		$("#dpt_live").html(dpt_live);
	}else if(id=="php"){
		php += parseInt(msg.total);
		
	}else if(id=="sah"){
		sah += parseInt(msg.total1);
		tidaksah += parseInt(msg.total2);
		$("#sah").html(sah);
		$("#tidaksah").html(tidaksah);
		suara_masuk();
		count_suara();
	}
}

$(function(){
	suara_masuk();
	count_suara();
});

function suara_masuk(){
	masuk = suara[1]+suara[2]+suara[3]+suara[4];
	$("#suaramasuk").html(masuk+" dari "+sah);
	persen = (masuk/sah)*100;
	persen = (persen).toFixed(2);
	
	if(isNaN(persen)) persen="0,00";
	$("#persen").html(persen+"%");
}

function suara_process(total){
	suara[1] += parseInt(msg.total1);
	suara[2] += parseInt(msg.total2);
	suara[3] += parseInt(msg.total3);
	suara[4] += parseInt(msg.total4);
	suara_masuk();
	count_suara();
	setTimeout(function(){ show_count--;},2500);
	showing(1,parseInt(msg.total1));
	showing(2,parseInt(msg.total2));
	showing(3,parseInt(msg.total3));
	showing(4,parseInt(msg.total4));
	
}

var show_count = 0;

function count_suara(){
	show_count++;
	for(i=1;i<suara.length;i++){
		$("#"+i).find("#masuk").html(suara[i]);
		if(suara[i]>sah) continue;
		persen = ((suara[i]*100)/sah).toFixed(3);
		if(isNaN(persen)) persen="0.000";
		setTimeout(animate(i,persen),0);
	}
}

function showing(i,jml){
	count = $("#"+i).find(".count")[0];
	$(count).html("+"+jml);
	
	w = $("#"+i).find(".content").width()/2;
	left = w-($(count).outerWidth()/2);
	
	$(count).css({'left':left,'bottom':$(count).outerHeight()});
	
	$(count).show();
	
	setTimeout(function(count){ 
		if(show_count<2){
			$(count).fadeOut(1000);
		}
	},2500,count);	
}

function animate(i,persen){
	h = $("#"+i).height();
	h -= $("#"+i).find(".content").height();
	h = (persen/100 * h).toFixed(0);
	$("#"+i).find(".chart").css("height",h+"px");
	p = persen.replace(".",",");
	$("#"+i).find(".persentase").html(p+"%");	
}


function makeid(){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
