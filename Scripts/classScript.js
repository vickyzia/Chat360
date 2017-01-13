$(document).ready(function() {
    $("#assignmentTab").hide();
    $("#quizTab").hide();
	$("#otherTab").hide();
	$("#aboutTab").hide();
	
	console.log("clicked");
	$('#assignmentLink').on("click", function(){
		$("#assignmentLink").attr("class", "active");
		$("#contentLink").attr("class", "");
		$("#quizLink").attr("class", "");
		$("#otherLink").attr("class", "");
		$("#contentTab").hide();
		$("#quizTab").hide();
		$("#otherTab").hide();
		$("#assignmentTab").show();
		$("#aboutTab").hide();
		$("#aboutLink").attr("class", "");
		
		
	});
	$('#contentLink').on("click", function(){
		$("#assignmentLink").attr("class", "");
		$("#contentLink").attr("class", "active");
		$("#quizLink").attr("class", "");
		$("#otherLink").attr("class", "");
		$("#contentTab").show();
		$("#quizTab").hide();
		$("#otherTab").hide();
		$("#assignmentTab").hide();
		$("#aboutTab").hide();
		$("#aboutLink").attr("class", "");
		
	});
	$('#quizLink').on("click", function(){
		$("#assignmentLink").attr("class", "");
		$("#contentLink").attr("class", "");
		$("#quizLink").attr("class", "active");
		$("#otherLink").attr("class", "");
		$("#contentTab").hide();
		$("#quizTab").show();
		$("#otherTab").hide();
		$("#assignmentTab").hide();
		$("#aboutTab").hide();
		$("#aboutLink").attr("class", "");
		
	});
	$('#otherLink').on("click", function(){
		$("#assignmentLink").attr("class", "");
		$("#contentLink").attr("class", "");
		$("#quizLink").attr("class", "");
		$("#otherLink").attr("class", "active");
		$("#aboutLink").attr("class", "");
		$("#contentTab").hide();
		$("#quizTab").hide();
		$("#otherTab").show();
		$("#assignmentTab").hide();
		$("#aboutTab").hide();
		
		
	});
	$('#aboutLink').on("click", function(){
		$("#assignmentLink").attr("class", "");
		$("#contentLink").attr("class", "");
		$("#quizLink").attr("class", "");
		$("#otherLink").attr("class", "");
		$("#contentTab").hide();
		$("#quizTab").hide();
		$("#otherTab").hide();
		$("#assignmentTab").hide();
		$("#aboutTab").show();
		$("#aboutLink").attr("class", "active");
		
		
	});
	$('#leaveClass').on("click", function(){
		
		window.location.href="studentDashboard.html"
		
	});
	
});

