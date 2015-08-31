
function show_reply(id){
	template = $("#reply_box_template").html()
	$("#item_"+id+" .reply_box").html(template)
	
	$("#item_"+id+" .reply_box #kirim").click(function(){
		post_reply(id);
	});
}

function post_reply(id){
	nama = $("#item_"+id+" .reply_box #nama").val()
	reply = $("#item_"+id+" .reply_box #balas").val()
	
	if(nama == "" || reply == ""){
		alert("Nama dan isi balasan tidak boleh kosong");
		return false;
	}
	
	$("#item_"+id+" .reply_box").loading()
	$.post("reply/",{"kirim":"y","parent":id,"nama":nama,"reply":reply},function(res){
		if(res.affected == 0) return;
		
		t = $("#reply_template").html()
		t = t.replace("$nama",nama)
		t = t.replace("$content",reply)
		t = t.replace("$time",res.waktu)
		t = t.replace("$rep_id",res.id)
		
		$("#item_"+id+" .replies").prepend(t)
		reply_count = parseInt($("#item_"+id+"  .action  .balas .count").html())+1
		$("#item_"+id+" .action .balas .count").html(reply_count)
		$("#item_"+id+" .reply_box").html("");
		
	});
}

function like_testi(obj,id){
	$(obj).removeAttr("onclick")
	$.post("like_testi/",{"id":id,"kirim":"y"},function(res){
		if(res.affected == 0) return;
		count = parseInt($("#item_"+id+" .action .like .count").html())+1
		$("#item_"+id+" > .action .like .count").html(count)
	});
}

function validate(){
	nama = $("#nama").val()
	testimoni = $("#testimoni").html()
	if(nama == "" || testimoni == ""){
		alert("Nama dan isi testimoni tidak boleh kosong");
		return false
	}
	return true
}

function like_reply(obj,id){
	$(obj).removeAttr("onclick")
	$.post("like_reply/",{"id":id,"kirim":"y"},function(res){
		if(res.affected == 0) return;
		c = $(obj).find(".count")[0]
		count = parseInt($(c).html())+1
		$(c).html(count)
	});
}