

function showHideSearchBar() {
	$('.ui-listview-filter').toggle();
}


function createNavigation(folders) {
	var output = '<ul data-role="listview">';
	output += '<li data-role="list-divider" class="list-divider"></li>';
	output += '<li data-icon="plus"><a href="javascript:addFolder()">New Folder</a></li>';
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



function addFolder() {
	$.mobile.changePage('#addFolder', {
        transition : 'pop',
        role : 'dialog'
    });
}

function saveFolder() {
	$.mobile.changePage('#main');
}

function cancelFolder() {
	$.mobile.changePage('#main');
}

function saveArticle() {
	$.mobile.changePage('#main');
}

function cancelArticle() {
	$.mobile.changePage('#main');
}

function addArticle() {
	$.mobile.changePage('#addArticle');
}

function saveArticle(db, articleData) {
	articleData.title = $('#articleTitle').val();
	articleData.description = $("#articleDescription").val();
	db.transaction(function(tx) {
		tx.executeSql("INSERT INTO Articles (title, description) VALUES (?, ?)",[articleData.title, articleData.description])
		}, onDbError, onDbSuccess);
	$.mobile.changePage('#main');
}

function cancelArticle() {
	$.mobile.changePage('#main');
}

function onDbError(error) {
	alert("Database error: " + error.message);
}

function onDbSuccess(transaction, results) {
	console.log("Database call successfull.");
}

function getArticles(tx) {
	tx.executeSql("CREATE TABLE IF NOT EXISTS Articles (title, description)");
	tx.executeSql("SELECT * FROM Articles", [], onSelectedArticlesSuccess, onDbError);
}

function onSelectedArticlesSuccess(transaction, results) {
	dbresults = results;
	var len = results.rows.length;
	$('#articles').append('<ul data-role="listview">');
	for (var i = 0; i < len; i++) {
		$('#articles').append('<li><a href="#">' + results.rows.item(i).title + '</a></li>');
	}
	$('#articles').append('</ul>');
	$("#notelist").listview("refresh");
}

