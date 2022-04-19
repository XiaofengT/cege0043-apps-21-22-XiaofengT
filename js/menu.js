function getUserRanking(){
	var getRankingURL = document.location.origin + "/api/userRanking/" + user_id;
	$.ajax({
		url: getRankingURL,
		crossDomain: true,
		success: function(result){
			alert("Your ranking of total number of condition reports in comparison to all users is: " + 
			result[0]["array_to_json"][0]["rank"] + ".");
		}
	}); 
}