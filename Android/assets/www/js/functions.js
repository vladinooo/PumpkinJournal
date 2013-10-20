
function showHideSearchBar() {
	$('.ui-listview-filter').toggle();
}


function createNavigation(folders) {
	var output = '<ul data-role="listview">';
	output += '<li data-role="list-divider" class="list-divider"></li>';
	output += '<li data-icon="plus"><a href="javascript:addFolder()" data-rel="dialog">New Folder</a></li>';
	output += listFolders(folders);
	output += '<li data-role="list-divider" class="list-divider"></li>';
	output += '<li data-icon="gear"><a href="#">Settings</a></li>';
	output += '</ul>';
	$('#navPanel').html(output);
}

function listFolders(folders) {
	var output = '';
	$.each(folders, function(key,val) {
		output += '<li data-icon="false">';
		output += '<a href="#">' + val.name + '<p class="ui-li-count">' + val.articleCount + '</p></a>';
		output += '</li>';
	});
	return output;
}

function addFolder() {
	$.mobile.changePage('#addFolder');
}

function listArticles(articles) {
	var output = '<ul data-role="listview" data-filter="true">';
	$.each(articles, function(key,val) {
		output += '<li>';
		output += '<a href="#">';
		output += '<h2>' + val.name + '</h2>';
		output += '<img src="images/article.jpg" alt="article" />';
		output += '<p>' + val.content +'</p>';
		output += '</a>';
		output += '</li>';
	});
	output += '</ul>';
	$('#articles').html(output);
}