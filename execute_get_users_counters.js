var result = [];
var user1 = API.users.get({
	user_ids: 44830560,
	fields: "counters"
});
result.push({
	id: user1[0].id,
	friends: user1[0].counters.friends,
	followers: user1[0].counters.followers
});
var user2 = API.users.get({
	user_ids: 46289633,
	fields: "counters"
});
result.push({
	id: user2[0].id,
	friends: user2[0].counters.friends,
	followers: user2[0].counters.followers
});
return result;